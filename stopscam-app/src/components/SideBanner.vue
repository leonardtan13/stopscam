<script setup>
defineProps({
  messageIndex: String,
});

const message = {
    "login": [`Welcome back to the <br /> community.`,
        `Login to start spreading the words.`], 
    "register": [`Be a community member <br /> today.`,
        `Stop the spread of online scams by spreading the words.`]
}

function displayMessage(messageIndex) {
    return message[messageIndex]
}
</script>

<template>
      <div class="ml-6 mb-6 sm:absolute left-10 md:mt-4">
        <h1 class="text-4xl text-white" v-html="displayMessage(messageIndex)[0]">
        </h1>
        <p class="text-sm text-white">
            {{displayMessage(messageIndex)[1]}}
        </p>
      </div>
</template>

