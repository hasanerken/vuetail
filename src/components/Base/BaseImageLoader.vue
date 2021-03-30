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
import { reactive, ref, defineEmit } from "vue";
const imageUrl = ref("");
const imageInput = ref("");
const image = ref(null);

function pickImage() {
  console.log("mmmm");
  imageInput.value.click();
}

const emit = defineEmit(['imageUploaded'])

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
        console.log("raw", rawImage);
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
     
      emit("imageUploaded", imageURL )
      return new Promise(function (resolve, reject) {
        let scaledImg = new Image();

        scaledImg.addEventListener("load", function () {
          resolve({ imageURL, scaledImg });
        });

        scaledImg.setAttribute("src", imageURL);
      
      })
    })
    .then((data) => {
      console.log("ssss", data)
      imageUrl.value = data.imageURL;
      emit("imageUploaded", data.imageURL)
      
    });
}

/*   const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    imageUrl.value = fileReader.result;
  });
  fileReader.readAsDataURL(files[0]);
  image.value = files[0];
}
 */
function removeImage() {
  imageUrl.value = "";
  image.value = null;
}

/**
 * DİKKKAT
 */

/*
function processFile(file) {
  if (!file) {
    return;
  }
  console.log(file);

  let imageBox = addImageBox(refs.imagePreviews);

  // Load the data into an image
  new Promise(function (resolve, reject) {
    let rawImage = new Image();

    rawImage.addEventListener("load", function () {
      resolve(rawImage);
    });

    rawImage.src = URL.createObjectURL(file);
  })
    .then(function (rawImage) {
      // Convert image to webp ObjectURL via a canvas blob
      return new Promise(function (resolve, reject) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        ctx.drawImage(rawImage, 0, 0);

        canvas.toBlob(function (blob) {
          resolve(URL.createObjectURL(blob));
        }, "image/webp");
      });
    })
    .then(function (imageURL) {
      // Load image for display on the page
      return new Promise(function (resolve, reject) {
        let scaledImg = new Image();

        scaledImg.addEventListener("load", function () {
          resolve({ imageURL, scaledImg });
        });

        scaledImg.setAttribute("src", imageURL);
      });
    })
    .then(function (data) {
      // Inject into the DOM
      let imageLink = document.createElement("a");

      imageLink.setAttribute("href", data.imageURL);
      imageLink.setAttribute("download", `${file.name}.webp`);
      imageLink.appendChild(data.scaledImg);

      imageBox.innerHTML = "";
      imageBox.appendChild(imageLink);
    });
}

function fileSelectorChanged() {
  processFiles(refs.fileSelector.files);
  refs.fileSelector.value = "";
}


refs.fileSelector.addEventListener("change", fileSelectorChanged);

*/
</script>

<style lang="postcss" scoped></style>
