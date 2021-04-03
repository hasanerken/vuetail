<template>
  <div v-if="notes" class="text-xs text-left pl-1 italic mt-2">
    Not: {{ notes }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({ notes: String });
</script>

<style lang="postcss" scoped></style>
