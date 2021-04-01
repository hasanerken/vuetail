<template>
  <div>
    <div class="flex flex-row justify-center">
      <BaseSelect
        v-model="product.category"
        :label="'KATEGORİ'"
        class="mb-5"
        :items="items"
        title="KATEGORİLER"
        :currentSelection="product.category"
      />
    </div>
    <BaseInput
      v-model="product.title"
      :label="'ÜRÜN ADI'"
      :hint="
        product.title.length > 30
          ? 'Ürün adını 30 karakterden daha az tutmaya çalışın'
          : ''
      "
    />
    <div class="flex flex-row items-center justify-center">
      <BaseInput v-model="product.price" :label="'FİYAT'" class="w-full" />
      <EyeOff class="mx-10" v-model="product.isVisible" />
    </div>
    <BaseInput v-model="product.contents" :autogrow="true" :label="'İÇERİK'" />
    <BaseInput v-model="product.options" :autogrow="true" :label="'SEÇENEK'" />
    <BaseInput
      v-model="product.description"
      :autogrow="true"
      :label="'AÇIKLAMALAR'"
    />
    <BaseImageLoader
      class="mb-10"
      @imageUploaded="updateImage"
      :existingImageUrl="product.imageUrl"
      @imageRemoved="product.imageUrl = ''"
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
      @click="saveProduct"
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
  onMounted,
  getCurrentInstance
} from "vue";
import { db, storage, auth } from "../directives/firebase";
import { useRoute } from "vue-router";

const route = useRoute();
const alias = ref(route.params.alias);

const items = ref([]);
const props = defineProps({ selectedProduct: Object || String });
const userId = "user3";

const product = reactive({
  title: props.selectedProduct.title || "",
  category: props.selectedProduct.category || "",
  description: props.selectedProduct.description || "",
  contents: props.selectedProduct.contents || "",
  options: props.selectedProduct.options || "",
  description: props.selectedProduct.description ||  "",
  price: props.selectedProduct.price || null,
  id: props.selectedProduct.id || "",
  isVisible: props.selectedProduct.isVisible || true,
  imageUrl: props.selectedProduct.imageUrl ||  "",
  sortNumber: props.selectedProduct.sortNumber ||  -1
});

const emit = defineEmit(["close"]);

const text = ref("");
const selection = ref("");
const productFormModal = ref(null);
const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal;

onMounted(() => {
  db.ref(userId)
    .child(alias.value + "/categories")
    .once("value")
    .then((snapshot) => {
      items.value = Object.values(snapshot.val()).map((item) => item.title);
    });
});

function closeProductForm() {
  root.productFormModal.closeModal();
  //isOpen.value = false
}

let file;
async function updateImage(url) {
  file = await fetch(url)
    .then((r) => r.blob())
    .then(
      (blobFile) => new File([blobFile], props.alias, { type: "image/webp" })
    );
}

function saveProduct() {
  const productId = Date.now().toString();
  let productRef = "";
  if (typeof props.selectedProduct === "string") {
    productRef = db.ref("user3").child(alias.value + "/products/" + productId);
    product.id = productId;
  } else {
    productRef = db
      .ref("user3")
      .child(alias.value + "/products/" + props.selectedProduct?.id);
  }

  if (
    product.title === "" ||
    product.price === null ||
    product.category === ""
  ) {
    swalAlert("Lütfen, ürün adını, kategorisini ve fiyatını giriniz.");
  } else {
    productRef.set(product);
  }

  if (file) {
    storage
      .ref("products/" + product.title + ".webp")
      .put(file)
      .then((fileData) => {
        return fileData.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        return productRef.update({ imageUrl: imageUrl });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  emit("close");
}
</script>

<style lang="postcss" scoped></style>
