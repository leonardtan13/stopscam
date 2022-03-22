<script setup>
import { store } from "../services/store";
// import { findSimilarityInPosts } from "../services/LinkSimilarity";
import { ref } from "vue";

const link = ref("");

const similarity = ref({});

// const getSimilarity = (link) => {
//   const posts = store.posts;
//   // console.log(posts)
//   similarity.value = findSimilarityInPosts(posts, link);
// };
</script>

<template>
  store is: {{ store.posts }}

  <!-- text: <input v-model="link" @change="getSimilarity(link)" /> -->

  <h2>Similarity: {{ similarity }}</h2>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
