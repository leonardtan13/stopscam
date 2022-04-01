<script setup>
import { ref } from "vue";

const div1 = ref(false);
const div2 = ref(false);
const div3 = ref(false);

function goto(refName) {
  if (refName == "div1") {
    div1.value = true;
  } else if (refName == "div2") {
    div2.value = true;
  } else {
    div3.value = true;
  }
  window.scrollTo(0, document.getElementById(refName).offsetTop);
}
</script>

<template>
  <div class="h-max">
    <div
      class="mx-auto mt-6 rounded-xl bg-zinc-300/75 rounded shadow-xl p-5 w-3/4"
    >
      <h1
        class="text-md font-medium font-normal tracking-wide text-neutral-700 mb-4 text-center sm:text-2xl sm:text-left"
      >
        Are you a victim of a scam?
      </h1>
      <div class="flex flex-col sm:flex-row justify-center">
        <div
          class="mx-4 basis-1/4 border-b-2 border-zinc-600 sm:border-b-0 hover:transition duration-500 hover:scale-110"
          @click="goto('div1')"
        >
          <img src="../assets/scam.png" class="w-1/6 mx-auto sm:w-1/2" />
          <p class="my-2 text-xs sm:text-sm text-center font-light">
            Did you provide any personal details to the scammer?
          </p>
        </div>

        <div
          class="mx-4 basis-1/4 border-b-2 border-zinc-600 sm:border-b-0 mt-3 sm:mt-0 hover:transition duration-500 hover:scale-110"
          @click="goto('div2')"
        >
          <img
            src="../assets/investigation.png"
            class="w-1/6 mx-auto sm:w-1/2"
          />
          <p class="my-2 text-xs sm:text-sm text-center font-light">
            Report an alleged scam attempt to authorities
          </p>
        </div>

        <div
          class="mx-4 basis-1/4 border-b-2 border-zinc-600 sm:border-b-0 mt-3 sm:mt-0 hover:transition duration-500 hover:scale-110"
          @click="goto('div3')"
        >
          <img src="../assets/shield.png" class="w-1/6 mx-auto sm:w-1/2" />
          <p class="my-2 text-xs sm:text-sm text-center font-light">
            Find out how to secure yourself with our tips and platform
          </p>
        </div>
      </div>
    </div>

    <div
      id="div1"
      class="mx-auto mt-6 rounded-xl bg-zinc-300/75 rounded shadow-xl p-5 w-3/4"
    >
      <h2
        class="text-sm font-medium font-light tracking-wide text-neutral-700 mb-4 text-center sm:text-xl sm:text-left"
      >
        1. Did you provide any personal details to the scammer?
      </h2>
      <div v-show="div1" class="flex flex-col sm:flex-row justify-center">
        <div class="mx-4 basis-1/2 border-b-2 border-zinc-600 sm:border-b-0">
          <p
            class="my-2 text-sm sm:text-lg text-center font-light text-rose-700"
          >
            Yes, I did...
          </p>
          <ul class="list-disc list-inside text-center mb-2 sm:text-left">
            <li
              class="text-xs sm:text-sm font-light text-neutral-700 mb-1 sm:mb-1"
            >
              Get in touch with your banks immediately.
            </li>
            <li class="text-xs sm:text-sm font-light text-neutral-700">
              Make a police report
            </li>
          </ul>
        </div>
        <div class="mx-4 basis-1/2 border-b-2 border-zinc-600 sm:border-b-0">
          <p
            class="my-2 text-sm sm:text-lg text-center font-light text-green-700"
          >
            No, I did not...
          </p>
          <ul class="list-disc list-inside text-center mb-2 sm:text-left">
            <li
              class="text-xs sm:text-sm font-light text-neutral-700 mb-1 sm:mb-1"
            >
              You should submit the alleged scam link to your bank and
              authorities.
            </li>
            <li class="text-xs sm:text-sm font-light text-neutral-700">
              Otherwise, you can use our platform to warn others
              <a class="font-small text-green-900 hover:text-[#1E7B7B]" href="/"
                >here</a
              >.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      id="div2"
      class="mx-auto mt-6 rounded-xl bg-zinc-300/75 rounded shadow-xl p-5 w-3/4"
    >
      <h2
        class="text-sm font-medium font-light tracking-wide text-neutral-700 mb-4 text-center sm:text-xl sm:text-left"
      >
        2. Report an alleged scam attempt to the authorities
      </h2>
      <div v-show="div2">
        <p
          class="my-2 text-sm sm:text-lg text-center sm:text-left sm:indent-4 font-light text-green-900"
        >
          To file for a report, you need to provide the following details:
        </p>
        <ul class="list-disc list-inside text-center mb-2 sm:text-left">
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Approximate Date & time of alleged scam
          </li>
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Channel used for alleged scam
          </li>
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Screenshot or copy of the scam message if available
          </li>
        </ul>
      </div>
    </div>

    <div
      id="div3"
      class="mx-auto mt-6 rounded-xl bg-zinc-300/75 rounded shadow-xl p-5 w-3/4"
    >
      <h2
        class="text-sm font-medium font-light tracking-wide text-neutral-700 mb-4 text-center sm:text-xl sm:text-left"
      >
        3. Find out how to secure yourself with our tips and platform
      </h2>
      <div v-show="div3">
        <ul class="list-disc list-inside text-center mb-2 sm:text-left">
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Be careful of links and attachments sent through emails or SMS or
            posted online on social media sites.
          </li>
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Stay current with the latest news.
          </li>
        </ul>
        <p
          class="my-2 text-sm sm:text-lg text-center sm:text-left sm:indent-4 font-light text-green-900"
        >
          You can use our platform to...
        </p>
        <ul class="list-disc list-inside text-center mb-2 sm:text-left">
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Submit the alleged scam link to this app.
          </li>
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Help others to determine if a post is a scam by upvoting or
            downbvoting it.
          </li>
          <li class="text-xs sm:text-sm font-light text-neutral-700 mb-1">
            Ask your loved ones to join and build a safer Singapore together.
          </li>
        </ul>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style scoped></style>
