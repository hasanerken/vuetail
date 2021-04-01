<template>
  <div>
    <div class="flex flex-col items-center">
      <button
        v-if="!imageUrl"
        @click="pickImage"
        class="bg-pink-600 text-pink-50 px-4 py-2 rounded-lg"
      >
        RESİM EKLE
      </button>
      <button
        v-else
        class="bg-pink-200 text-pink-800 px-4 py-2 rounded-lg"
        @click="removeImage"
      >
        RESMİ KALDIR
      </button>

      <input
        ref="imageInput"
        @change="imagePicked"
        type="file"
        style="display: none"
        accept="image/*"
      />
      <img v-if="imageUrl" class="h-24 m-3" :src="imageUrl" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineEmit, defineProps } from "vue";

function pickImage() {
  imageInput.value.click();
}

const emit = defineEmit(["imageUploaded"]);
const props = defineProps({ existingImageUrl: String });

const imageUrl = ref(props.existingImageUrl || "");
const imageInput = ref("");
const image = ref(null);

function imagePicked(event) {
  const files = event.target.files;
  const filename = files[0].name;
  if (filename.lastIndexOf(".") <= 0) {
    return alert("Uygun bir resim girin lütfen!");
  }

  new Promise(function (resolve, reject) {
    let rawImage = new Image();

    rawImage.addEventListener("load", function () {
      resolve(rawImage);
    });

    rawImage.src = URL.createObjectURL(files[0]);
  })
    .then((rawImage) => {
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scaleSize = MAX_WIDTH / rawImage.width;
        let ctx = canvas.getContext("2d");

        canvas.width = MAX_WIDTH;
        canvas.height = rawImage.height * scaleSize;
        ctx.drawImage(rawImage, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function (blob) {
          resolve(URL.createObjectURL(blob));
        }, "image/webp");
      });
    })
    .then((imageURL) => {
      emit("imageUploaded", imageURL);
      return new Promise(function (resolve, reject) {
        let scaledImg = new Image();

        scaledImg.addEventListener("load", function () {
          resolve({ imageURL, scaledImg });
        });

        scaledImg.setAttribute("src", imageURL);
      });
    })
    .then((data) => {
      imageUrl.value = data.imageURL;
      emit("imageUploaded", data.imageURL);
    });
}

function removeImage() {
  imageUrl.value = "";
  image.value = null;
  emit("imageRemoved");
}
</script>

<style lang="postcss" scoped></style>
