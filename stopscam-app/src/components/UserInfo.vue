<script setup>
defineProps({
  userName: String,
  userRepScore: Number,
  userDescription: String,
});
</script>

<template>
  <body>
    <!-- User Image -->
    <div class="container mx-auto mt-20 my-10 sm:w-full">
      <div class="grid place-content-center">
        <img src="https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_620/MTc0NDI5MTc5NzI1NDg5Nzk4/top-10-greatest-leonardo-dicaprio-movies.webp"
          class="self-center justify-self-end object-cover rounded-full w-48 h-48"
        >
     </div>
    </div>

    <!-- User Profile -->
    <div class="container mx-auto my-10 p-6 rounded-xl w-3/4 sm:w-2/3 bg-20">
      <div class="grid grid-flow-row auto-rows-max gap-6">
        
        <h1
          class="text-slate-300 text-xl text-center font-sm sm:text-3xl font-semibold"
        >
          {{ userName }}
        </h1>

        <div class="grid mx-auto bg-white w-32 h-32 rounded-lg">
          <h2
            class="text-slate-700 text-center text-md font-medium sm:text-xl mt-2"
          >
            Reputation Score: 
           
          </h2>
          <h1 class="text-slate-700 text-center text-lg font-semibold sm:text-3xl"
          >
            {{ userRepScore }}
          </h1>
        </div>

        <p class="text-slate-300 text-center text-sm sm:text-xl font-normal">
          {{ userDescription }}
        </p>

      </div>
    </div>

    <!-- User Posts -->
    <div class="container mx-auto my-10 p-6 rounded-xl w-3/4 sm:w-2/3 bg-white">
      <div class="grid grid-flow-row auto-rows-max gap-6">
       Retrieve from feed
      </div>
    </div>

  </body>
</template>

<style scoped>
.bg-20 {
  background-color: #314e4e;
}
</style>
