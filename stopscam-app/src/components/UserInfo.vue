<script setup>
import { db } from "../firebase";
import { ref, onMounted } from "vue";
import { uploadProfilePictoS3, getAllPostsByUserId } from "../services/store";
import cardComponent from "../components/CardComponent.vue";

defineProps({
  userName: String,
  userID: String,
  userRepScore: Number,
  userPicURL: String,
  viewing: Boolean,
});

function formatRepScore(repScore) {
  if (repScore >= 85) {
    return "text-emerald-600 text-xl text-center font-sm sm:text-3xl font-semibold";
  } else if (repScore < 85 && repScore >= 65) {
    return "text-orange-300 text-xl text-center font-sm sm:text-3xl font-semibold";
  } else {
    return "text-rose-900 text-xl text-center font-sm sm:text-3xl font-semibold";
  }
}

//update user database
function updateURL(userID, userPicURL) {
  db.collection("users")
    .doc(userID)
    .update({
      userPicURL: userPicURL,
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

// Uploading of DP
const show = ref(false);
const file = ref("");

function submitFile(file, userID) {
  uploadProfilePictoS3(
    userID,
    file.name,
    file,
    import.meta.env.VITE_AWSAccessKeyId,
    import.meta.env.VITE_AWSSecretKey,
    import.meta.env.VITE_AWSBucket
  )
    .then((response) => {
      // submit back to User profile
      console.log(response);
      updateURL(userID, response);
    })
    .catch((error) => {
      console.log(error);
    });
}

const onFileChange = (event, userID) => {
  console.log(event);
  file.value = event.target.files[0];
  console.log(file.value);
  submitFile(file.value, userID);
};

function openPicture() {
  show.value = true;
}
</script>

<template>
  <body>
    <!-- User Image -->
    <div class="container mx-auto mt-20 my-10 sm:w-full">
      <div @click="openPicture()">
        <div>
          <img
            class="rounded-full w-40 h-40 mx-auto hover:border-4 hover:border-slate-500"
            :src="userPicURL"
          />
        </div>
      </div>
    </div>
    <!-- refine the design here  -->
    <div
      v-show="show && !viewing"
      class="mx-auto content-center w-full sm:w-full"
    >
      <input
        id="pictureURL"
        type="file"
        class="mx-auto content-center"
        @change="onFileChange($event, userID)"
      />
    </div>

    <!-- User Profile -->
    <div class="container mx-auto my-10 p-6 rounded-xl w-3/4 sm:w-2/3 bg-20">
      <div class="grid grid-flow-row auto-rows-max gap-6">
        <h1
          class="text-slate-300 text-xl text-center font-sm sm:text-3xl font-semibold"
        >
          {{ userName }}
        </h1>
        <div class="grid mx-auto bg-white w-32 h-32 rounded-lg">
          <h2
            class="text-slate-700 text-center text-md font-medium sm:text-xl mt-2"
          >
            Reputation Score:
          </h2>
          <h1 :class="formatRepScore(userRepScore)">
            {{ userRepScore }}
          </h1>
        </div>
      </div>
    </div>

    <!-- User Posts -->
    <div class="container mx-auto my-10 p-6 rounded-xl w-3/4 sm:w-2/3 bg-white">
      <div
        v-if="getAllPostsByUserId(userID).length > 0"
        class="grid grid-flow-row auto-rows-max gap-6"
      >
        <cardComponent
          v-for="(post, index) in getAllPostsByUserId(userID)"
          :key="index"
          class="mb-5"
          :post-id="post.id"
          :link="post.link"
          :caption="post.description"
          :images="post.images"
          :date="post.date"
          :pointer="index"
        />
      </div>
      <div v-else class="grid grid-flow-row auto-rows-max gap-6">
        You have not posted anything
      </div>
    </div>
  </body>
</template>

<style scoped>
.bg-20 {
  background-color: #314e4e;
}
</style>
