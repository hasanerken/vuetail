<template>
  <div class="h-full bg-gray-50 py-2 shadow-xl">
    <div class="text-left sm:text-left mx-5">
      <BaseSelect v-model="selection" />
    </div>
    <DraggableTable :category="selection" @selectedRow="openProductForm" />
  </div>
  <div>
    <Modal ref="productFormModal">
      <template v-slot:header>
        <h1 class="text-sm sm:text-lg">ÜRÜN BİLGİLERİ</h1>
      </template>

      <template v-slot:body>    
        <ProductForm :productKey="productKey" />
      </template>

      <template v-slot:footer>
        <div class="w-full flex flex-col sm:flex-row">
          <button
            class="w-full text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.productFormModal.closeModal()"
          >
            İptal
          </button>
          <button
            class="w-full bg-indigo-600 text-indigo-50 hover:text-white hover:bg-indigo-400 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.productFormModal.closeModal()"
          >
            Kaydet
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const productFormModal = ref(null);
const productKey = ref("");
const selection = ref("");
function hideMenu() {
  console.log("...");
  //isOpen.value = false
}
function openProductForm(key) {
  console.log("md", key);
  productKey.value = key
  productFormModal.value.openModal();
}
</script>

<style lang="postcss" scoped></style>
