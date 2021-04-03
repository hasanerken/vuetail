<template>
  <div class="h-full py-2 shadow-xl">
    <div class="flex flex-col sm:flex-row text-left sm:text-left my-5 mx-4 justify-between items-center">
     
      <div class="sm:w-1/2 flex justify-center items-center mb-2 sm:mb-0">
        <BaseButton @click="openProductForm">
          <span class="font-semibold text-center text-xs sm:text-md p-1">YENİ ÜRÜN</span>
        </BaseButton>
        <BaseButton @click="getAllProducts">
          <span class="font-semibold text-center text-xs sm:text-md p-1">TÜM ÜRÜNLER</span>
        </BaseButton>
      
      </div>
       <BaseSelect
        class="w-7/12 sm:w-3/12"
        v-model="selection"
        :currentSelection="selection"
        :items="items"
        title="KATEGORİLER" 
      />
    </div>

    <ProductTable :category="selection" @selectedRow="openProductForm"   />
  </div>
  <div>
    <Modal ref="productFormModal" :title="'ÜRÜN BİLGİLERİ'">
      <ProductForm :selectedProduct="selectedProduct" @close="closeProductForm" />
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { db } from "../directives/firebase";
import { useRoute } from "vue-router";

const productFormModal = ref(null);
const selection = ref("");
const selectedProduct = ref({})
const items = ref([]);
const userId = "user3";
const route = useRoute();
const alias = ref(route.params.alias);

onMounted(() => {
  db.ref('menus')
    .child(alias.value + "/categories")
    .once("value")
    .then((snapshot) => {
      
      items.value = Object.values(snapshot.val()).map((item) => {
         return {
          id: item.id, title: item.title
        }
      });
      console.log(items.value)
      selection.value = items.value[0]
    });
});

function getAllProducts() {
  selection.value = "Tümü"
}

function closeProductForm() {
  console.log("...");
  productFormModal.value.closeModal();
  //isOpen.value = false
}
function openProductForm(product) {
  
   if(typeof product.title === 'string' ) {
    selectedProduct.value = product;
  } else {
    selectedProduct.value = 'new'
  }
  productFormModal.value.openModal();
}

</script>

<style lang="postcss" scoped></style>
