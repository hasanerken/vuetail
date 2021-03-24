<template>
  <div class="h-full bg-gray-50 py-2 shadow-xl">
    <div class="text-2xl font-bold py-4">
      <p>Ürün bilgilerinin girileceği ekran</p>
    </div>
    <div class="text-right mx-5">
    <BaseSelect v-model="selection"/>
    </div>
    <DraggableTable :category="selection" />
    <button @click="$refs.modalName.openModal()">Open modal</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const selection = ref('') 
function hideMenu(){
  console.log("...")
  //isOpen.value = false
}

</script>

<style lang="postcss" scoped></style>
