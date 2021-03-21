<template>
  <div class="inline-flex justify-between items-center" @click="toggle">
    <div class="mx-4">
      <mdi-eye v-if="status" class="text-2xl text-indigo-500"/>
      <mdi-eye-off class="text-gray-300 text-2xl" v-else />
    </div>
    <div
      class="w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 duration-300 ease-in-out"
      :class="{'bg-indigo-500' : status}"
    >
      <div
        class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out inline-flex items-center justify-center"
        :class="{ 'translate-x-6': status }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmit, defineProps } from "vue";
const emit = defineEmit("update:modelValue");

const status = ref(false);

const toggle = () => {
  status.value = !status.value;
  emit("update:modelValue", status.value);
};
</script>
