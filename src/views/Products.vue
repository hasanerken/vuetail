<template>
  <div class="h-full bg-gray-50 py-2 shadow-xl">
    <div class="text-left sm:text-left mx-5">
      <BaseSelect v-model="selection" :items="items" />  
    </div>
    <ProductTable :category="selection" @selectedRow="openProductForm" />
  </div>
  <div>
    <Modal ref="productFormModal" :title="'ÜRÜN BİLGİLERİ'">
      <ProductForm :productKey="productKey" @close="closeProductForm" />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const productFormModal = ref(null);
const productKey = ref("");
const selection = ref("");
const items = ref(["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"]);
function closeProductForm() {
  console.log("...");
  productFormModal.value.closeModal();
  //isOpen.value = false
}
function openProductForm(key) {
  console.log("md", key);
  productKey.value = key;
  productFormModal.value.openModal();
}
</script>

<style lang="postcss" scoped></style>
