<script setup>
defineProps({
  // take in login or register
  error: String,
  id: String,
});

function DisplayError(error, id) {
  return id + " is " + error;
}
</script>

<template>
  <div
    class="mt-3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md relative"
    role="alert"
  >
    <span class="block xs:inline text-xs">{{ DisplayError(error, id) }}</span>
  </div>
</template>
