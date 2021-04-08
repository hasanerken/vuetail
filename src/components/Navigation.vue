<template>
  <div class="bg-gray-50">
    <div
      class="menu-container"
      id="toggle"
      @click="toggleMenu"
      :class="
        active
          ? 'open full-menu overflow-x-auto flex items-start  justify-center'
          : 'open'
      "
    >
      <a href="#" class="menu p-2">
        <mdi-apps
          v-if="!active"
          class="text-gray-600 text-3xl z-50"
        /><mdi-close v-else class="text-gray-600 text-3xl z-50" />
      </a>

      <div class="flex flex-col items-center justify-center p-6">
        <div class="font-semibold text-2xl">Ürün Çeşitlerimiz</div>
        <div
          class="grid grid-cols-2 gap-2 justify-center items-center text-2xl my-10 text-white"
        >
          <div v-for="category in categories" :key="category.id" class="">
            <router-link
              v-if="category.imageUrl !== ''"
              :to="'/' + alias + '/' + category.id"
            >
              <div
                @click="goToPage(category.id)"
                class="hover:border-2 cursor-pointer hover:border-indigo-200 hover:shadow-inner relative bg-indigo-600 shadow-xl transition transform hover:scale-105 duration-300 rounded-sm"
              >
                <img :src="category.imageUrl" alt="" />
                <div class="band">{{ category.title }}</div>
              </div>
            </router-link>
            <router-link v-else :to="'/' + alias + '/' + category.id">
              <div
                @click="goToPage(category.id)"
                class="cursor-pointer text-gray-800 hover:text-indigo-700 transition transform hover:scale-105 p-2 relative text-xl text-center"
              >
                <div class="">{{ category.title }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { db } from "../directives/firebase";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRoute();
const alias = ref(route.params.alias);

const props = defineProps({ categories: Array });

onMounted(() => {});

const active = ref(false);

function goToPage(path) {}

const toggleMenu = () => {
  active.value = !active.value;
};
</script>

<style lang="postcss" scoped>
.menu-container {
  background-color: rgba(242, 241, 252, 0.96);
  border-radius: 100%;
  cursor: pointer;
  position: fixed;
  width: 185px;
  height: 185px;
  left: -250px;
  top: -270px;
  transition: all 0.3s;
}
.menu-container.full-menu {
  border-radius: 0;
  padding: 0 !important;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: all 0.3s;
}

.full-menu .menu {
  top: 10px;
  left: 10px;
}

.menu {
  font-size: 1.5em;
  position: absolute;
  top: 280px;
  left: 260px;
  z-index: 100;
  transition: all 0.3s;
}

.band {
  @apply absolute bottom-0 left-0 text-sm text-gray-50 w-full z-50 p-3 bg-opacity-50 bg-gray-600 font-extralight;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    left: 20%;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
h1 {
  font-size: 5em;
  background-color: rgba(255, 0, 106, 0.4);
  border-radius: 100%;
  box-shadow: 0 0 2em 1em rgba(255, 0, 106, 0.4);
  color: white;
  margin: 30vh auto;
  position: relative;
  text-align: center;
  text-shadow: 0 8px 0 rgba(123, 0, 224, 0.4);
  transform: rotate(-12deg);
  width: 800px;
  height: auto;
  z-index: -1;
}
h1 span {
  color: #ffc901;
}
@media all and (max-width: 980px) {
  h1 {
    font-size: 3em;
    font-family: "Titan One", san-serif;
  }
}
@media all and (max-width: 480px) {
  h1 {
    font-size: 2em;
    font-family: "Titan One", san-serif;
  }
}
</style>
