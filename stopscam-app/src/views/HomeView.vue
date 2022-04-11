<script setup>
import { 
  store, 
  uploadFiletoS3, 
  upvotePost,
  urlIsLegit,
  urlIsScam,
   } from "../services/store";
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

const isLegit = ref(false);
const isScam = ref(false);
const isSimilar = ref(false);

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


const submitResults = reactive({
  link: "",
  message: ""
})
const similarityResults = reactive({
  link: "",
  message: "",
  posts: [], 
})
function results(inputLink) {
  console.log("FROM FUNCTION", inputLink, typeof(inputLink))
  let legit = urlIsLegit(inputLink);
  let scam = urlIsScam(inputLink);

  console.log("RESULTS:", legit, scam, isSimilar.value)

  if(legit == true) {
    isLegit.value = true;
    console.log("isLegit: ", isLegit.value)
    submitResults.link = inputLink;
    submitResults.message = "LEGITIMATE";
    return;
  } 
  else if(scam == true) {
    isScam.value = true;
    console.log("isScam: ", isScam.value)
    submitResults.link = inputLink;
    submitResults.message = "SCAM";
    return;
  }
  else {
    isSimilar.value = true;
    getSimilarity(inputLink);
    console.log("isSimilar: ", isSimilar.value)
    similarityResults.link = inputLink;
    similarityResults.message = "We are unable to find this link in our database."
    similarityResults.posts = similarity.value.ratings
    console.log(similarityResults.posts.bestMatch)
    console.log(similarityResults.posts)
    return;
  }

}

const submit = () =>  {
  loading.value = true;
  console.log("FROM BUTTON", state.link, typeof(state.link));
  inputValidation();
  results(state.link);
  loading.value = false;
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

        <!-- Results Div -->
        <div class="container w-full mx-auto">
            <div v-if="isScam" class="transColor w-3/4 mx-auto p-6 rounded-xl">
              <h1 class="text-4xl text-center my-4 font-bold">
                {{submitResults.link}}
              </h1>
              <p class="text-3xl text-center my-4 ">
                It is a <span class="text-rose-500 font-semibold">{{submitResults.message}}</span> website!
              </p>
              <p class="text-xl text-center mt-8">
                Verified by people
              </p>
              <p class="text-xl text-center"> 
                Join our community to help us spread words.
              </p>
            </div>

            <div v-else-if="isLegit" class="transColor w-3/4 mx-auto p-6 rounded-xl">
              <h1 class="text-4xl text-center my-4 font-bold">
                {{submitResults.link}}
              </h1>
              <p class="text-3xl text-center my-4 ">
                It is a <span class="text-emerald-500 font-semibold">{{submitResults.message}}</span> website!
              </p>
               <p class="text-xl text-center mt-8">
                Verified by people
              </p>
              <p class="text-xl text-center"> 
                Join our community to help us spread words.
              </p>
            </div>
            
            <div v-else-if="isSimilar" class="transColor w-3/4 mx-auto p-6 rounded-xl">
              <div class="grid-flow-row auto-rows-max justify-items-center">
                <div>
                  <h1 class="text-4xl text-center pb-4 font-bold">{{similarityResults.link}}</h1>
                </div>
                <div class="text-3xl text-center pb-4">
                  <h1>{{similarityResults.message}}</h1>
                </div>

                <div>
                  <p class="text-2xl">However, your link is</p>
                  <ul>
                    <li v-for="post of similarityResults.posts" class="text-xl leading-10">
                      
                      <span class="font-semibold">{{(post.rating*100).toFixed(2)}}%</span> 
                      similar to {{post.target}} which is a 
                      <span v-if="store.posts.get(post.id).isLegitSite == true" class="text-emerald-500 font-semibold"> Legit</span>
                      <span v-else class="text-rose-500 font-semibold">Scam</span>
                      page
                    </li>
                  </ul>
                </div>

              </div>




              
              



            </div>
            <div v-else style="display: none;"></div>
        </div>
       

      </div>
    </div>


  text: <input v-model="state.link" @change="getSimilarity(state.link)" />

  <h2>Similarity: {{ similarity }}</h2>

  <br>
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

.transColor {
  background-color: #cddfd359;
}
</style>
