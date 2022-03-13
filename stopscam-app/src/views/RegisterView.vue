<script setup>
//Authentication function and pass login state to App
import FormInput from "../components/FormInput.vue";
import SideBanner from "../components/SideBanner.vue";
import FormToggle from "../components/FormToggle.vue";
import FormButton from "../components/FormButton.vue";
import ErrorMsg from "../components/ErrorMsg.vue";

import { ref } from "vue";

const name = ref("");
let nameError = ref(false);
const email = ref("");
const password = ref("");

const confirmPassword = ref("");
const loading = ref(false);

function checkInput(userInput) {
  if (userInput.value === "") {
    return true;
  } else {
    return false;
  }
}

const Register = () => {
  console.log(email);
  console.log(password);
  console.log(name);
  console.log(confirmPassword);

  nameError.value = checkInput(name);
  loading.value = true
  setTimeout(() => {  loading.value = false }, 2000);
  

};
</script>

<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">
      <SideBanner message-index="register" />

      <div
        class="rounded-2xl bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10"
      >
        <form class="space-y-4" @submit.prevent="Register">
          <div class="rounded-md space-y-px px-3">
            <div class="grid gap-6">
              <div class="col-span-12">
                <FormInput id="name" v-model="name" type="text" name="Name" />
                <ErrorMsg v-if="nameError" id="name" error="empty" />
              </div>

              <div class="col-span-12">
                <FormInput
                  id="email_address"
                  v-model="email"
                  type="text"
                  name="Email Address"
                />
              </div>

              <div class="col-span-12">
                <FormInput
                  id="password"
                  v-model="password"
                  type="password"
                  name="Password"
                />
              </div>

              <div class="col-span-12">
                <FormInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  name="Confirm Password"
                />
              </div>
            </div>
            <div class="form-check pt-4">
              <input
                type="checkbox"
                class="form-checkbox h-3 w-3 text-green-600"
              />
              <span class="text-xs ml-2 text-gray-700">
                I agree to the
                <span class="font-bold">Terms of Service</span> and
                <span class="font-bold">Privacy Policy</span>
              </span>
            </div>
          </div>

          <FormButton toggle-index="register" :spinner="loading" />
        </form>

        <FormToggle toggle-index="register" />


      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0d3939;
}
</style>
