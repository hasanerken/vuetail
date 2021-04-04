<template>
  <div id="top" class="relative">
    <div class="fixed z-10 bg-white w-screen py-6 font-extrabold text-2xl">
      <Navigation :categories="categories" class="fixed z-50" />
      <div class="text-center">{{ title }}</div>
      <div class="">
        <img :src="logoUrl" alt="" class="h-12 absolute top-2 right-2" />
      </div>
    </div>
    <div class="h-24"></div>
    <div class="flex flex-row flex-wrap justify-center items-stretch">
      <div
        v-for="product in products"
        :key="product.id"
        class="rounded-lg flex flex-row flex-wrap justify-center"
      >
        <FullCard
          v-if="product?.description || product?.options || product?.contents"
          :product="product"
          @bookmarkAdded="addItem"
          @bookmarkRemoved="removeItem"
          class="m-3"
        />
        <ImageCard
          v-if="
            !product?.description &&
            !product?.options &&
            !product?.contents &&
            product?.imageUrl
          "
          :product="product"
          @bookmarkAdded="addItem"
          @bookmarkRemoved="removeItem"
          class="m-3"
        />

        <LineCard
          v-if="
            !product?.description &&
            !product?.options &&
            !product?.contents &&
            !product?.imageUrl
          "
          :product="product"
          @bookmarkAdded="addItem"
          @bookmarkRemoved="removeItem"
          class="m-1"
        />
      </div>
    </div>
    <div
      @click="openBookmarkedProducts"
      class="fixed bg-gray-800 transition-opacity ease-in-out duration-1000 bg-opacity-40 hover:bg-opacity-80 rounded-full h-16 w-16 bottom-6 right-4 flex items-center justify-center"
    >
      <mdi-bookmark
        v-if="hasBookmarked"
        class="text-gray-50 text-3xl transition-opacity duration-300"
      />
      <mdi-bookmark-outline
        v-else
        class="text-gray-50 text-3xl transition-opacity duration-300"
      />
    </div>
  </div>
  <div class="h-24"></div>

  <Modal ref="bookmarkedProductsModal" title="" class="px-3 py-32">
    <div v-if="hasBookmarked">
     
      <div
        class="text-xl text-red-800 font-extrabold text-center p-2 border-b-2 m-2 border-red-800"
      >
      <div class="flex flex-row items-center justify-center">
       <mdi-bookmark-multiple class="absolute left-5 text-3xl" />
        SEÇTİĞİNİZ ÜRÜNLER
        </div>
      </div>
      <div v-for="product in bookmarkedProducts" :key="product.id">
        <div class="text-xl flex flex-row items-center m-3">
          <div class="h-2 w-2 m-2 bg-red-800"></div>
          {{ product.title }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-lg text-center font-bold">
        <div class="p-4">
        Seçtiğiniz ürün bulunmamaktadır.
        </div>
        <img src="/empty.svg" alt="">
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, watchEffect, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { db } from "../directives/firebase";

const route = useRoute();
const alias = route.params.alias;
const categoryId = ref(route.params.categoryId);
const products = ref([]);
const title = ref("");
const logoUrl = ref("");
const categories = ref([]);
const bookmarkedProducts = ref({});
const bookmarkedProductsModal = ref(null);
const hasBookmarked = ref(false);

onMounted(() => {
  scrollToId("top");

  db.ref("menus")
    .child(alias)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        const tempCategories = Object.values(data.categories);
        console.log("ss", tempCategories);
        categories.value = tempCategories.sort(
          (a, b) => a.sortNumber - b.sortNumber
        );
        title.value = data.general.title;
        logoUrl.value = data.general.imageUrl;
      } else {
        categories.value = [];
      }
    });
});

watchEffect(() => {
  db.ref("menus")
    .child(alias + "/products/")
    .orderByChild("category/id")
    .equalTo(route.params.categoryId)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);

        const tempProducts = Object.values(data).filter(item => item.isVisible === true);
        products.value = tempProducts.sort(
          (a, b) => a.sortNumber - b.sortNumber
        );
      } else {
        products.value = [];
      }
    });

  hasBookmarked.value = Object.keys(bookmarkedProducts.value).length > 0;
});

function addItem(payload) {
  bookmarkedProducts.value[payload.id] = payload;
}

function removeItem(payload) {
  delete bookmarkedProducts.value[payload.id];
}

function openBookmarkedProducts() {
  bookmarkedProductsModal.value.openModal();
}

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}
</script>

<style lang="postcss" scoped></style>
