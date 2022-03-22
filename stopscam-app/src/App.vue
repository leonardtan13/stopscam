<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavBar from "./components/NavBar.vue";
import {auth} from "./firebase";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  
const router = useRouter()
const isLoggedIn = ref(true)

auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

const signOut = () => {
    auth.signOut()
    router.push('/login')
  }


</script>

<template>
  <div>
    <NavBar :loginStatus="isLoggedIn" @logout="signOut()"/>

    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/styles/variables.css";
</style>
