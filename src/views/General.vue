<template>
  <div class="h-full bg-white py-2 shadow-xl">
    <div class="flex flex-row justify-center">
      <BaseButton @click="openCustomerForm">
        <span class="font-semibold">Yeni İşletme Ekle</span>
      </BaseButton>
    </div>

   <div class="flex flex-row flex-wrap items-center justify-center m-2">
      <div class="bg-gray-100 max-w-3xl m-2 rounded-md border-purple-100 border shadow-xl">
      <div class="">
        <div
          class="flex flex-row justify-between items-center bg-indigo-500 rounded-t-md"
        >
          <h1 class="text-xl font-semibold pl-4 text-gray-50 text-center">
            İşletme Adı
          </h1>
          <div class="p-1 hover:bg-indigo-400 rounded-full m-2">
            <mdi-edit
              class="text-3xl p-1 text-gray-200"
              @click="openCustomerForm"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row">
        <div class="">    
          <div class="hidden sm:block">
            <div
              class="flex flex-col items-start text-md justify-start font-extralight p-6"
            >
              <div class="p-1">
                <span class="font-bold text-gray-600">ADRES:</span> <br />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </div>
              <div class="p-2">
                <span class="font-bold text-gray-600">TELEFON:</span> <br />
                312 200 44 22
              </div>
            </div>
          </div>
           <div class="flex flex-row justify-between p-4">
            <div class="">
              <router-link to="/categories" class="p-1">
                <div class="flex flex-col justify-center items-center">
                  <img class="h-36 w-36" src="/categories.svg" alt="" />
                  <span class="text-md font-bold text-gray-600">
                    KATEGORİLER
                  </span>
                </div>
              </router-link>
            </div>
            <div class="">
              <router-link to="/products" class="p-1">
                <div class="flex flex-col items-center">
                  <img class="h-36 w-36" src="/products.svg" alt="" />
                  <span class="text-md font-bold text-gray-600"> ÜRÜNLER </span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="sm:ml-12">
          <Qrcode :customerUrl="customerUrl" />
        </div>
      </div>
    </div>
   </div>
  </div>
  <div>
    <Modal ref="customerFormModal" :title="'ÜRÜN BİLGİLERİ'">
      <CustomerForm :customerKey="customerKey" @close="closeCustomerForm" />
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
const customerFormModal = ref(null);
const customerKey = ref("");
const customerUrl = ref(""); // TODO: bu databaseden gelecek!
const selection = ref("");
function closeCustomerForm() {
  console.log("...");
  customerFormModal.value.closeModal();
  //isOpen.value = false
}
function openCustomerForm(key) {
  console.log("md", key);
  customerFormModal.value.openModal();
}
</script>

<style lang="postcss" scoped></style>
