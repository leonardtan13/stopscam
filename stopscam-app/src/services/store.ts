import { db, firebase } from "../firebase";
import AWS from "aws-sdk";
import { reactive } from "vue";

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

export const store = reactive({
  posts: new Map<string, Post>(),
});

const postsRef = db.collection("posts");

// enables realtime updates to store
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

export const createPost = (post: Post) => {
  const newPost = postsRef.doc();
  newPost
    .set(post)
    .then(() => {
      console.log("created new post");
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId: string) => {
  postsRef
    .doc(postId)
    .delete()
    .then(() => {
      console.log("deleted: ", postId);
    })
    .catch((err) => console.log(err));
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
        resolve("downvoted");
      })
      .catch((err) => reject(err));
  });
};

export const uploadProfilePictoS3 = (
  userId: string,
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
    Key: `${userId}/profile/${fileName}`,
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

// do up the rep score logic
export const repScore = (
  upvoteCount: number,
  downvoteCount: number
): number => {
  if (upvoteCount == 0 && downvoteCount == 0) {
    return 0;
  } else {
    return upvoteCount - downvoteCount;
  }
};
