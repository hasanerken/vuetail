<template>
  <div class="h-full bg-gray-50 py-2 shadow-xl">
    <div class="text-2xl font-bold py-4">
      <p>Ürün bilgilerinin girileceği ekran</p>
    </div>
    <Drag />
    <button @click="$refs.modalName.openModal()">Open modal</button>

    <Modal ref="modalName">
      <template v-slot:header>
        <h1>Modal title</h1>
      </template>

      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed
          velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus
          proin nibh nisl condimentum. Fringilla urna porttitor rhoncus dolor
          purus. Nam aliquam sem et tortor. Nisl vel pretium lectus quam id.
          Cras pulvinar mattis nunc sed. Quis ipsum suspendisse ultrices gravida
          dictum fusce ut placerat orci. Tristique magna sit amet purus.
          Fermentum et sollicitudin ac orci phasellus egestas tellus. Erat
          pellentesque adipiscing commodo elit at imperdiet dui accumsan. Felis
          eget nunc lobortis mattis aliquam faucibus. Tincidunt eget nullam non
          nisi est sit amet facilisis. Mi in nulla posuere sollicitudin aliquam
          ultrices sagittis orci. Vitae proin sagittis nisl rhoncus mattis
          rhoncus urna neque. Eget nunc scelerisque viverra mauris in aliquam
          sem fringilla ut. Nec nam aliquam sem et tortor consequat id. Commodo
          nulla facilisi nullam vehicula ipsum a. Elementum tempus egestas sed
          sed. Faucibus purus in massa tempor nec feugiat nisl pretium fusce.
        </p>
      </template>

      <template v-slot:footer>
        <div class="w-full flex flex-col sm:flex-row">
          <button
            class="w-full  text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.modalName.closeModal()"
          >
            İptal
          </button>
          <button
            class="w-full bg-indigo-600 text-indigo-50 hover:text-white hover:bg-indigo-400 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.modalName.closeModal()"
          >
            Kaydet
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped></style>
