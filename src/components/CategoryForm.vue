<template>
  <div class="flex flex-col justify-center space-y-2">
    <div>
      <BaseInput
        v-model="category.title"
        :label="'KATEGORİ ADI'"
        :hint="
          category.title.length > 30
            ? 'Kategori adını 30 karakterden daha az tutmaya çalışın'
            : ''
        "
      />
    </div>
    <div>
      <BaseInput
        class="w-full"
        v-model="category.description"
        :autogrow="true"
        :label="'AÇIKLAMALAR'"
      />
    </div>
    <EyeOff class="m-6" v-model="category.isVisible" />
    <div class="h-2"></div>
    <BaseImageLoader />
  </div>

  <div class="w-full flex flex-col sm:flex-row">
    <button
      class="w-full text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
      @click="$emit('close')"
    >
      İptal
    </button>
    <button
      class="w-full bg-indigo-600 text-indigo-50 hover:text-white hover:bg-indigo-400 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
      @click="$emit('close')"
    >
      Kaydet
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmit } from "vue";

const items = ref(["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"]);
const props = defineProps({ categoryKey: String });

const category = reactive({
  title: "",
  description: "",
  id: "",
  isVisible: true,
  sortNumber: 0
});

defineEmit(["close"]);

const text = ref("");
const selection = ref("");
const categoryFormModal = ref(null);

function closeCategoryForm() {
  console.log("...");
  root.categoryFormModal.closeModal();

  //isOpen.value = false
}
</script>

<style lang="postcss" scoped></style>
