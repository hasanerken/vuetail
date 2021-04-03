<template>
  <div class="m-1 sm:m-4 z-0">
    <div class="table-header h-12">
      <div class="col-span-2 sm:col-span-1 inline-flex items-center">SIRA</div>
      <div class="col-span-3 sm:col-span-2">RESİM</div>
      <div class="col-span-3 sm:col-span-3 text-left">KATEGORİ</div>
      <div class="hidden sm:block sm:col-span-4">TANITIM</div>
      <div class="col-span-2 sm:col-span-1 text-center">SİL</div>
      <div class="col-span-2 sm:col-span-1 text-center">GÖSTER</div>
    </div>
    <VueDraggableNext
      class="dragArea w-full z-0"
      handle=".handle"
      :list="categories"
      @change="log"
    >
      <transition-group>
        <div
          class="category-row"
          v-for="(category, index) in categories"
          :key="category.id"
          :class="category.isVisible ? 'text-gray-900' : 'text-gray-400'"
        >
          <div
            class="col-span-2 sm:col-span-1 handle inline-flex items-center justify-start cursor-pointer"
          >
            <div class="inline-flex items-center">
              <mdi-drag class="text-xl text-gray-300" />
              <span class="text-xs">
                {{ index + 1 }}
              </span>
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <img
              v-if="category.imageUrl"
              :src="category.imageUrl"
              alt=""
              class="h-10 sm:h-16"
            />
            <div v-else class="">
              <div
                class="w-12 hover:bg-indigo-200 transition duration-300 h-12 flex items-center justify-center rounded-full"
              >
                <mdi-cloud-upload
                  class="text-2xl text-indigo-600 cursor-pointer"
                  @click="selectRow(category)"
                />
              </div>
            </div>
          </div>

          <div
            class="col-span-3 sm:col-span-2 hover:text-indigo-600 cursor-pointer"
            @click="selectRow(category)"
          >
            {{ category.title }}
          </div>

          <div class="hidden sm:col-span-5 sm:line-clamp-2">
            {{ category.description }}
          </div>
          <div
            class="col-span-2 sm:col-span-1 inline-flex items-center justify-center cursor-pointer"
          >
            <div
              class="p-1 duration-300 transition hover:bg-gray-300 rounded-full m-2"
            >
              <mdi-delete
                class="text-3xl p-1 text-gray-500"
                @click="deleteCategory(category.id)"
              />
            </div>
          </div>
          <div
            class="col-span-2 sm:col-span-1 inline-flex items-center justify-center cursor-pointer"
          >
            <EyeOff
              v-model="category.isVisible"
              @update:modelValue="updateVisibility(category)"
            />
          </div>
        </div>
      </transition-group>
    </VueDraggableNext>
  </div>
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import {
  ref,
  onMounted,
  defineEmit,
  getCurrentInstance,
  watchEffect,
  watch
} from "vue";
import { db } from "../../directives/firebase";
import { useRoute } from "vue-router";

const route = useRoute();
const alias = route.params.alias;

const emit = defineEmit(["selectedRow"]);
const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal;

const enabled = ref(true);
const dragging = ref(false);
const txt = ref("");
const categories = ref([]);

function log(event) {
  categories.value.forEach((item, index) => {
    db.ref("menus")
      .child(alias + "/categories/" + item.id)
      .update({ sortNumber: index });
  });
}

function selectRow(category) {
  emit("selectedRow", category);
}

watchEffect(() => {
  console.log(alias);
  db.ref("menus")
    .child(alias + "/categories")
    .on("value", (snapshot) => {
      const data = snapshot.val();
      if(data) {
        console.log(data);
        const tempCategories = Object.values(data);
        categories.value = tempCategories.sort(
          (a, b) => a.sortNumber - b.sortNumber
        );
      } else {
        categories.value = []
      }
    });
});

function deleteCategory(categoryId) {
  swalAlert({
    title: "Kategoriyi silmek istediğinizden emin misiniz?",
    showDenyButton: true,
    confirmButtonText: `Evet, silelim.`,
    denyButtonText: `Hayır, kalsın.`
  }).then((result) => {
    if (result.isConfirmed) {
      db.ref("menus")
        .child(alias + "/categories/" + categoryId)
        .remove();
    }
  });
}

function updateVisibility(category) {
  db.ref("menus")
    .child(alias + "/categories/" + category.id)
    .update({ isVisible: category.isVisible });
}
</script>

<style lang="postcss" scoped>
.table-header {
  @apply grid grid-cols-12 w-full bg-indigo-600 text-gray-50 px-1 text-sm font-semibold items-center text-left rounded-t-md;
}

.category-row {
  @apply shadow-lg grid grid-cols-12 text-sm w-full bg-gray-50 border-b border-l border-r p-2 border-indigo-100 items-center;
}
</style>
