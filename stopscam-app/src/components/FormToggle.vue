<script setup>
defineProps({
// take in login or register
  toggleIndex: String,
});

const message = {
    "login": [`Not a member yet?`,
        `Sign up`], 
    "register": [`Already a member?`,
        `Login`]
}

function displayMessage(toggleIndex) {
    return message[toggleIndex]
}

function toggleRoute(toggleIndex) {
    if (toggleIndex == "login") {
        return `/register`
    } else {
        return `/login`
    }
}
</script>

<template>
        <div class="flex items-center justify-center pt-5">
          <p class="text-xs">
            {{displayMessage(toggleIndex)[0]}}
            <router-link 
                class="font-small text-[#0D3939] hover:text-[#1E7B7B] font-bold"
                :to="toggleRoute(toggleIndex)"> {{displayMessage(toggleIndex)[1]}}
            </router-link>
          </p>
        </div>
</template>
