<template>
  <div class="flex justify-end m-2">
    <div class="chip">
      {{ category }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ category: String });
</script>

<style lang="postcss" scoped>
.chip {
  @apply inline-block p-2 rounded-full font-bold text-xs text-gray-500 border border-gray-300 shadow-md uppercase;
}
</style>
