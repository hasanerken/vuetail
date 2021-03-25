<template>
  <main>
    <header class="bg-gray-50 p-2" v-if="$route.meta.title">
      <div class="flex flex-row justify-between items-center">
        <router-link to="/">
          <div class="flex flex-col text-center">
            <h1 class="text-md sm:text-2xl md:text-3xl">
              <span class="text-indigo-500 font-extrabold"> MENÜNÜZ</span
              ><span class="font-light text-gray-600">BURADA </span>
            </h1>
            <h3 class="text-xxs sm:text-sm leading-tight text-indigo-900">
              - {{ $route.meta.title }} -
            </h3>
          </div>
        </router-link>
        <div class="">
          <div
            v-for="(page, index) in pages"
            :key="index"
            :class="$route.path === page.path ? 'border-indigo-500' : 'border-gray-50' "
            class="inline-flex items-center justify-center p-0 font-medium leading-6 text-gray-800 hover:text-indigo-500 transition duration-1000 ease-in-out hover:border-green-300 hover:border-b-2 border-b-2 mx-2 focus:outline-none"
          >
            <router-link :to="page.path" class="sm:px-2 sm:py-1">
              <div class="flex flex-col md:flex-row items-center">
                <img
                  class="h-10 w-10 sm:h-12 sm:w-12 md:h-15 md:w-15 sm:p-1"
                  :src="page.icon"
                  alt=""
                />
                <span class="text-xxs sm:text-sm md:text-md text-gray-600">{{
                  page.title
                }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <router-view />
  </main>
</template>

<script setup>
import { ref } from "vue";
const pages = ref([
  { path: "/general", title: "BİLGİLER", icon: "/general.svg" },
  {
    path: "/categories",
    title: "KATEGORİLER",
    icon: "/categories.svg"
  },
  { path: "/products", title: "ÜRÜNLER", icon: "/products.svg" }
]);
</script>

<style lang="postcss" scoped></style>
