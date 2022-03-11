<script setup>
import CardComponent from "./CardComponent.vue";
import "../index.css";
</script>

<template>
  <!-- Search bar -->
  <div class="pt-2 text-gray-600 mb-4 w-3/4 mx-auto">
    <img
      class="inline object-cover w-12 h-12 mr-2 rounded-full ml-64"
      src="https://0.soompi.io/wp-content/uploads/2022/01/11203504/Kim-Tae-Ri2.jpg"
      alt="Profile image"
    />
    <input
      class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-1/2"
      type="text"
      name="create"
      placeholder="Post something to your community"
    />
  </div>

  <!-- Nav Link -->
  <div class="w-3/4 mx-auto bg-white rounded">
    <ul class="flex border-b">
      <li class="-mb-px ml-4 mr-4 p-4">
        <a
          class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-teal-700 font-semibold"
          href="#"
        >All</a>
      </li>
      <li class="mr-4 p-4">
        <a
          class="bg-white inline-block py-2 px-4 text-teal-700 hover:text-teal-800 font-semibold"
          href="#"
        >Popular</a>
      </li>
      <li class="mr-4 p-4">
        <a
          class="bg-white inline-block py-2 px-4 text-teal-700 hover:text-teal-800 font-semibold"
          href="#"
        >Newest</a>
      </li>
    </ul>

    <!-- Rendering of different posts (use v-for) -->
    <CardComponent
      scam-link="http://tripadvisory.com"
      caption="Check out the site! Definitely not the tripadvisor that we know of! Visually, it looks almost similar to the authentic website. I almost made my booking here. Becareful everyone!"
      imgURL="https://www.webintravel.com/wp-content/uploads/2018/11/tripadvisor2.jpg"
      avatar="https://media.gq.com/photos/56bcb218cdf2db6945d2ef93/16:9/w_2000,h_1125,c_limit/bieber-coverstory-square.jpg"
      user="JustinBelieber"
      duration="6h"
      vote-count="20"
    />
  </div>
</template>
