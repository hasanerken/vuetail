<template>
  <div class="flex flex-row justify-center">
    <BaseButton @click="openCategoryForm">
      <span class="font-semibold">Yeni Kategori Ekle</span>
    </BaseButton>
  </div>
  <CategoryTable @selectedRow="openCategoryForm" />
  <!-- CATEGORY FORM MODAL  -->
  <Modal ref="categoryFormModal" :title="'KATEGORİ BİLGİLERİ'">
    <CategoryForm :categoryKey="catogeryKey" @close="closeCategoryForm" />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
const categoryFormModal = ref(null);
const categoryKey = ref("");
const selection = ref("");
function closeCategoryForm() {
  console.log("...");
  categoryFormModal.value.closeModal();
  //isOpen.value = false
}
function openCategoryForm(key) {
  console.log("md", key);
  categoryKey.value = key;
  categoryFormModal.value.openModal();
}

</script>

<style lang="postcss" scoped></style>
