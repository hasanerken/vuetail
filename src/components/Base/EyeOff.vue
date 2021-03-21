<template>
  
   <div @click="toggle">
      <mdi-eye v-if="modelValue" class="text-2xl text-indigo-500 cursor-pointer"/>
      <mdi-eye-off class="transition duration-300 text-gray-300 text-2xl cursor-pointer" v-else />
   </div>
  
</template>

<script setup>
import { ref, defineEmit, defineProps } from "vue";
const emit = defineEmit("update:modelValue");
const props = defineProps({modelValue: Boolean})

const toggle = () => {  
   // BURADAN DATABASE UPDATE EDİLECEK, SONUCUNA GÖRE EMİT İŞLEMİ YAPILACAK!
  emit("update:modelValue", !props.modelValue);
};
</script>
