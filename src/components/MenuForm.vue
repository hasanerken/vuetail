<template>
  <div class="">
    {{ selectedMenu }}
    <BaseSelect
      :items="['Ankara', 'İstanbul', 'İzmir', 'Bursa']"
      :currentSelection="menu.city"
      title="İL"
      class="mb-3 m-1"
      v-model="menu.city"
    />
    <BaseInput v-model="menu.title" :label="'ŞİRKET ADI'" :class="typeof selectedMenu === 'object' ? '' : '' " />
    <BaseInput v-model="menu.phone" :label="'TELEFON'" />
    <BaseInput v-model="menu.address" :label="'ADRES'" :autogrow="true" />
    <BaseImageLoader
      class="mb-10"
      @imageUploaded="updateImage"
      :existingImageUrl="menu.imageUrl"
      @imageRemoved="menu.imageUrl = ''"
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
      @click="saveMenu"
    >
      Kaydet
    </button>
  </div>
</template>

<script setup>
import {
  reactive,
  computed,
  defineEmit,
  defineProps,
  getCurrentInstance
} from "vue";
import { db, storage } from "../directives/firebase";

const props = defineProps({ selectedMenu: Object });
const emit = defineEmit(["close"]);
const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal

const menu = reactive({
  city: props.selectedMenu?.general.city || "",
  title: props.selectedMenu?.general.title || "",
  alias: props.selectedMenu?.general.alias || "",
  phone: props.selectedMenu?.general.phone || "",
  address: props.selectedMenu?.general.address || "",
  imageUrl: props.selectedMenu?.general.imageUrl || "",
  isActive: props.selectedMenu?.general.isActive || true,
  userId: props.selectedMenu?.userId || 'user3'
});


// TODO: databaseden gelmezse üretilecek, değiştirilirse üretilecek!
const alias = computed(() => {
  let computedAlias = "";

  computedAlias = menu.title
    .replace(/\s+/g, "-")
    .replace(/[&/\\#,+@()^$½§$~%.'":*?<>{}]/g, "")
    .replace(/Ğ/gim, "G")
    .replace(/Ü/gim, "U")
    .replace(/Ş/gim, "S")
    .replace(/İ/gim, "I")
    .replace(/Ö/gim, "O")
    .replace(/Ç/gim, "C")
    .replace(/ğ/gim, "g")
    .replace(/ü/gim, "u")
    .replace(/ş/gim, "s")
    .replace(/ı/gim, "i")
    .replace(/ö/gim, "o")
    .replace(/ç/gim, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return computedAlias;
});

let file;
async function updateImage(url) {
  file = await fetch(url)
    .then((r) => r.blob())
    .then(
      (blobFile) => new File([blobFile], alias.value, { type: "image/webp" })
    );
}

async function saveMenu() {
  let menuRef = "";
  let userRef = "";
  
   
  if (menu.alias === "") {
    menu.alias = alias.value;
    menuRef = db.ref('menus').child(alias.value + "/general");
    db.ref('users').child('user3').push().set(alias.value);
  } else {
    menuRef = db.ref('menus').child(menu.alias + "/general");
  }

  if (
    menu.title === "" ||
    menu.phone === "" ||
    menu.address === "" ||
    menu.city === ""
  ) {
    swalAlert(
      "Lütfen, menünün ait olduğu işletme bilgilerini eksiksiz giriniz."
    );
  } else {
    menuRef.set(menu);
    
  }

  if (file) {
    storage
      .ref("logos/" + alias.value + ".webp")
      .put(file)
      .then((fileData) => {
        return fileData.ref.getDownloadURL();
      })
      .then((imageUrl) => {
        console.log("..", imageUrl);
        return menuRef.update({ imageUrl: imageUrl });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  emit("close");
}
</script>

<style lang="postcss" scoped>
</style>
