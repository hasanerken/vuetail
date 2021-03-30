<template>
  <div class="h-full bg-white py-2 shadow-xl">
    <div class="flex flex-row justify-center">
      <BaseButton @click="openMenuForm">
        <span class="font-semibold">Yeni İşletme Ekle</span>
      </BaseButton>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-stretch">
      <div v-for="(menu, key) in menus" :key="key">
        <div class="max-w-2xl flex-1 items-stretch">
          <div
            class="bg-gray-100 m-2 rounded-md border-purple-100 border shadow-xl"
          >
            <div class="">
              <div
                class="flex flex-row justify-between items-center bg-indigo-500 rounded-t-md"
              >
                <h1 class="text-xl font-semibold pl-4 text-gray-50 text-center">
                  {{ menu.general.title }}
                </h1>
                <div class="flex flex-row">
                  <div class="p-1 hover:bg-indigo-400 rounded-full m-2">
                    <mdi-delete
                      class="text-3xl p-1 text-gray-200"
                      @click="openMenuForm"
                    />
                  </div>
                  <div class="p-1 hover:bg-indigo-400 rounded-full m-2">
                    <mdi-edit
                      class="text-3xl p-1 text-gray-200"
                      @click="openMenuForm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row">
              <div class="">
                <div class="hidden sm:block">
                  <div class="flex flex-row">
                    <div>
                      <div
                        class="flex flex-col items-start text-md justify-start font-extralight p-6"
                      >
                        <div class="p-1">
                          <span class="font-bold text-gray-600 w-2/5"
                            >ADRES:</span
                          >
                          <br />
                          {{ menu.general.address }}
                        </div>
                        <div class="p-1">
                          <span class="font-bold text-gray-600">TELEFON:</span>
                          <br />
                          {{ menu.general.phone }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row justify-between p-4">
                  <router-link to="/categories" class="p-1">
                    <div class="flex flex-col justify-center items-center">
                      <img class="h-36 w-36" src="/categories.svg" alt="" />
                      <span class="text-md font-bold text-gray-600">
                        KATEGORİLER
                      </span>
                    </div>
                  </router-link>

                  <router-link to="/products" class="p-1">
                    <div class="flex flex-col items-center">
                      <img class="h-36 w-36" src="/products.svg" alt="" />
                      <span class="text-md font-bold text-gray-600">
                        ÜRÜNLER
                      </span>
                    </div>
                  </router-link>
                </div>
              </div>

              <div
                class="sm:hidden relative bg-indigo-900 h-12 text-center hover:bg-indigo-600 text-gray-50 p-2 font-bold mt-2 rounded-sm cursor-pointer"
                @click="showQR = !showQR"
              >
                <mdi-qrcode-scan class="absolute text-xl left-2 top-3" />
                <span> QR KODU GÖSTER </span>
              </div>
              <div class="sm:hidden" v-if="showQR">
                <!--  <img :src="menu.general.imageUrl" alt="" class="h-24"> -->
                <Qrcode :menuUrl="menuUrl" class="transform scale-75" />
              </div>
              <div class="hidden sm:block">
                <Qrcode :menuUrl="menuUrl" class="transform scale-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Modal ref="menuFormModal" :title="'ÜRÜN BİLGİLERİ'">
      <MenuForm :menuKey="menuKey" @close="closeMenuForm" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../directives/firebase";
const userId = "user3";
const menus = ref({});

onMounted(() => {
  db.ref(userId).on("value", (snapshot) => {
    const data = snapshot.val();
    menus.value = Object.values(data);
  });
});

const showQR = ref(false);

const menuFormModal = ref(null);
const menuKey = ref("");
const menuUrl = ref(""); // TODO: bu databaseden gelecek!
const selection = ref("");
function closeMenuForm() {
  menuFormModal.value.closeModal();
  //isOpen.value = false
}
function openMenuForm(key) {
  menuFormModal.value.openModal();
}
</script>

<style lang="css" scoped></style>
