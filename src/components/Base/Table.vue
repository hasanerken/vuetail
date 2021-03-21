<template>
  <div class="">
    <table class="shadow-lg bg-white">
      <tr>
        <th
          v-for="(item, index) in columns"
          :key="index"
          class="bg-indigo-200 border text-left px-8 py-4"
        >
          {{ item }}
        </th>
      </tr>
      <tr v-for="(row, i) in rows" :key="i">
        <td v-for="(item, key) in row" :key="key" class="p-2  text-center border-b border-indigo-100">
            {{ item }}
        </td>
        <td class="p-2 text-center border-b border-indigo-100">
           <Checkbox />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
const columns = ref(["Company", "Contact", "Country", "Gizle"]);

const rows = ref([
  {
    company: "AF",
    contact: "MMM",
    country: "mem"
  },
  {
    company: "AF",
    contact: "MMM",
    country: "mem"
  }
]);
</script>

<style lang="scss" scoped></style>
