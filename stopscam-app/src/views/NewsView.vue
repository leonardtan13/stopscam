<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

interface Article {
    source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: date,
    content: string,
}

const results: Article[] = ref([])

const getNews = async () => {
  const searchQuery = "scam"
  const API_KEY = import.meta.env.VITE_NewsAPI
  const params = {
      apiKey: API_KEY,
      q: searchQuery,
  }
  

  const url = "https://newsapi.org/v2/everything?"
  const stringParams = new URLSearchParams(params).toString()
  const res = await fetch(url + stringParams)
  const data = await res.json()
  console.log(res)
  console.log(data)
  return data.articles
};

onBeforeMount( async () => {
    const articles: Article[] = await getNews()
    results.value = articles
})



</script>

<template>
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2">
        <div class="bg-white max-w-sm rounded overflow-hidden shadow-lg" v-for="article of results">
            <a :href="article.url"><img class="w-full" :src="article.urlToImage" alt="Article image"></a>
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{article.title}}</div>
                <p class="text-gray-700 text-base">
                {{article.description}}
                </p>
            </div>
        </div>
    </div>
  </div>
</template>
