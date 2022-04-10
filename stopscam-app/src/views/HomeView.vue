<script setup>
import { store, uploadFiletoS3, upvotePost } from "../services/store";
import { findSimilarityInPosts } from "../services/LinkSimilarity";
import ErrorMsg from "../components/ErrorMsg.vue";
import { ref, reactive } from "vue";

const loading = ref(false);
const state = reactive({
  link: "",
});
const error = reactive({
  link: [false, ""],
});

// const link = ref("");
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

function inputValidation() {
  let link_input = state.link ;
  // check if there is a link
  if (link_input.length > 0) {
    error.link = [false, ""];
    return;
  } else {
    error.link =  [true, "empty"];
    return;
  }
}

const submit = () =>  {
  loading.value = true;
  console.log(state.link);
  inputValidation();

}
</script>

<template>
  <body>
    <div class="container mx-auto my-20 w-3/4 h-full">
      <div class="grid grid-flow-row auto-rows-max gap-6 justify-items-center">
        <div>
          <h1 class="text-white text-5xl font-bold tracking-wide">
            StopScam Website Verifier
          </h1>
        </div>
        <div>
          <h3 class="text-white text-xl font-medium">
            Could this be a scam? Submit your website to check.
          </h3>
        </div>
        <div class="mt-4 w-3/4 h-20">
          <input
            v-model="state.link"
            class="p-5 w-full h-full rounded-xl font-medium text-xl"
            placeholder="http://stopscam.com"
          />
        </div>
        <div class="w-1/4">
          <button
            id="btn-submit"
            class="p-4 w-full rounded-2xl font-bold text-2xl"
            @click='submit()'
          >
            Submit
          </button>
        </div>
        <div 
          v-show="error.link[0]"
          :class= "error.link[0] ? 'bg-rose-200 rounded-2xl py-4 px-5 m-4 text-center' : ''" >
          <ErrorMsg
                    class ="ml-0  text-base"
                    v-if="error.link[0]"
                    id="link"
                    :error="error.link[1]"
                  />
        </div>
      </div>
    </div>


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
</body>
</template>

<style>
body {
  background-color: #0d3939;
}

#btn-submit {
  background-color: #cddfd3;
}
</style>
