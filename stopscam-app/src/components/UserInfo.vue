<script setup>
defineProps({
  userName: String,
  userRepScore: Number,
  userDescription: String,
  userPicURL: String,
});

const randBg = {
    0: "bg-sky-400",
    1: "bg-teal-400",
    2: "bg-amber-400",
    3: "bg-indigo-400",
    4: "bg-pink-400",
    5: "bg-red-400",
    6: "bg-orange-400",
    7: "bg-green-400",
}

function formatRepScore(repScore) {
  if (repScore >= 85) {
    return "text-emerald-600 text-xl text-center font-sm sm:text-3xl font-semibold";
  } else if (repScore < 85 && repScore >= 65) {
    return "text-orange-300 text-xl text-center font-sm sm:text-3xl font-semibold";
  } else {
    return "text-rose-900 text-xl text-center font-sm sm:text-3xl font-semibold";
  }
}

function displayName(userName) {
  var names = userName.split(' ')
  var initials = names[0].substring(0,1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0,1).toUpperCase()
  }
    return initials
}

function formatDP(picURL, userName) {
  if (!picURL) {
    var rand = Math.floor(Math.random() * 8)
    let result = '<div '
    result += `class= "grid content-center mx-auto 
                      rounded-full w-40 h-40 ` + randBg[rand] + ` 
                      hover:border-4 hover:border-slate-500">
                <p
                  class="text-white font-mono text-center text-6xl antialiased font-light hover:text-slate-300"
                >     
                ` + displayName(userName) + `</p>
                </div>`
    return result
  }
}

function edit(userName) {
  console.log(userName)
}
</script>

<template>
  <body>
    <!-- User Image -->
    <div class="container mx-auto mt-20 my-10 sm:w-full ">
      <div 
        @click='edit(userName)'
        v-html="formatDP(userPicURL,userName)" 
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
          <h1 :class="formatRepScore(userRepScore)">
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
