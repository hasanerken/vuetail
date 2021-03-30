<template>
  <div
    v-clickoutside="hideMenu"
    class="inline-flex flex-col w-11/12 relative cursor-pointer"
  >
    <div
      class="flex flex-row p-3 justify-between text-gray-900 border border-gray-200 hover:border-indigo-200 items-center"
      @click="isOpen = !isOpen"
      :class="isOpen ? 'rounded-t-md' : 'rounded-md'"
    >
      <div class="flex flex-row items-center text-sm">
        {{ selectedItem }}

        <mdi-close
          class="absolute right-8 text-gray-300 hover:text-indigo-800 hover:bg-gray-200 hover:rounded-full text-2xl p-1"
          @click="cleanSelection"
        />
      </div>
      <div :class="isOpen ? 'rotate down' : 'rotate' ">
        <mdi-chevron-down
          class="ml-3 rotate "
          :class="isOpen ? 'text-indigo-600 down' : 'text-indigo-300'"
        ></mdi-chevron-down>
        
      </div>
    </div>
    <div
      v-if="isOpen"
      class="hide transition rounded-b-md absolute duration-300 shadow-xl ease-in-out w-full text-center z-100 border-l border-r border-b border-indigo-200 z-40 bg-gray-50 top-10"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="hover:bg-indigo-100 last:rounded-b-md"
      >
        <div
          class="p-2 text-sm border-b first:border-t border-indigo-50 text-gray-900"
          @click="setSelectedItem(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { ref, defineEmit, defineProps } from "vue";
const emit = defineEmit(["update:modelValue"]);
const props = defineProps({items: Array, title: String})
const isOpen = ref(false);
const selectedItem = ref(props.title);

function setSelectedItem(item) {
  selectedItem.value = item;
  isOpen.value = !isOpen.value;
  emit("update:modelValue", item);
}
function cleanSelection() {
  selectedItem.value = props.title;
  isOpen.value = true;
  emit("update:modelValue", "");
}
function hideMenu() {
  isOpen.value = false;
}
</script>

<style lang="postcss" scoped>
.rotate{
    -moz-transition: all 2s linear;
    -webkit-transition: all 2s linear;
    transition: all 500ms ease-in-out;
}

.rotate.down{
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg) translateX(-10px);
    
}
</style>
