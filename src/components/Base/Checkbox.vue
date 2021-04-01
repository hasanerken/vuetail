<template>
  <div class="inline-flex justify-between items-center" @click="toggle">

    <div
      class="w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out"
      :class="status ? 'bg-indigo-900' : 'bg-gray-300' "
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
const emit = defineEmit(["update:modelValue"]);
const props = defineProps({modelValue: Boolean})
const status = ref(props.modelValue);

const toggle = () => {
  status.value = !status.value;
  emit("update:modelValue", status.value);
};
</script>
