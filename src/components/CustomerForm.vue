<template>
  <div class="">
    
    <BaseInput v-model="customer.title" :label="'ŞİRKET ADI'" />
    <BaseInput v-model="customer.phone" :label="'TELEFON'" />
    <BaseInput v-model="customer.title" :label="'ADRES'" :autogrow="true" />
    <BaseSelect />
    
   
  </div>
      <div class="w-full flex flex-col sm:flex-row">
    <button
      class="w-full text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
      @click="$emit('close')"
    >
      İptal
    </button>
    <button
      class="w-full bg-indigo-600 text-indigo-50 hover:text-white hover:bg-indigo-400 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
      @click="$emit('close')"
    >
      Kaydet
    </button>
      </div>
</template>

<script setup>
import { reactive , computed, defineEmit, defineProps } from 'vue';
const customer = reactive({
  title: "",
  phone: null,
  address: null
})

const props =defineProps({customerKey: String})

defineEmit(['close'])

// TODO: databaseden gelmezse üretilecek, değiştirilirse üretilecek!
const customerUrl = computed(() => {
  return "demlik-cafe"
})

</script>

<style lang="postcss" scoped></style>
