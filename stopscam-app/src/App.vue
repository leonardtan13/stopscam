<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavBar from "./components/NavBar.vue";
import { auth } from "./firebase";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { initPostsData, enableUpdates, initUsersData } from "./services/store";

const router = useRouter();
const isLoggedIn = ref(true);

onBeforeMount(() => {
  console.log("calling init...");
  initPostsData();
  initUsersData();
  console.log("enabling realtime updates...");
  enableUpdates();
});

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    console.log(user.uid);
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});

const signOut = () => {
  auth.signOut();
  router.push("/login");
};
</script>

<template>
  <div>
    <NavBar :login-status="isLoggedIn" @logout="signOut()" />

    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/styles/variables.css";
body {
  background-color: #0d3939;
}
</style>
