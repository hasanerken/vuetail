<template>
  <div>
    <BaseCard
      v-if="type === 1 || type === 2 || type === 3"
      :product="product"
      :type="type"
    />
    <BaseItem
      v-else-if="type === 4 || type === 5 || type === 6 || type === 7"
      :product="product"
      :type="type"
    />
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";

const type = ref(0);

const { product } = defineProps({ product: Object });

switch (true) {
  case product.imageUrl !== "" &&
    product.description !== "" &&
    product.price > 0:
    type.value = 1;
    break;
  case product.imageUrl !== "" &&
    product.description !== "" &&
    product.price === 0:
    type.value = 2;
    break;
  case product.imageUrl !== "" &&
    product.description === "" &&
    product.price === 0:
    type.value = 3;
    break;
  case product.imageUrl === "" &&
    product.description !== "" &&
    product.price > 0:
    type.value = 4;
    break;
  case (product.imageUrl !== "" &&
    product.description !== "" &&
    product.price === 0) ||
    product.notes !== "" ||
    product.explanation !== "":
    type.value = 5;
    break;
  case product.imageUrl === "" &&
    product.description === "" &&
    product.price > 0:
    type.value = 6;
    break;
  default:
    type.value = 7;
    break;
}
</script>

<style lang="scss" scoped></style>
