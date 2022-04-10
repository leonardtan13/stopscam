<script setup>
import {
  upvotePost,
  downvotePost,
  retrieveNetVoteCount,
} from "../services/store";
import "../index.css";
import { auth } from "../firebase";
import { store } from "../services/store";

const emit = defineEmits({
  restrict: null,
});

const handleUpvote = async (postId) => {
  if (auth.currentUser === null) {
    emit("restrict");
    return;
  }

  try {
    const res = await upvotePost(postId, auth.currentUser.uid);
  } catch (e) {
    console.error(e);
  }
};

const handleDownvote = async (postId) => {
  if (auth.currentUser === null) {
    emit("restrict");
    return;
  }

  try {
    await downvotePost(postId, auth.currentUser.uid);
  } catch (e) {
    console.error(e);
  }
};

const props = defineProps([
  "postId",
  "link",
  "caption",
  "images",
  "date",
  "userID",
]);

const voteCount = retrieveNetVoteCount(props.postId);
const getDuration = (datePosted) => {
  var hours = Math.abs(new Date() - datePosted) / 36e5;
  if (hours < 1) {
    return `${Math.floor(hours * 60)}m`;
  }
  return hours < 24 ? `${Math.floor(hours)}h` : `${Math.floor(hours / 24)}d`;
};
</script>

<template>
  <div
    class="grid grid-flow-row grid-cols-9 auto-rows-max gap-2 mx-auto my-5 w-5/6 h-full rounded-xl shadow-xl border"
  >
    <div class="col-span-8 p-5">
      <!-- User -->
      <div class="flex flex-row">
        <div class="px-4 w-full h-full">
          <div class="flex">
            <img
              class="float-left object-cover items-stretch w-12 h-12 rounded-full bg-teal-800"
              :src="store.users.get(props.userID).userPicURL"
            />
            <div class="flex-col my-auto w-full">
              <button>
                <router-link
                  class="font-sans ml-3 font-bold"
                  :to="'/profile/' + props.userID"
                  >{{ store.users.get(props.userID).name }}</router-link
                >
              </button>
              <div class="font-sans ml-3">
                <p class="text-gray-600 text-xs">
                  Posted {{ getDuration(props.date) }} ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Post Header (Link) -->
      <div class="w-full">
        <div class="basis-2/3 w-full h-full">
          <p
            class="font-sans font-bold text-xs sm:text-2xl text-left underline px-4 py-2"
          >
            {{ props.link }}
          </p>
        </div>
      </div>

      <!-- Post Body (Caption) -->
      <div class="w-full">
        <p
          class="font-sans font-normal sm:text-lg text-xs mx-auto text-justify px-4 py-2"
        >
          {{ props.caption }}
        </p>
      </div>

      <!-- Post Body (Image) -->
      <div class="w-full rounded-xl">
        <img
          :src="images[0]"
          class="mx-auto px-4 w-full h-full sm:w-10/12 sm:h-10/12"
        />
      </div>
    </div>

    <!-- Voting Button -->
    <div class="bg-slate-50 pt-5 rounded-r-xl">
      <div class="flex flex-col w-full h-full">
        <button
          id="upvote"
          class="flex flex-initial justify-center"
          @click="handleUpvote(props.postId)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 512 512"
          >
            <path
              id="upvote"
              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256c141.4 0 256-114.6 256-256S397.4 0 256 0zM382.8 246.1C380.3 252.1 374.5 256 368 256h-64v96c0 17.67-14.33 32-32 32h-32c-17.67 0-32-14.33-32-32V256h-64C137.5 256 131.7 252.1 129.2 246.1C126.7 240.1 128.1 233.3 132.7 228.7l112-112c6.248-6.248 16.38-6.248 22.62 0l112 112C383.9 233.3 385.3 240.1 382.8 246.1z"
            />
          </svg>
        </button>

        <p
          class="flex flex-initial justify-center font-bold text-sm sm:text-xl"
        >
          {{ voteCount }}
        </p>

        <button
          id="downvote"
          class="flex flex-initial justify-center"
          @click="handleDownvote(props.postId)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            viewBox="0 0 512 512"
          >
            <path
              id="downvote"
              d="M256 512c141.4 0 256-114.6 256-256s-114.6-256-256-256C114.6 0 0 114.6 0 256S114.6 512 256 512zM129.2 265.9C131.7 259.9 137.5 256 144 256h64V160c0-17.67 14.33-32 32-32h32c17.67 0 32 14.33 32 32v96h64c6.469 0 12.31 3.891 14.78 9.875c2.484 5.984 1.109 12.86-3.469 17.44l-112 112c-6.248 6.248-16.38 6.248-22.62 0l-112-112C128.1 278.7 126.7 271.9 129.2 265.9z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#upvote {
  fill: #cdcdcd;
}
#upvote:hover {
  fill: #90d998;
}

#downvote {
  fill: #cdcdcd;
}
#downvote:hover {
  fill: #ff585b;
}
</style>
