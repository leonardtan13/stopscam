<script setup>
defineProps({
  userName: String,
  userRepScore: Number,
  userDescription: String,
});
</script>

<template>
  <body>
    <div class="container mx-auto my-10 p-6 rounded-2xl w-3/4 sm:w-full">
      <h1 class="mb-2 text-slate-300 text-lg indent-10 ml-3 font-light sm:text-2xl sm:ml-10">
        {{ userName }}
      </h1>
      <h2 class="mb-2 text-slate-300 text-sm indent-10 ml-3 font-light sm:text-lg sm:ml-10">
        Reputation Score: {{ userRepScore }}
      </h2>
      <p class="text-slate-300 text-xs ml-3 sm:text-sm">
        {{ userDescription }}
      </p>
    </div>
  </body>
</template>

<style scoped>
div {
    background-color: #314E4E;
}
</style>
