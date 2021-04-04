<template>
  <div
    class="bg-gray-100 h-full sm:bg-white p-4 md:flex md:flex-row sm:mt-20 sm:mr-20"
  >
    <div class="w-screen md:w-1/2 flex justify-center bg-white p-4">
      <img src="/logo.svg" alt="" class="h-36 sm:h-full max-h-72" />
    </div>

    <div
      class="max-w-screen-xl md:w-1/2 flex flex-col justify-start items-start"
    >
    <div class="relative">
      <h2
        class="mb-3 text-2xl lg:leading-tight font-extrabold tracking-tight sm:py-8 text-gray-900 sm:text-5xl"
      >
        Menünüzü
        <span class="text-indigo-800 leading-tight">kolayca&nbsp;</span> ve
        <span class="text-blue-800 leading-tight">hızlıca &nbsp;</span> yönetin,
        <span class="text-purple-800">anında</span> &nbsp;güncelleyin
      </h2>
      <p class="font-light text-lg sm:text-2xl">
        Elden ele dolaşan basılı menüler yerine QR kodlu menülere geçerek
        ürünlerinizi
        <span class="tracking-wide text-pink-500 font-bold"> temassız </span>
        bir şekilde müşterilerinizin kendi telefonlarından görebilmelerini
        sağlayabilirsiniz. Menünüzü, her zaman
        <span class="text-pink-500 font-bold">en güncel</span> ürün bilgileriyle
        müşterilerinize <span class="text-pink-500 font-bold"> hızlı </span> ve
        <span class="text-pink-500 font-bold"> kolay </span>bir şekilde sunmanız
        artık mümkün...
      </p>
      </div>
      <Login v-if="loginForm"  class="" @close="loginForm = false" />
      <div class="flex flex-row justify-end pt-10 pb-4 px-4 w-full">
       <!--  <router-link to="/menus" class=""> -->
          <BaseButton @click="showLoginForm">
            <span class="font-semibold mx-4">GİRİŞ</span>
          </BaseButton>
<!--         </router-link>
 -->        <BaseButton @click="scrollToId('benefits')">



          <span class="font-semibold mx-4"> DEVAM </span>
        </BaseButton>
      </div>
  
    </div>
  </div>

  <div class="flex flex-wrap items-stretch justify-center bg-gray-50" id="benefits">
    <div
      v-scroll-animation
      v-for="benefit in benefits"
      :key="benefit.number"
      class="sm:m-4 w-full m-2 sm:max-w-2xl sm:border sm:border-gray-100 sm:shadow-xl"
    >
      <div class="text-gray-50 p-1 sm:p-4 m-1 sm:m-4">
        <div
          class="grid grid-cols-12 items-center bg-white justify-center border-b-2 border-gray-600"
        >
          <div
            class="col-span-3 flex items-center justify-center bg-white text-gray-800"
          >
            <img class="m-1 h-20 sm:h-36" :src="benefit.icon" alt="" />
          </div>
          <div class="col-span-9 m-2 p-2">
            <h4
              class="text-2xl sm:text-4xl text-center font-extrabold tracking-tighter text-gray-900"
            >
              {{ benefit.title }}
            </h4>
          </div>
        </div>
        <div class="w-full flex justify-center"></div>

        <div class="bg-white shadow-md text-gray-800 p-5 text-md sm:text-lg font-light">
          <div class="p-1 text-justify">
            <div class="h-full w-12 bg-pink-400 mr-4 mt-1 float-left">
              <h1 class="text-5xl text-gray-50 font-bold">
                {{ benefit.number }}
              </h1>
            </div>
            <span class="">
              {{ benefit.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="pricing" class="flex flex-row justify-center">
    <Pricing />
  </div>
  <div class="">
    <div class="text-center p-4 text-3xl font-semibold">REFERANSLAR</div>
    <div class="flex flex-row flex-wrap justify-center">
      <div v-for="(customer, index) in customers" :key="index">
        <div>
          <router-link :to="'/' + customer.alias">
            <div
              class="flex flex-col items-center justify-center border transition duration-1000 border-indigo-300 hover:border-indigo-500 hover:shadow-md hover:border-2 m-2 h-48 p-4 w-auto"
            >
              <img
                v-if="customer.imageUrl"
                :src="customer.imageUrl"
                class="h-36 w-auto"
                alt=""
              />
              <div class="text-gray-600 font-bold">{{ customer.title }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" class="h-full flex justify-center items-center">
    <div class="bg-indigo-100 h-full w-screen sm:w-1/2 m-2 rounded-2xl">
      <div
        class="bg-gray-800 rounded-t-2xl p-3 text-gray-50 font-semibold text-center"
      >
        İLETİŞİM
      </div>
      <div class="flex flex-col items-center justify-center text-2xl p-2">
        <div>Menünüz Burada</div>
        <div class="font-extrabold p-2">
          <a href="tel:+905456165632"> 545 616 5632 </a>
        </div>
      </div>
      <div class="p-2 text-center">
        Cevat Dündar Cad. No:1 Ostim Teknopark Turuncu Bina No:53 <br>
        Ostim OSB Yenimahalle / ANKARA 
      </div>
    </div>
    <div class="h-24">

    </div>
  </div>
</template>

<script setup>
import { db } from "../directives/firebase";
import { ref, onMounted } from "vue";

const customers = ref([]);
const mainUser = "admin";

onMounted(() => {
  if (mainUser === "admin") {
    db.ref("menus").on("value", (snapshot) => {
      const data = snapshot.val();
      console.log("s", snapshot);
      Object.values(data).forEach((item) => {
        customers.value.push({
          imageUrl: item.general.imageUrl,
          title: item.general.title,
          alias: item.general.alias
        });
      });
    });
  } else {
    db.ref("menus").on("value", (snapshot) => {
      const data = snapshot.val();
      menus.value = data;
    });
  }
});

function scrollToId(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

const loginForm = ref(false)
function showLoginForm(){
  loginForm.value = true
}

const benefits = ref([
  {
    number: 1,
    color: "gray",
    title: "Daha Güvenli ve Temassız",
    icon: "/touchless.svg",
    description:
      "Müşterilerin ve çalışanların elden ele dolaştırdıkları menüler başta COVID-19 olmak üzere birçok bulaşıcı hastalık açısından risk oluşturmaktadır. Temassız QR kodlu menüler ile bu riski tamamen ortadan kaldırabilirsiniz."
  },
  {
    number: 2,
    color: "indigo",
    title: "Kolay Güncelleme ",
    icon: "/update.svg",
    description:
      "QR kodlu menüler ile menülerinizi anında ve kolay bir şekilde güncellemeniz mümkündür. Yaptığınız değişiklikler hemen menünüze yansır. Gün içerisinde biten ürünlerinizi, dönemsel olarak satıştan kaldırdığınız ürünleri rahatlıkla hiç bir basım maliyeti olmadan menünüzden çıkarabilirsiniz. "
  },
  {
    number: 3,
    color: "yellow",
    title: "Daha İyi Tasarım",
    icon: "/design.svg",
    description:
      "Müşterileriniz tercih ve önerilerine göre menünüzü rahatlıkla sıralamaları ve ürün gruplarını güncelleyebileceğiniz gibi bol görsel ve interaktif özellikler ile menülerinizi daha iyi hale getirirsiniz."
  },
  {
    number: 4,
    color: "pink",
    title: "Daha Düşük Maliyetler",
    icon: "/discount.svg",
    description:
      "Zaman içerisinde tekrar tekrar ortaya çıkan menu tasarım ve basım maliyetlerinden tamamen kurtulmanızı sağlar. Basit bir fiyat değişikliğinde bile bütün menüyü baştan basmanız gerekmediğinden ciddi tasarruf sağlarsınz."
  }
]);
</script>

<style lang="postcss"></style>
