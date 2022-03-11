<template>
  <div
    class="grid grid-flow-row auto-rows-max mx-auto gap-3 border border-8 border-gray-700 w-1/2"
  >
    <div class="w-full">
      <p class="font-sans font-black text-3xl text-center underline">
        {{ props.scamLink }}
      </p>
    </div>

    <div class="w-full">
      <p
        class="font-sans font-medium border border-teal-700 p-4 w-5/6 mx-auto border-4 text-justify"
      >
        {{ props.caption }}
      </p>
    </div>

    <div class="w-full">
      <img
        :src="imgURLS[0]"
        width="500"
        height="500"
        class="mx-auto border border-black"
      />
    </div>

    <div class="w-full flex">
      <div class="flex mx-auto">
        <button id="upvote" @click="voteCount++">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 fill-teal-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <p class="font-black font-mono text-2xl leading-10 mt-2">
          {{ voteCount }}
        </p>

        <button id="downvote" @click="voteCount--">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-14 w-14 fill-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="inline-block mx-auto rounded-full bg-gray-300 pr-5 h-10 leading-10"
      >
        <img class="rounded-full float-left h-full" :src="props.avatar" />
        <span class="font-serif ml-3 font-black">{{ props.user }}</span>
        <p class="text-gray-600 text-xs mx-auto">{{ props.duration }} ago</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "../index.css";

const props = defineProps([
  "scamLink",
  "caption",
  "imgURLS",
  "avatar",
  "user",
  "duration",
  "voteCount",
]);
const voteCount = ref(props.voteCount);
</script>
