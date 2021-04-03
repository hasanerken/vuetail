<template>
  <div class="p-2 transition-opacity duration-500 opacity-90 hover:opacity-100">
    <div v-if="type === 3" class="relative max-w-sm">
      <img :src="product.imageUrl" alt="" class="rounded-md" />
      <p
        class="absolute bottom-0 text-2xl bg-gray-800 w-full text-left text-white p-2 bg-opacity-25"
      >
        {{ product.name }}
      </p>
    </div>

    <div
      v-else
      class="transform -rotate-1 transition duration-300 ease-in-out hover:rotate-0"
    >
      <div class="card-upside">
        <img :src="product.imageUrl" alt="" class="rounded-t-md" />

        <div v-if="product.price" class="flex items-center relative mb-8">
          <Circle
            class="absolute"
            :price="product.price"
            :imageUrl="product.imageUrl"
          />
        </div>

        <div class="px-8 pb-4" :class="product.price ? '' : 'mt-2'">
          <h2 class="text-gray-800 text-xl font-bold">{{ product.name }}</h2>
          <p class="text-gray-600 text-sm mb-2">
            {{ product.description }}
          </p>
          <Explanation
            :explanation="product.explanation"
            :imageUrl="product.imageUrl"
          />
          <Notes :notes="product.notes" />
        </div>
        <Chip v-if="product.category"  :category="product.category" class=""/>
      </div>
    </div>
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
.card-upside {
  @apply relative max-w-sm rounded-md border border-gray-200 bg-white shadow-lg;
}
</style>
