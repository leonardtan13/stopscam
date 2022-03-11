<script setup>
import FormInput from "../components/FormInput.vue";
import SideBanner from "../components/SideBanner.vue";
import FormToggle from "../components/FormToggle.vue";
import FormButton from "../components/FormButton.vue";

//Authentication function and pass login state to App
import {ref} from 'vue';


const email = ref("");
const password = ref("");

const Login = () => {
  console.log(email)
  console.log(password)
}
</script>
<template>
  <div class="h-screen w-screen flex justify-center sm:mt-20">
    <div class="w-4/5 sm:w-1/3">
      <SideBanner messageIndex="login" />

      <div class="rounded-2xl bg-white rounded overflow-hidden shadow-xl p-5 sm:absolute right-10">
        <form class="space-y-4" @submit.prevent='Login'>

          <div class="rounded-md space-y-px px-3">

            <div class="grid gap-6">

              <div class="col-span-12">
                <FormInput id="email_address" v-model="email" type="text" name="Email Address" />
              </div>

              <div class="col-span-12">
                <FormInput id="password" v-model="password" type="password" name="Password" />
              </div>

            </div>

          </div>

          <div class="flex items-center justify-between pt-2">
            <div class="text-xs absolute right-24 sm:right-8">
              <a href="#" class="font-small text-[#0D3939] hover:text-green-500">
                Forgot password?
              </a>
            </div>
          </div>

          <FormButton toggleIndex='login'/>

        </form>

        <FormToggle toggleIndex="login" />

      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #0d3939;
}
</style>
