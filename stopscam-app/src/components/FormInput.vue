<script setup>
defineProps({
  id: String,
  type: String,
  name: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(value) {
  emit("update:modelValue", value);
}
</script>

<template>
  <label for="{{id}}" class="ml-3 block text-sm font-medium text-gray-700">{{
    name
  }}</label>
  <input
    type="{{type}}"
    class="h-8 mt-1 border-2 border-[#CDDFD3] focus:ring-indigo-500 focus:border-indigo-500 block w-full drop-shadow-md sm:text-sm rounded-md"
    :value="modelValue"
    @input="updateValue($event.target.value)"
  />
</template>

<style scoped></style>
