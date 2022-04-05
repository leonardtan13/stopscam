<script setup>
import { ref } from "vue";

const showMenu = ref(false);

const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
};

defineProps({
  loginStatus: Boolean,
});

defineEmits({
  logout: Boolean,
});
</script>

<template>
  <nav
    id="navbar"
    class="relative flex flex-wrap items-center justify-between px-2 mb-2"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
          to="/"
          ><img src="../assets/ss_logo.png" alt="stop scam logo" class="h-12" />
        </router-link>
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          @click="toggleNavbar()"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <div
        :class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <button>
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/"
                >Community</router-link
              >
            </button>
          </li>
          <li v-show="loginStatus" class="nav-item">
            <button>
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/profile"
                >Profile</router-link
              >
            </button>
          </li>
          <li class="nav-item">
            <button>
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/help"
                >FAQ</router-link
              >
            </button>
          </li>
          <li v-show="loginStatus" class="nav-item">
            <button @click="$emit('logout', true)">
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/"
                >Log Out</router-link
              >
            </button>
          </li>
          <li v-show="!loginStatus" class="nav-item">
            <button>
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/login"
                >Log In</router-link
              >
            </button>
          </li>
          <li v-show="!loginStatus" class="nav-item">
            <button>
              <router-link
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                to="/register"
                >Sign Up</router-link
              >
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#navbar {
  background-color: var(--dark-green-color);
}
</style>
