<script setup>
defineProps({
  messageIndex: String,
});

const message = {
  login: [
    `Welcome back to the <br /> community.`,
    `Login to start spreading the words.`,
  ],
  register: [
    `Be a community member today.`,
    `Stop the spread of online scams by spreading the words.`,
  ],
};

function displayMessage(messageIndex) {
  return message[messageIndex];
}
</script>

<template>
  <div class="ml-6 mb-6 max-w-md sm:absolute left-10 md:absolute left-3">
    <h1
      class="text-4xl text-white font-medium tracking-wide"
      v-html="displayMessage(messageIndex)[0]"
    ></h1>
    <p class="text-sm text-white leading-loose tracking-wide indent-2">
      {{ displayMessage(messageIndex)[1] }}
    </p>
  </div>
</template>
