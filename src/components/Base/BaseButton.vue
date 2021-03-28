<template>
  <div
    class="ml-3 bg-indigo-600 cursor-pointer shadow inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 hover:text-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-200 border border-transparent rounded-md text-indigo-50 focus:outline-none"
  >
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ link: String });
</script>
