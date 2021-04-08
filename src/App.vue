<template>
  <main>
    <header class="bg-white" v-if="$route.meta.title">
      <div class="flex flex-row justify-center sm:justify-between items-center">
        <div
          @click="goToPanel"
          class="flex flex-col justify-center sm:justify-start text-center"
        >
          <div class="p-5">
            <h1 class="text-3xl md:text-3xl">
              <span class="text-indigo-500 font-extrabold"> MENÜNÜZ</span>

              <span class="font-light text-gray-600">BURADA </span>
            </h1>
            <h3 class="text-sm sm:text-md leading-tight text-gray-700">
              - {{ $route.meta.title }} -
            </h3>
          </div>
        </div>

        <div :class="$route.path === '/' ? 'hidden' : ''">
          <div
            v-for="(page, index) in pages"
            :key="index"
            :class="
              $route.path === page.path ? 'border-blue-400' : 'border-white'
            "
            class="hidden sm:inline-flex items-center justify-center p-0 font-medium leading-6 text-gray-800 hover:text-indigo-500 transition duration-1000 ease-in-out hover:border-blue-300 hover:border-b-2 border-b-2 mx-2 focus:outline-none"
          >
            <div class="flex flex-col md:flex-row items-center cursor-pointer" @click="goToPage(page.path)">
              <img
                class="h-10 w-10 sm:h-12 sm:w-12 md:h-15 md:w-15 sm:p-1"
                :src="page.icon"
                alt=""
              />
              <span class="text-xxs sm:text-sm md:text-md text-gray-600">{{
                page.title
              }}</span>
            </div>
          </div>
        </div>
        <div :class="$route.path === '/' ? '' : 'hidden'">
          <div
            v-for="(page, index) in landing"
            :key="index"
            :class="
              $route.path === page.path ? 'border-indigo-500' : 'border-white'
            "
            class="hidden sm:inline-flex items-center justify-center p-0 font-medium leading-6 text-gray-800 hover:text-indigo-500 transition duration-1000 ease-in-out hover:border-green-300 hover:border-b-2 border-b-2 mx-2 focus:outline-none"
          >
            <div class="sm:px-2 sm:py-1 cursor-pointer" @click="scrollToId(page.path)">
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
            </div>
          </div>
        </div>
      </div>
    </header>

    <router-view />
  </main>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "./directives/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const userId = ref(auth?.currentUser?.uid);

function goToPanel() {
  router.push("/menus/" + userId.value);
}

function goToPage(path) {
  if (path === "/signout") {
    auth.signOut()
    router.push('/')
  } else {
    router.push(path);
  }
}

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

const pages = ref([
  { path: `/menus/${userId.value}`, title: "MENÜLER", icon: "/fork.svg" },
  {
    path: "/signout",
    title: "ÇIKIŞ",
    icon: "/exit.svg"
  }
  /*
  { path: "/products", title: "ÜRÜNLER", icon: "/products.svg" }
 */
]);

const landing = ref([
  { path: "benefits", title: "GENEL BİLGİLER", icon: "/benefits.png" },
  {
    path: "pricing",
    title: "FİYATLANDIRMA",
    icon: "/pricing.png"
  },
  { path: "contact", title: "İLETİŞİM", icon: "/contact.png" }
]);
</script>

<style lang="postcss">
html {
  scroll-behavior: smooth;
}
</style>
