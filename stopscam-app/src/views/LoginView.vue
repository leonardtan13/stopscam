<script setup>
import { ref, reactive } from "vue";
import {auth}  from "../firebase";
import router from "../router";

import FormInput from "../components/FormInput.vue";
import SideBanner from "../components/SideBanner.vue";
import FormToggle from "../components/FormToggle.vue";
import FormButton from "../components/FormButton.vue";
import ErrorMsg from "../components/ErrorMsg.vue";

const state = reactive({
  email: "",
  password: "",
  valid: false,
});

const error = reactive({
  email: [false, ""],
  password: [false, ""],
});

function checkEmpty(userInput) {
  if (userInput === "") {
    return [true, "empty"];
  } else {
    return [false, ""];
  }
}

function checkPasswords(password) {
  let firstCheck = checkEmpty(password);
  if (firstCheck[0]) {
    return firstCheck;
  }
  if (password.length < 8) {
    return [true, "shortPw"];
  } else {
    return [false, ""];
  }
}

function checkEmail(userInput) {
  let firstCheck = checkEmpty(userInput);
  if (firstCheck[0]) {
    return firstCheck;
  } else if (!userInput.includes("@")) {
    return [true, "invalidEmail"];
  } else {
    return [false, ""];
  }
}

function formValid() {
  error.email = checkEmail(state.email);
  error.password = checkPasswords(state.password);
  for (let key in error) {
    if (error[key][0]) {
      return false;
    }
  }
  return true;
}

const loading = ref(false);

const Login = () => {
  loading.value = true
  state.valid = formValid();

  if (state.valid) {
    auth.signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        loading.value = false;
        router.push('/') // redirect to the feed
      })
      .catch(fbError => {
        loading.value = false;
        if (fbError.code.includes('user')) {
          error.email = [true, 'wrongUser']
        } else if (fbError.code.includes('password')) {
          error.email = [true, '']
          error.password = [true, 'wrongPw']
        }
        
      });
  }
};
</script>
<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">
      <SideBanner message-index="login" />

      <div
        class="rounded-2xl bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10"
      >
        <form class="space-y-4" @submit.prevent="Login">
          <div class="rounded-md space-y-px px-3">
            <div class="grid gap-6">
              <div class="col-span-12 h-14">
                <FormInput
                  id="email_address"
                  v-model="state.email"
                  type="text"
                  name="Email Address"
                  :input-error="error.email[0]"
                />
                <ErrorMsg
                  v-if="error.email[0]"
                  id="Email"
                  :error="error.email[1]"
                />
              </div>

              <div class="col-span-12 h-14">
                <FormInput
                  id="password"
                  v-model="state.password"
                  type="password"
                  name="Password"
                  :input-error="error.password[0]"
                />
                <ErrorMsg
                  v-if="error.password[0]"
                  id="Password"
                  :error="error.password[1]"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4">
            <div class="text-xs absolute right-24 sm:right-8">
              <a
                href="#"
                class="font-small text-[#0D3939] hover:text-green-500">
                Forgot password?
              </a>
            </div>
          </div>

          <FormButton toggle-index="login" :spinner="loading"/>
        </form>

        <FormToggle toggle-index="login" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0d3939;
}
</style>
