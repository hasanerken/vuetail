<template>
  <div id="top" class="p-4 relative">
    <div class="flex items-start justify-center font-extrabold text-2xl">
     <div class="ml-10 mr-10 text-center">{{ title }}</div>
     <div class="">
       <img :src="logoUrl" alt="" class="h-12 absolute top-2 right-2">
     </div>
     
     
    </div>
    <div class="flex flex-row flex-wrap justify-center items-stretch mt-6">
      <div v-for="category in categories" :key="category.id" class="flex items-stretch">
       
       <router-link :to="'/' + alias + '/' + category.id">
        <div
          class="cursor-pointer bg-white m-2 w-72 sm:w-96 shadow-lg  hover:shadow-2xl transition transform hover:scale-105 duration-300 rounded-sm"
        >
          <img :src="category.imageUrl" alt="" class="rounded-t-sm" />
          <div class="p-4">
            <div
              class="text-xl leading-tight tracking-wide uppercase font-bold"
            >
              {{ category.title }}
            </div>
            <div class="py-2">
              {{ category.description }}
            </div>
          </div>
        </div>
        </router-link>
      </div>
      <Navigation :categories="categories" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { db } from "../directives/firebase";
import { useRoute } from "vue-router";

const route = useRoute();
const alias = ref(route.params.alias);
const title = ref('')
const logoUrl = ref('')
const categories = ref([]);

onMounted(() => {
  scrollToId('top');

  db.ref("menus")
    .child(alias.value)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        const tempCategories = Object.values(data.categories);
        console.log("ss", tempCategories);
        categories.value = tempCategories.sort(
          (a, b) => a.sortNumber - b.sortNumber
        );
        title.value = data.general.title
        logoUrl.value = data.general.imageUrl
      } else {
        categories.value = [];
      }
    });
});

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

</script>
