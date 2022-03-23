<script setup>
import { store, uploadFiletoS3 } from "../services/store";
import { findSimilarityInPosts } from "../services/LinkSimilarity";
import { ref } from "vue";

const link = ref("");
const similarity = ref({});

const getSimilarity = (currentLink) => {
  const posts = store.posts;
  similarity.value = findSimilarityInPosts(posts, currentLink);
};

//Test for File Upload
const file = ref("");

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

const submitFile = () => {
  uploadFiletoS3("Leonard", file.value.name, file.value);
};
</script>

<template>
  store is: {{ store.posts }}

  text: <input v-model="link" @change="getSimilarity(link)" />

  <h2>Similarity: {{ similarity }}</h2>

  <div class="container">
    <div>
      <hr />
      <label
        >File
        <input type="file" @change="handleFileUpload($event)" />
      </label>
      <br />
      <button @click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
