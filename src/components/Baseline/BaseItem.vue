<template>
  <div v-if="type === 4" class="p-2">
    <div class="card-animation">
      <div class="w-1 bg-gray-800 h-auto rounded-lg z-10">
        <div
          class="absolute bottom-0 p-2 mb-2 uppercase font-bold right-0 text-gray-500 text-xs"
        >
          {{ product.category }}
        </div>
      </div>
      <div class="card-container card-animation">
        <div class="flex-auto p-2 text-left">
          <div class="font-bold mb-2 text-xl">{{ product.name }}</div>
          <div class="text-sm">{{ product.description }}</div>
          <Explanation :explanation="product.explanation" />
          <Notes :notes="product.notes" />
          <Circle :price="product.price" class="absolute -right-3 -top-3" />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="type === 5" class="line">
    <div class="flex-1">
      <div class="name">
        {{ product.name }}
      </div>
      <Circle :price="product.price" class="absolute right-0 top-5" />
      <Explanation :explanation="product.explanation" />
      <Notes :notes="product.notes" />
    </div>
  </div>
  <div v-else-if="type === 6" class="line">
    <div class="flex-1">
      <div class="name">
        {{ product.name }}
      </div>
      <div class="absolute right-4 top-4 font-bold">{{ product.price }} ₺</div>
    </div>
  </div>
  <div v-else class="card-container line">
    <div class="name">
      {{ product.name }}
    </div>
    <fa-solid-book-reader
      class="text-gray-400 text-xl absolute right-6 top-4"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  product: Object,
  type: Number
});
</script>

<style lang="postcss" scoped>
.card-container {
  @apply flex flex-row bg-white rounded-lg p-3;
}
.card-animation {
  @apply flex max-w-md flex-row transform -rotate-1 transition duration-300 ease-in-out hover:rotate-0;
}
.circle {
  @apply h-16 w-16 text-gray-800 border-2 border-white rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 flex justify-center items-center font-bold p-1 shadow-md;
}
.line {
  @apply p-4 flex items-center rounded-lg max-w-md flex-row bg-white relative transform scale-95 transition-all duration-500 ease-in-out hover:scale-100;
}
.name {
  @apply flex-auto text-xl font-bold text-left;
}
</style>
