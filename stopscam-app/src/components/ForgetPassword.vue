<script setup>
import FormInput from "./FormInput.vue";
import ErrorMsg from "./ErrorMsg.vue";
import { ref, reactive } from "vue";
import {auth}  from "../firebase";
defineEmits({
    exit: Boolean,
})

let email = ref('')
let displayMsg = reactive({
    valid: true,
    msg: '',
    displayMsg: false
})

const forgetPassword = () => {
  auth.sendPasswordResetEmail(email.value)
  .then(() => {
    email.value = ''
    displayMsg.valid = false
  }).catch((fbError) => {
    displayMsg.displayMsg = true
    displayMsg.msg = fbError
  })

}
</script>

<template>
    <div class="modal-backdrop">
      <div
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-xl text-gray-700">Reset your password</h3>
            <svg
            @click="$emit('exit', true)"    
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4">
            <p class="mb-4 text-xs text-gray-700">
              You will need to submit your registered email for password reset
            </p>
            <FormInput 
                v-if="displayMsg.valid"
                   id="email"
                  v-model="email"
                  type="email"
                  name="Your Registered Email" />
            
            <p v-if="!displayMsg.valid" class="mb-4 text-sm text-gray-700 font-bold">
              Check your register email to reset your password!
            </p>
            

            <ErrorMsg
                v-if="displayMsg.displayMsg"
                  :error="displayMsg.msg"
                />
                <br>
                <br>

            <button 
            :disabled="!displayMsg.valid"
            class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded disabled:bg-blue-300" 
            @click.prevent="forgetPassword()"> 
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

