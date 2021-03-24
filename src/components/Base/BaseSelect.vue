<template>
  <div
    v-clickoutside="hideMenu"
    class="inline-flex flex-col relative cursor-pointer"
  >
    <div
      class="flex flex-row p-2 justify-between w-48 text-indigo-900 border border-indigo-200 items-center shadow-md"
      @click="isOpen = !isOpen"
      :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
    >
      <div class="flex flex-row items-center">
        {{ selectedItem }}

        <mdi-close
          class="absolute right-8 text-gray-300 hover:text-indigo-800 hover:bg-gray-200 hover:rounded-full text-2xl p-1"
          @click="cleanSelection"
        />
      </div>
      <div class="">
        <mdi-chevron-down
          class="ml-3"
          :class="isOpen ? 'text-indigo-600' : 'text-indigo-300'"
        ></mdi-chevron-down>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="hide transition rounded-b-md absolute duration-300 shadow-xl ease-in-out w-48 text-center z-100 border-l border-r border-b border-indigo-200 z-40 bg-gray-50 top-10"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="hover:bg-indigo-100 last:rounded-b-md"
      >
        <div
          class="p-2 border-b first:border-t border-indigo-50 text-indigo-900"
          @click="setSelectedItem(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmit } from "vue";
const emit = defineEmit("update:modelValue");
const isOpen = ref(false);
const selectedItem = ref("Kategoriler");
const items = ref(["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"]);
function setSelectedItem(item) {
  selectedItem.value = item;
  isOpen.value = !isOpen.value;
  emit("update:modelValue", item);
}
function cleanSelection() {
  selectedItem.value = "Kategoriler";
  isOpen.value = true;
  emit("update:modelValue", "");
}
function hideMenu() {
  isOpen.value = false;
}
</script>

<style lang="postcss" scoped></style>
