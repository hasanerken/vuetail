<template>
  <div
    v-if="explanation"
    class="text-xs text-pink-400 pl-1 font-bold mt-1"
    :class="imageUrl ? 'text-center' : 'text-left '"
  >
    {{ explanation }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ explanation: String, imageUrl: String });
</script>

<style lang="postcss" scoped></style>
