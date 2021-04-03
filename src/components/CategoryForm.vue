<template>
  <div class="flex flex-col justify-center space-y-2">
    <div>
      <BaseInput
        v-model="category.title"
        :label="'KATEGORİ ADI'"
        :hint="
          category.title.length > 30
            ? 'Kategori adını 30 karakterden daha az tutmaya çalışın'
            : ''
        "
      />
    </div>
    <div>
      <BaseInput
        class="w-full"
        v-model="category.description"
        :autogrow="true"
        :label="'AÇIKLAMALAR'"
      />
    </div>
    <EyeOff class="m-6" v-model="category.isVisible" />
    <div class="h-2"></div>
    <BaseImageLoader
      class="mb-10"
      @imageUploaded="updateImage"
      :existingImageUrl="category.imageUrl"
      @imageRemoved="category.imageUrl = ''"
    />
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
      @click="saveCategory"
    >
      Kaydet
    </button>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  defineProps,
  defineEmit,
  getCurrentInstance
} from "vue";
import { auth, db, storage } from "../directives/firebase";

const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal;
const items = ref(["Yiyecekler", "İçecekler", "Aperatifler", "Tatlılar"]);
const props = defineProps({ selectedCategory: Object, alias: String });
const emit = defineEmit(["close"]);

const category = reactive({
  title: props.selectedCategory?.title || "",
  description: props.selectedCategory?.description || "",
  id: props.selectedCategory?.id || "",
  imageUrl: props.selectedCategory?.imageUrl || "",
  isVisible: props.selectedCategory?.isVisible || true,
  sortNumber: props.selectedCategory?.sortNumber || -1,
  userId: props.selectedCategory?.userId || 'user3'
});

const text = ref("");
const selection = ref("");
const categoryFormModal = ref(null);

let file;
async function updateImage(url) {
  file = await fetch(url)
    .then((r) => r.blob())
    .then(
      (blobFile) => new File([blobFile], props.alias, { type: "image/webp" })
    );
}

function saveCategory() {
  const categoryId = Date.now().toString();
  let categoryRef = "";
  if (typeof props.selectedCategory === "string") {
    categoryRef = db
      .ref("menus")
      .child(props.alias + "/categories/" + categoryId);
    category.id = categoryId;
  } else {
    categoryRef = db
      .ref("menus")
      .child(props.alias + "/categories/" + props.selectedCategory?.id);
  }

  if (category.title === "") {
    swalAlert("Lütfen, kategori adını giriniz.");
  } else {
    categoryRef.set(category);
  }

  if (file) {
    storage
      .ref("categories/" + category.title + ".webp")
      .put(file)
      .then((fileData) => {
        return fileData.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        return categoryRef.update({ imageUrl: imageUrl });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  emit("close");
}

function closeCategoryForm() {
  root.categoryFormModal.closeModal();
}
</script>

<style lang="postcss" scoped></style>
