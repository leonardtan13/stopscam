<script setup>
defineProps({
  id: String,
  type: String,
  name: String,
  modelValue: String,
  inputError: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}

function changeBorder(inputError) {
  if (inputError) {
    return "h-8 mt-1 border-2 border-rose-400 bg-rose-100 focus:ring-red-500 focus:border-red-500 block w-full drop-shadow-md sm:text-sm rounded-md";
  } else {
    return "h-8 mt-1 border-2 border-[#CDDFD3] focus:ring-indigo-500 focus:border-indigo-500 block w-full drop-shadow-md sm:text-sm rounded-md";
  }
}
</script>

<template>
  <label :for="id" class="ml-3 block text-sm font-medium text-gray-700">{{
    name
  }}</label>
  <input
    :type="type"
    :class="changeBorder(inputError)"
    :value="modelValue"
    @input="updateValue($event.target.value)"
  />
</template>

<style scoped></style>
