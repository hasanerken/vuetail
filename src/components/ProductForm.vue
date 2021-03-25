<template>
  <div>
    <div class="flex flex-row justify-center">
      <BaseSelect v-model="product.category" :label="'KATEGORİ'" class="mb-5" />
    </div>
    <BaseInput
      v-model="product.title"
      :label="'ÜRÜN ADI'"
      :hint="
        product.title.length > 30
          ? 'Ürün adını 30 karakterden daha az tutmaya çalışın'
          : ''
      "
    />
    <div class="flex flex-row items-center justify-center">
      <BaseInput v-model="product.price" :label="'FİYAT'" class="w-full" />
      <EyeOff class="mx-10" v-model="product.isVisible" />
    </div>
    <BaseInput v-model="product.contents" :autogrow="true" :label="'İÇERİK'" />
    <BaseInput v-model="product.options" :autogrow="true" :label="'SEÇENEK'" />
    <BaseInput v-model="product.description" :autogrow="true" :label="'AÇIKLAMALAR'" />
    <BaseImageLoader />
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from "vue";


const props = defineProps({ productKey: String });
const product = reactive({
  title: "",
  category: "",
  description: "",
  contents: "",
  options: "",
  description: "",
  price: null,
  id: "",
  isVisible: true,
  sortNumber: 0
});

const text = ref("");
const selection = ref("");
function hideMenu() {
  console.log("...");
  //isOpen.value = false
}
</script>

<style lang="postcss" scoped></style>
