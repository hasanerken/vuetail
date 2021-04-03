<template>
  <div class="flex flex-row justify-center">
    <BaseButton @click="openCategoryForm">
      <span class="font-semibold">YENİ KATEGORİ</span>
    </BaseButton>
  </div>
  <CategoryTable @selectedRow="openCategoryForm" />
  <!-- CATEGORY FORM MODAL  -->
  <Modal ref="categoryFormModal" :title="'KATEGORİ BİLGİLERİ'">
    <CategoryForm
      :selectedCategory="selectedCategory"
      :alias="alias"
      @close="closeCategoryForm"
    />
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";


const categories = ref({});
const selectedCategory = ref({});
const route = useRoute();
const alias = ref(route.params.alias);

// MODAL MANAGEMENT
const categoryFormModal = ref(null);
function closeCategoryForm() {
  categoryFormModal.value.closeModal();
}

function openCategoryForm(category) {
  if (typeof category.title === "string") {
    selectedCategory.value = category;
  } else {
    selectedCategory.value = "new";
  }
  categoryFormModal.value.openModal();
}
</script>

<style lang="postcss" scoped></style>
