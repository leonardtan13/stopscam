<script setup>
import { ref, reactive } from "vue";
import userInfo from "../components/UserInfo.vue";

const userObj = reactive({
  name: "Leonardo Dicaprio",
  repScore: 89,
  description:
    "Lorem ipsum dolor sit amet. Non sunt modi et voluptatem minima non doloribus nihil vel eaque quibusdam cum dolore quod non molestiae minima.",
});
</script>

<template>
  <userInfo
    :userName="userObj.name"
    :userRepScore="userObj.repScore"
    :userDescription="userObj.description"
  >
  </userInfo>
</template>

<style scoped>
body {
  background-color: #0d3939;
}
</style>
