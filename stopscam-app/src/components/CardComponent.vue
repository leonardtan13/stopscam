<template>
  <div class="grid grid-flow-row auto-rows-max mx-auto gap-3 border w-1/2">
    <div class="w-full">
      <p class="font-sans font-black text-3xl text-center underline">
        {{ props.scamLink }}
      </p>
    </div>

    <div class="w-full">
      <p
        class="font-sans font-medium border border-teal-700 p-5 w-5/6 mx-auto"
      >
        {{ props.caption }}
      </p>
    </div>

    <div class="w-full">
      <div class="carousel w-3/4 mx-auto">
        <div class="carousel-inner">
          <input
            id="carousel-1"
            class="carousel-open"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden
            checked="checked"
          />
          <div class="carousel-item">
            <img :src="props.imgURL" />
          </div>
          <input
            id="carousel-2"
            class="carousel-open"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden
          />
          <div class="carousel-item">
            <img
              src="https://ttripper.wpengine.com/wp-content/uploads/2018/09/TripAdvisor-New-Interface.jpg"
            />
          </div>
          <input
            id="carousel-3"
            class="carousel-open"
            type="radio"
            name="carousel"
            aria-hidden="true"
            hidden
          />
          <div class="carousel-item">
            <img
              src="https://hub.wtm.com/wp-content/uploads/2015/03/PastedGraphic-3.jpg"
            />
          </div>
          <label for="carousel-3" class="carousel-control prev control-1"
            >‹</label
          >
          <label for="carousel-2" class="carousel-control next control-1"
            >›</label
          >
          <label for="carousel-1" class="carousel-control prev control-2"
            >‹</label
          >
          <label for="carousel-3" class="carousel-control next control-2"
            >›</label
          >
          <label for="carousel-2" class="carousel-control prev control-3"
            >‹</label
          >
          <label for="carousel-1" class="carousel-control next control-3"
            >›</label
          >
          <ol class="carousel-indicators">
            <li>
              <label for="carousel-1" class="carousel-bullet">•</label>
            </li>
            <li>
              <label for="carousel-2" class="carousel-bullet">•</label>
            </li>
            <li>
              <label for="carousel-3" class="carousel-bullet">•</label>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div class="w-full flex">
      <div class="flex mx-auto">
        <button id="upvote" @click="voteCount++">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-22 w-16 fill-teal-500"
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
            class="h-22 w-16"
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
        <p class="text-gray-600 text-xs ml-24">{{ props.duration }} ago</p>
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
  "imgURL",
  "avatar",
  "user",
  "duration",
  "voteCount",
]);
const voteCount = ref(props.voteCount);
</script>
