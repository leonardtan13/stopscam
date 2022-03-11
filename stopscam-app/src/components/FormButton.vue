<script setup>
defineProps({
// take in login or register
  toggleIndex: String,
});

function displayName(toggleIndex) {
    if (toggleIndex == 'login') {
        return 'Login'
    } else {
        return 'Sign Up'
    }
}
</script>

<template>
    <div class="pt-2 grid content-center">
        <button
            type="submit"
            class="w-1/2 py-2 px-4 m-auto
                border border-transparent text-sm 
                rounded-md text-white bg-[#0D3939] 
                hover:bg-[#267A7A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[[#1E7B7B]">
              {{displayName(toggleIndex)}}
            </button>
          </div>
</template>