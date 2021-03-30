<template>
  <div @click="toggle" class="flex items-center">
    {{ showImageOnly }}
    <div class="">
      <mdi-eye
        v-if="modelValue"
        class="text-2xl text-indigo-500 cursor-pointer"
      />
      <mdi-eye-off
        class="transition duration-300 text-gray-300 text-2xl cursor-pointer"
        v-else
      />
    </div>
    <div v-if="!imageOnly" :class="modelValue ? 'text-indigo-700' : 'text-gray-400 line-through' " class="text-sm  p-2 text-center ">Menüde Gözüksün</div>
  </div>
</template>

<script setup>
import { ref, defineEmit, defineProps } from "vue";
const emit = defineEmit(["update:modelValue"]);
const props = defineProps({ modelValue: Boolean, imageOnly: Boolean });

const toggle = () => {
  // BURADAN DATABASE UPDATE EDİLECEK, SONUCUNA GÖRE EMİT İŞLEMİ YAPILACAK!
  emit("update:modelValue", !props.modelValue);
};
</script>
