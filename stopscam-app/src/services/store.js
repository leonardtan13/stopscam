import { db } from "../firebase";
import { reactive } from "vue";

const legitPostsRef = db.collection("legit-posts");
const scamPostsRef = db.collection("scam-posts");

export const store = reactive({
  legitPosts: [],
  scamPosts: [],
});

export const getLegitPosts = () => {
  legitPostsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      store.legitPosts.push({ id: doc.id, ...doc.data() });
    });
  });

  console.log(store.legitPosts);
};

export const getScamPosts = () => {
  scamPostsRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      store.scamPosts.push({ id: doc.id, ...doc.data() });
    });
  });
  console.log(store.scamPosts);
};

export const loadAllPosts = () => {
  getLegitPosts();
  getScamPosts();
};

export const addNewLegitPost = async (post) => {
  const newPost = legitPostsRef.doc();
  const res = await newPost.set(post);
  console.log("added new legit post with ID: ", res.id);

  store.legitPosts.push({ id: res.id, ...res.data() });
};

export const addNewScamPost = async (post) => {
  const newPost = scamPostsRef.doc();
  const res = await newPost.set(post);
  console.log("added new scam post with ID: ", res.id);

  store.scamPosts.push({ id: res.id, ...res.data() });
};

export const updateLegitPost = async (postId, updateFields) => {
  // mutates store
  const postRef = legitPostsRef.doc(postId);
  const res = await postRef.update(...updateFields);
  console.log("post updated: ", res.id);

  const postIndex = store.legitPosts.findIndex((post) => post.id === postId);
  store.legitPosts[postIndex] = { id: res.id, ...res.data() };
};

export const updateScamPost = async (postId, updateFields) => {
  // mutates store
  const postRef = scamPostsRef.doc(postId);
  const res = await postRef.update(...updateFields);
  console.log("post updated: ", res.id);

  const postIndex = store.scamPosts.findIndex((post) => post.id === postId);
  store.scamPosts[postIndex] = { id: res.id, ...res.data() };
};
