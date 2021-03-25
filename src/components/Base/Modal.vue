<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="backdrop" @click="closeModal" />

      <div class="dialog-box mt-10 sm:mt-24 md:mt-32">
        <div class="dialog-header">
          <slot name="header" />
          <div class="dialog-close transition duration-400 ease-in-out">
            <button type="button" class="z-10" @click="closeModal">
              <mdi-close-thick class="font-bold" />
            </button>
          </div>
        </div>

        <div class="dialog-body">
          <slot name="body" />
        </div>

        <div class="dialog-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    }
  }
};
</script>

<style lang="postcss" scoped>
.modal {
  @apply overflow-x-hidden overflow-y-auto  fixed top-0 right-0 bottom-0 left-0 z-20;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  @apply fixed top-0 right-0 bottom-0 left-0 z-10;
}

.dialog-box {
  @apply bg-white relative flex flex-col rounded-md z-30  w-5/6 sm:w-2/3 max-w-3xl mx-auto
}

.dialog-close {
  @apply h-12 w-12 rounded-full hover:bg-indigo-200 inline-flex justify-center items-center;
}

.dialog-header {
  @apply flex flex-row justify-between items-center p-1 pl-5 font-bold text-indigo-800 text-xl bg-indigo-100 rounded-t-md;
}

.dialog-body {
  @apply p-1 overflow-auto flex flex-col items-stretch;
}

.dialog-footer {
  @apply flex flex-row justify-end p-4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
