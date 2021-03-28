<template>
  <div>
    <div class="flex flex-col items-center justify-center">
      <div id="qrCode" class="p-2">
        <div
          class="flex flex-col justify-center items-center m-2 p-2 border border-gray-400 rounded-md bg-white"
          style="width: 300px"
        >
          <h1 class="text-md text-3xl p-2">
            <span class="text-indigo-500 font-extrabold"> MENÜNÜZ</span
            ><span class="font-light text-gray-600">BURADA </span>
          </h1>

          <QrcodeVue :value="url" :size=240 level="H" />

          <div class="text-gray-500 text-md">menunuzburada.com</div>
        </div>
      </div>
      <div class="flex flex-row space-x-2 mb-3">
        <button
          @click="saveQrCode('qrCode')"
          class="bg-gray-50 border transition ease-in-out duration-300 border-indigo-400 text-indigo-500 px-4 py-2 rounded-lg font-semilight hover:bg-indigo-500 hover:text-indigo-50"
        >
          İNDİR (SVG)
        </button>

        <button
          @click="saveQrCodeAsPng('qrCode')"
          class="bg-gray-50 border transition ease-in-out duration-300 border-indigo-400 text-indigo-500 px-4 py-2 rounded-lg font-semilight hover:bg-indigo-500 hover:text-indigo-50"
        >
          İNDİR (PNG)
        </button>
      </div>
     
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmit, watch, watchEffect, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import * as htmlToImage from "html-to-image";

const props = defineProps({ customerUrl: String });

const url = computed(() => {
    return `https://menunuzburada.com/${props.customerUrl}`
})

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
