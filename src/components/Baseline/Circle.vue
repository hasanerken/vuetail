<template>
  <div class="circle">
    {{ price }} ₺
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ price: Number});
</script>

<style lang="postcss" scoped>
.circle {
  @apply flex justify-center items-center p-1 w-16 h-16 rounded-full text-gray-900 font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 z-30 border-2 border-white  mx-4 shadow-xl;
}
</style>
