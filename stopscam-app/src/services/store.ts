import { db, firebase } from "../firebase";
import { reactive } from "vue";
import AWS from "aws-sdk";

export interface Post {
  id: string;
  date: Date;
  description: string;
  downvotedBy: Set<string>;
  upvotedBy: Set<string>;
  isLegitSite: boolean;
  isUnderReview: boolean;
  link: string;
  postedBy: string;
  images: string[];
  upvoteCount: number;
  downvoteCount: number;
}

//TypeScript does not have set data type, must push array
export interface FireBasePost extends Omit<Post, "downvotedBy" | "upvotedBy"> {
  downvotedBy: string[];
  upvotedBy: string[];
}

export const store = reactive({
  posts: new Map<string, Post>(),
});

const postsRef = db.collection("posts");

export const initPostsData = async () => {
  const docs = await postsRef.get();
  docs.forEach((doc) => {
    store.posts.set(doc.id, documentToPost(doc));
  });
};

// enables realtime updates to store
export const enableUpdates = () => {
  postsRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("added: ", change.doc.data());
        const post = documentToPost(change.doc);
        store.posts.set(change.doc.id, post);
      }

      if (change.type === "modified") {
        console.log("modified: ", change.doc.data());
        const post = documentToPost(change.doc);
        store.posts.set(change.doc.id, post);
      }

      if (change.type === "removed") {
        console.log("Removed: ", change.doc.data());
        store.posts.delete(change.doc.id);
      }
    });
  });
};

// convert document to post type
export const documentToPost = (doc: firebase.firestore.DocumentData): Post => {
  const upvoters: Set<string> = new Set(doc.data().upvotedBy);
  const downvoters: Set<string> = new Set(doc.data().downvotedBy);
  const post: Post = {
    id: doc.id,
    date: doc.data().date.toDate(),
    description: doc.data().description,
    isLegitSite: doc.data().isLegitSite,
    isUnderReview: doc.data().isUnderReview,
    upvotedBy: upvoters,
    downvotedBy: downvoters,
    link: doc.data().link,
    postedBy: doc.data().postedBy.id,
    images: doc.data().images,
    upvoteCount: upvoters.size,
    downvoteCount: downvoters.size,
  };

  return post;
};

export const createPost = (post: FireBasePost): Promise<string> => {
  return new Promise((resolve, reject) => {
    const newPost = postsRef.doc();

    //Firebase does not recognise custom types, must convert back to vanilla javascript objects (string[] -> array)
    post.downvotedBy = [...post.downvotedBy];
    post.upvotedBy = [...post.upvotedBy];

    newPost
      .set(post)
      .then(() => {
        console.log("Created new post");
        resolve("Post Created");
      })
      .catch((err) => reject(err));
  });
};

export const deletePost = (postId: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    postsRef
      .doc(postId)
      .delete()
      .then(() => {
        console.log("deleted: ", postId);
        resolve("Post Deleted");
      })
      .catch((err) => reject(err));
  });
};

export const upvotePost = (
  postId: string,
  upvoterId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (
      store.posts.get(postId).upvotedBy.has(upvoterId) ||
      store.posts.get(postId).downvotedBy.has(upvoterId)
    ) {
      reject("already upvoted or downvoted");
    }
    postsRef
      .doc(postId)
      .update({
        upvotedBy: firebase.firestore.FieldValue.arrayUnion(upvoterId),
      })
      .then(() => {
        updatePostStatus(postId, 0.8);
        resolve("upvoted");
      })
      .catch((err) => reject(err));
  });
};

export const downvotePost = (
  postId: string,
  downvoterId: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (
      store.posts.get(postId).upvotedBy.has(downvoterId) ||
      store.posts.get(postId).downvotedBy.has(downvoterId)
    ) {
      reject("already upvoted or downvoted");
    }
    postsRef
      .doc(postId)
      .update({
        downvotedBy: firebase.firestore.FieldValue.arrayUnion(downvoterId),
      })
      .then(() => {
        updatePostStatus(postId, 0.8);
        resolve("downvoted");
      })
      .catch((err) => reject(err));
  });
};

export const getAllPendingReview = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    post.isUnderReview === true;
  });
};

export const getAllLegitPosts = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    post.isLegitSite === true;
  });
};

export const getAllScamPosts = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    post.isLegitSite === false;
  });
};

export const getTopPostsWithMinRatio = (
  minRatio: number,
  posts: Map<string, Post>
): Map<string, Post> => {
  return new Map(
    [...posts].filter(([id, post]) => {
      post.upvoteCount / (post.upvoteCount + post.downvoteCount) > minRatio;
    })
  );
};
const updatePostStatus = (postId: string, proportion: number): void => {
  const post = store.posts.get(postId);
  const verified_threshold = 50;

  if (post.upvoteCount + post.downvoteCount < verified_threshold) {
    console.log(
      `Post did not hit minimum verification mandate of ${verified_threshold}`
    );
    return;
  }

  if (!post.isUnderReview) {
    console.log("Post is already verified");
    return;
  }

  if (
    post.upvoteCount / (post.upvoteCount + post.downvoteCount) >=
    proportion
  ) {
    postsRef.doc(postId).update({
      isUnderReview: false,
    });
    console.log("Post Status Updated");
    return;
  }

  deletePost(postId)
    .then(() => {
      console.log(
        `Post deleted as it failed to meet proportion of ${proportion}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const uploadFiletoS3 = (
  userId: string,
  postId: string,
  fileName: string,
  file: File,
  accessKeyId: string,
  secretAccessKey: string,
  bucket: string
): Promise<string> => {
  const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });
  const params = {
    Bucket: bucket,
    Key: `${userId}/${postId}/${fileName}`,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        console.log("File Uploaded");
        return resolve(data.Location);
      }
    });
  });
};
