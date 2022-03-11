<script setup>
//Authentication function and pass login state to App
import FormInput from "../components/FormInput.vue";
import SideBanner from "../components/SideBanner.vue";
import FormToggle from "../components/FormToggle.vue";
import FormButton from "../components/FormButton.vue";

import {ref} from 'vue';

const email = ref("");
const password = ref("");
const name = ref("")
const confirmPassword = ref("")

const Register = () => {
  console.log(email)
  console.log(password)
  console.log(name)
  console.log(confirmPassword)
}

</script>

<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">

      <SideBanner messageIndex="register" />

      <div class="rounded-2xl bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10">
        <form class="space-y-4" @submit.prevent='Register'>
          <div class="rounded-md space-y-px px-3">
            <div class="grid gap-6">

              <div class="col-span-12">
                <FormInput id="name" v-model="name" type="text" name="Name" />
              </div>

              <div class="col-span-12">
                <FormInput id="email_address" v-model="email" type="text" name="Email Address" />
              </div>

              <div class="col-span-12">
                <FormInput id="password" v-model="password" type="password" name="Password" />
              </div>

              <div class="col-span-12">
                <FormInput id="confirmPassword" v-model="confirmPassword" type="password" name="Confirm Password" />
              </div>

            </div>
            <div class="form-check pt-4">
             <input type="checkbox" class="form-checkbox h-3 w-3 text-green-600">
                <span class="text-xs ml-2 text-gray-700">
                  I agree to the 
                    <span class="font-bold">Terms of Service</span> and 
                    <span class='font-bold'>Privacy Policy</span>
                </span>
            </div>

          </div>

          <FormButton toggleIndex='register'/>

        </form>

        <FormToggle toggleIndex="register" />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0d3939;
}
</style>
