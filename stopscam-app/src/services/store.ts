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

export interface User {
  id: string;
  email: string;
  name: string;
  userPicURL: string | undefined;
  downvotesReceived: number;
  upvotesReceived: number;
}

//TypeScript does not have set data type, must push array
export interface FireBasePost
  extends Omit<
    Post,
    "downvotedBy" | "upvotedBy" | "upvoteCount" | "downvoteCount"
  > {
  downvotedBy: string[];
  upvotedBy: string[];
}

export const store = reactive({
  posts: new Map<string, Post>(),
  users: new Map<string, User>(),
});

const postsRef = db.collection("posts");
const userRef = db.collection("users");

export const initPostsData = async () => {
  const docs = await postsRef.orderBy("date", "desc").get();
  docs.forEach((doc) => {
    store.posts.set(doc.id, documentToPost(doc));
  });
};

export const initUsersData = async () => {
  const docs = await userRef.get();
  docs.forEach((doc) => {
    store.users.set(doc.id, documentToUser(doc));
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

  userRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("added: ", change.doc.data());
        const user = documentToUser(change.doc);
        store.users.set(change.doc.id, user);
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
    postedBy: doc.data().postedBy,
    images: doc.data().images,
    upvoteCount: upvoters.size,
    downvoteCount: downvoters.size,
  };

  return post;
};

// convert document to user type
export const documentToUser = (doc: firebase.firestore.DocumentData): User => {
  const user: User = {
    id: doc.id,
    email: doc.data().email,
    name: doc.data().name,
    userPicURL: doc.data().userPicURL,
    downvotesReceived: doc.data().downvotesReceived,
    upvotesReceived: doc.data().upvotesReceived,
  };

  return user;
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
        console.log("Deleted Post: ", postId);
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

export const removeUpvote = (
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
        upvotedBy: firebase.firestore.FieldValue.arrayRemove(upvoterId),
      })
      .then(() => {
        updatePostStatus(postId, 0.8);
        resolve("upvote removed");
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

export const removeDownvote = (
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
        downvotedBy: firebase.firestore.FieldValue.arrayRemove(downvoterId),
      })
      .then(() => {
        updatePostStatus(postId, 0.8);
        resolve("downvote removed");
      })
      .catch((err) => reject(err));
  });
};

export const getAllPendingReview = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return post.isUnderReview === true;
  });
};

export const getAllLegitPosts = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return post.isLegitSite === true;
  });
};

export const getAllScamPosts = (posts: Map<string, Post>): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return post.isLegitSite === false;
  });
};

export const getTopPendingReview = (
  posts: Map<string, Post>,
  minRatio: number
): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return (
      post.isUnderReview === true &&
      post.upvoteCount / (post.upvoteCount + post.downvoteCount) > minRatio
    );
  });
};

export const getTopLegitPosts = (
  posts: Map<string, Post>,
  minRatio: number
): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return (
      post.isLegitSite === true &&
      post.upvoteCount / (post.upvoteCount + post.downvoteCount) > minRatio
    );
  });
};

export const getTopScamPosts = (
  posts: Map<string, Post>,
  minRatio: number
): Post[] => {
  return Array.from(posts.values()).filter((post) => {
    return (
      post.isLegitSite === false &&
      post.upvoteCount / (post.upvoteCount + post.downvoteCount) > minRatio
    );
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

export const retrieveNetVoteCount = (postId: string): number => {
  return (
    store.posts.get(postId).upvotedBy.size -
    store.posts.get(postId).downvotedBy.size
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
//get all posts from UserID
export const getAllPostsByUserId = (userId: string) => {
  return Array.from(store.posts.values()).filter((post) => {
    return post.postedBy == userId;
  });
};

export const getUpVotesDownVotes = (allPosts: []) => {
  let totalUpVotes = 0;
  let totalLowVotes = 0;

  for (let post of allPosts) {
    totalUpVotes += post["upvoteCount"];
    totalLowVotes += post["downvoteCount"];
  }
  if (totalUpVotes == 0 && totalLowVotes == 0) {
    return {
      upvotes: 0,
      downvotes: 0,
    };
  } else {
    return {
      upvotes: totalUpVotes,
      downvotes: totalLowVotes,
    };
  }
};

export const UpdateUserVotes = (
  userId: string,
  upvotes: number,
  downvotes: number
) => {
  userRef.doc(userId).update({
    upvotesReceived: upvotes,
    downvotesReceived: downvotes,
  });
  console.log("Post Status Updated");
  return;
};

export const urlIsLegit = (inputUrl: string): boolean => {
  const legitReviewedPosts: Post[] = getAllLegitPosts(store.posts).filter(
    (post) => {
      return !post.isUnderReview;
    }
  );

  for (const post of legitReviewedPosts) {
    if (post.link.toLowerCase() == inputUrl.toLowerCase()) {
      return true;
    }
  }
  return false;
};

export const urlIsScam = (inputUrl: string): boolean => {
  const scamReviewedPosts: Post[] = getAllScamPosts(store.posts).filter(
    (post) => {
      return !post.isUnderReview;
    }
  );

  for (const post of scamReviewedPosts) {
    if (post.link.toLowerCase() == inputUrl.toLowerCase()) {
      return true;
    }
  }

  return false;
};
export const getPostByPostId = (postId: string) => {
  if (store.posts.has(postId)) {
    return store.posts.get(postId);
  }
  return null;
};
