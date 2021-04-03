<template>
  <div class="h-auto bg-white py-2 shadow-xl">
    <div class="flex flex-row justify-center">
      <BaseButton @click="openMenuForm('new')">
        <span class="font-semibold">YENİ MENÜ</span>
      </BaseButton>
    </div>
    <div v-if="mainUser === 'admin' " class="m-4 flex justify-center">
    <select name="customers" id="customers" v-model="selectedCustomer" @change="changeMenu(selectedCustomer)">
      <option v-for="(customer, index) in customers" :key="index">{{customer.menuId}}</option>
    </select>
    </div>
    <div class="flex flex-row flex-wrap justify-center items-stretch">
      <div v-for="(menu, key) in menus" :key="key">
        <div class="max-w-2xl flex-1 items-stretch">
          <div
            class="bg-gray-100 m-2 rounded-md border-purple-100 border shadow-xl"
          >
            <div class="">
              <div
                :class="menu.general.isActive ? 'bg-indigo-600' : 'bg-gray-400'"
                class="flex flex-row justify-between items-center rounded-t-md"
              >
                <h1 class="text-xl font-semibold pl-4 text-gray-50 text-center">
                  {{ menu.general.title }}
                </h1>
                <div class="flex flex-row">
                  <div class="flex flex-row items-center p-2">
                    <span
                      v-if="!menu.general.isActive"
                      class="font-bold px-2 text-xs text-gray-900"
                      >MENU KAPALI</span
                    >
                    <checkbox
                      v-model="menu.general.isActive"
                      @update:modelValue="checkboxUpdated(menu)"
                    />
                  </div>
                  <div class="p-1 hover:bg-gray-300 rounded-full m-2">
                    <mdi-delete
                      class="text-3xl p-1 text-gray-500"
                      @click="deleteMenu(key)"
                    />
                  </div>
                  <div class="p-1 hover:bg-indigo-400 rounded-full m-2">
                    <mdi-edit
                      class="text-3xl p-1 text-gray-200"
                      @click="openMenuForm(key)"
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
                  <router-link
                    :to="'/categories/' + menu.general.alias"
                    class="p-1"
                  >
                    <div class="flex flex-col justify-center items-center">
                      <img class="h-36 w-36" src="/categories.svg" alt="" />
                      <span class="text-md font-bold text-gray-600">
                        KATEGORİLER
                      </span>
                    </div>
                  </router-link>

                  <router-link
                    :to="'/products/' + menu.general.alias"
                    class="p-1"
                  >
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
                @click="showQrCode"
              >
                <mdi-qrcode-scan class="absolute text-xl left-2 top-3" />
                <span> QR KODU GÖSTER </span>
              </div>
              <div class="sm:hidden" v-if="showQR" >
                <!--  <img :src="menu.general.imageUrl" alt="" class="h-24"> -->
                <Qrcode
                  :menuUrl="menu.general.alias"
                  class="transform scale-75"
                />
              </div>
              <div class="hidden sm:block">
                <Qrcode
                  :menuUrl="menu.general.alias"
                  class="transform scale-75"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Modal ref="menuFormModal" :title="'ÜRÜN BİLGİLERİ'">
      <MenuForm :selectedMenu="selectedMenu" @close="closeMenuForm" />
    </Modal>
  </div>
  
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { db } from "../directives/firebase";

const mainUser = ""
const menus = ref({});
const selectedMenu = ref("");
const showQR = ref(false);
const customers = ref([]);
const selectedCustomer = ref('')
const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal;

onMounted(() => {
  if (mainUser === "admin") {
    db.ref("users").on("value", (snapshot) => {
    const data = snapshot.val();
    console.log("s", snapshot);
    Object.keys(data).forEach((item) => {
      Object.values(data[item]).forEach((el) => {
        customers.value.push({ customerId: item, menuId: el });
      });
    });
  });

  } else {
    db.ref('menus').on("value", (snapshot) => {
      const data = snapshot.val();
      menus.value = data;
    });
  }
});


function changeMenu(menuId) {
  console.log(menuId)
   db.ref('menus').orderByChild('general/userId').equalTo('user3').on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      menus.value = data;
    });
}

function deleteMenu(value) {
  swalAlert({
    title: "Menüyü silmek istediğinizden emin misiniz?",
    showDenyButton: true,
    confirmButtonText: `Evet, silelim.`,
    denyButtonText: `Hayır, kalsın.`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      console.log(value);
      db.ref('menus').child(value).remove();
    }
  });
}

function checkboxUpdated(menu) {
  console.log(menu)
  db.ref('menus')
    .child(menu.general.alias + "/general")
    .update({ isActive: menu.general.isActive });
}

// MODAL
const menuFormModal = ref(null);

function closeMenuForm() {
  menuFormModal.value.closeModal();
}

function openMenuForm(key) {
  selectedMenu.value = menus.value[key];
  menuFormModal.value.openModal();
}

function showQrCode(){
  showQR.value = !showQR.value
}

</script>

<style lang="css" scoped></style>
