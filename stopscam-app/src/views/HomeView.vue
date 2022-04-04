<script setup>
import { store } from "../services/store";
import ErrorMsg from "../components/ErrorMsg.vue";
// import { findSimilarityInPosts } from "../services/LinkSimilarity";
import { ref, reactive } from "vue";

const loading = ref(false);
const state = reactive({
  link: "",
});
const error = reactive({
  link: [false, ""],
});

const similarity = ref({});
// const getSimilarity = (link) => {
//   const posts = store.posts;
//   // console.log(posts)
//   similarity.value = findSimilarityInPosts(posts, link);
// };
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

    <!-- store is: {{ store.posts }} -->

    <!-- text: <input v-model="link" @change="getSimilarity(link)" /> -->

    <!-- <h2>Similarity: {{ similarity }}</h2>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p> -->
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
