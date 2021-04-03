<template>
<div class="w-screen flex justify-center bg-white rounded-sm">
  <div class="flex flex-row w-11/12 sm:max-w-sm justify-between items-center p-4 shadow-lg">
    <div class="text-xl tracking-wide font-semibold">
      {{ product.title }}
    </div>
    <div class="p-2 font-semibold text-lg">
        {{ turkishLira(product.price) }}
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
