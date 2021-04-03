<template>
<div class="w-screen flex justify-center">
    <div class="w-11/12 sm:max-w-sm relative shadow-lg rounded-sm">
      <img :src="product.imageUrl" alt="" class="rounded-sm" />
       <mdi-bookmark-outline
          v-if="!isBookmarked"
          class="absolute cursor-pointer left-0 top-0 text-3xl text-gray-300"
          @click="toggleBookmark(product)"
        />
        <mdi-bookmark
          v-else
          class="cursor-pointer absolute left-0 top-0 text-3xl text-white"
          @click="toggleBookmark(product)"
        />
      <div
        class="absolute bottom-0 left-0 p-3 bg-gray-800 w-full  bg-opacity-50 rounded-sm"
      >
        <span class="text-xl tracking-wide text-gray-100 ">
          {{ product.title }}
        </span>
      </div>
      <div class="absolute top-2   right-2 h-16 w-16 flex items-center justify-center font-semibold shadow-inner text-gray-900 rounded-full bg-gradient-to-l from-yellow-200 to-yellow-300 border-2 border-yellow-100">
          <span>
              {{ turkishLira(product.price) }}
          </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmit, ref } from "vue";
const props = defineProps({
  product: Object
});
const emit = defineEmit(["bookmarkAdded"]);
const isBookmarked = ref(false);
const isExpanded = ref(true);

function toggleBookmark(product) {
  isBookmarked.value = !isBookmarked.value;
  if (isBookmarked.value) {
    emit("bookmarkAdded", product);
  } else {
    emit("bookmarkRemoved", product);
  }
}

function toggleExtension() {
  isExpanded.value = !isExpanded.value;
}

function turkishLira(value) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY"
  }).format(value);
}
</script>

<style lang="postcss" scoped></style>
