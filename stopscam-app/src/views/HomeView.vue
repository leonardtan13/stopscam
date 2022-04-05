<script setup>
import { store, uploadFiletoS3, upvotePost } from "../services/store";
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
  uploadFiletoS3(
    "KD7DAHDS74HFD",
    file.value.name,
    file.value,
    //Passing in credentials as TypeScript does not recognise import.meta VITE syntax (need to workaround with tsconfig.js)
    import.meta.env.VITE_AWSAccessKeyId,
    import.meta.env.VITE_AWSSecretKey,
    import.meta.env.VITE_AWSBucket
  )
    .then((response) => {
      console.log(response);
      //response: https://stopscam.s3.amazonaws.com/KD7DAHDS74HFD/59b74fe9-b98e-4881-854d-539f9fe4eda4/Timetable.png
    })
    .catch((error) => {
      console.log(error);
    });
};

//Test Threshold
</script>

<template>
  store is: {{ store.posts }}

  text: <input v-model="link" @change="getSimilarity(link)" />

  <h2>Similarity: {{ similarity }}</h2>
  <button @click="upvotePost('71euK9YfaU9lr5mv3yHU', '49')">Upvote</button>

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
