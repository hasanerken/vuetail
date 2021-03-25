<template>
  <div class="">
    <input type="text" v-model="value" class="m-2" />
    <div class="flex flex-col items-center justify-center">
      <div id="qrCode" class="p-2">
        <div
          class="flex flex-col justify-center items-center m-5 p-2 border border-gray-400 shadow-md"
          style="width: 300px"
        >
          <h1 class="text-md text-3xl p-2">
            <span class="text-indigo-500 font-extrabold"> MENÜNÜZ</span
            ><span class="font-light text-gray-600">BURADA </span>
          </h1>
          <qrcode-vue :value="value" :size="size" level="H" />
          <div class="text-gray-500 text-md">www.menunuzburada.com</div>
        </div>
      </div>
      <div class="flex flex-row space-x-2">
      <button
        @click="saveQrCode('qrCode')"
        class="bg-indigo-500 text-gray-50 px-4 py-2 rounded-lg text-lg"
      >
        İNDİR (SVG)
      </button>
      <button
        @click="saveQrCodeAsPng('qrCode')"
        class="bg-indigo-500 text-gray-50 px-4 py-2 rounded-lg text-lg"
      >
        İNDİR (PNG)
      </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import * as htmlToImage from "html-to-image";
import { toSvg, toPng } from "html-to-image";

const value = ref("www.google.com");
const size = ref(240);

function saveQrCode(value) {
  var qr1 = document.getElementById(value);
  htmlToImage.toSvg(qr1).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = `${value}.svg`;
    link.href = dataUrl;
    link.click();
  });
}

function saveQrCodeAsPng(value) {
  var qr1 = document.getElementById(value);
  htmlToImage.toPng(qr1).then(function (dataUrl) {
    var link = document.createElement("a");
    link.download = `${value}.png`;
    link.href = dataUrl;
    link.click();
  });
}
</script>

<style lang="postcss" scoped></style>
