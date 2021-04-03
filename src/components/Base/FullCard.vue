<template>
<div class="w-screen flex justify-center">
    <div
      class="w-11/12 sm:max-w-sm h-full rounded-sm shadow-xl hover:shadow-2xl  duration-500 transition hover:border-indigo-50"
    >
      <div class="relative">
        <img :src="product.imageUrl" alt="" class="rounded-sm" />
        <div :class="product.imageUrl ? 'text-white' : 'm-4 text-red-800' ">
        <mdi-bookmark-outline
          v-if="!isBookmarked"
          class="absolute left-0 top-0 text-3xl text-gray-300 cursor-pointer"
          @click="toggleBookmark(product)"
        />
        <mdi-bookmark
          v-else
          class="absolute left-0 top-0 text-3xl  cursor-pointer"
          @click="toggleBookmark(product)"
        />
        </div>
      </div>
      <div class="p-5 rounded-b-lg">
        <div class="flex flex-row justify-between">
          <div class="text-xl leading-tight font-semibold pr-3">
            {{ product.title }}
          </div>
          <div
            class="text-xl font-semibold text-gray-800 flex items-center pl-1"
          >
            {{ turkishLira(product.price) }}
          </div>
        </div>
        <div v-if="product.options" class="text-md text-justify text-gray-900 leading-tight py-1">
          {{ product.options }}
        </div>
        <div
        v-if="product.contents"
          class="text-md font-light text-justify text-gray-700 leading-tight py-1"
        >
          {{ product.contents }}
        </div>
        <div
        v-if="product.description"
          :class="
            isExpanded
              ? 'transition-all transform -translate-y-36 duration-1000 hidden'
              : 'transition-all transform translate-y-0 duration-1000'
          "
        >
          <div
            class="text-sm text-justify transition duration-300 ease-in-out text-gray-500 leading-tight py-2"
          >
            {{ product.description }}
          </div>
        </div>
      </div>
        <div 
        v-if="product.description"
        @click="isExpanded = ! isExpanded"
        class="bg-yellow-100 cursor-pointer shadow hover:bg-yellow-200 transition duration-300 rounded-b-lg flex justify-center p-1">
            <mdi-chevron-down v-if="isExpanded" class="text-xl"/>
            <mdi-chevron-up  class="text-xl" v-else/>
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
