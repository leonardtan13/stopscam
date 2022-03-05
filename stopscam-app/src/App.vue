<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div>
    <NavBar />

    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/styles/variables.css";
</style>
