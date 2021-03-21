<template>
  <div class="h-24 bg-pink-100">
    <div class="text-2xl font-bold">
      <p>Şirket bilgilerinin girileceği ekran</p>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { ref } from "vue";
const isContractAgreed = ref(false);
const isContractAgreed2 = ref(false);
const myArray = ref([
  { name: "John", id: 1 },
  { name: "Joao", id: 2 },
  { name: "Jean", id: 3 },
  { name: "Gerard", id: 4 }
]);
</script>

<style lang="postcss" scoped></style>
