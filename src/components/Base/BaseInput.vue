<template>
  <div
    class="text-left text-gray-500 max-w-sm mx-auto rounded-lg overflow-hidden py-3 px-4 m-2"
  >
    <div class="grid grid-cols-12 items-center">
      <div v-if="hasIcon" class="col-span-2">
        <div class="pb-2">
          <slot></slot>
        </div>
      </div>
      <div :class="hasIcon ? 'col-span-10' : 'col-span-12'">
        <div class="relative border-b focus-within:border-indigo-500" @keydown.enter.prevent>
          <span
            v-if="autogrow"
            role="text-box"
            contenteditable
            type="text"
            name="baseInput"
            @click="addText"
            @blur="onEdit"
            class="text block w-full appearance-none focus:outline-none bg-transparent text-gray-800"
          >
          {{ modelValue }}
          </span>
          <input
            v-else
            v-model="inputValue"
            type="text"
            name="baseInput"
            placeholder=" "
            class="block w-full appearance-none focus:outline-none bg-transparent text-gray-800"
          />

          <label
            :class="
              modelValue
                ? 'text-indigo-500 font-semibold text-xss'
                : 'text-gray-500 text-xs'
            "
            for="baseInput"
            class="absolute -top-3 -z-1 duration-300 origin-0"
            >{{ label }}</label
          >
        </div>
        <div
          :class="
            hint ? 'opacity-100 translate-y-1' : 'opacity-0 -translate-y-1'
          "
          class="text-xss text-pink-500 transition transform duration-400"
        >
          {{ hint }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  watchEffect,
  computed,
  useContext,
  defineEmit
} from "vue";

const { slots } = useContext();
const props = defineProps({
  modelValue: String,
  label: String,
  hint: String,
  autogrow: Boolean
});

const inputValue = ref(props.modelValue);
const emit = defineEmit(["update:modelValue"]);

watchEffect(() => {
  emit("update:modelValue", inputValue.value);
});

const hasIcon = computed(() => {
  return !!slots.default;
});

function onEdit(evt) {
  console.log(evt.target.innerHTML);
  inputValue.value = evt.target.innerHTML;
}
</script>

<style lang="postcss" scoped></style>
