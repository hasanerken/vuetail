<template>
  <div class="m-1 sm:m-4 z-0">
    <div class="table-header">
      <div class="col-span-2 sm:col-span-1 inline-flex items-center">
        <RoundedButton />
      </div>
      <div class="hidden lg:block lg:col-span-1">KATEGORİ</div>
      <div class="col-span-6 sm:col-span-3 lg:col-span-2 text-left">
        ÜRÜN ADI
      </div>
      <div class="hidden sm:block sm:col-span-3 lg:col-span-2">SEÇENEKLER</div>
      <div class="hidden sm:block sm:col-span-2">İÇERİK</div>
      <div class="hidden lg:block lg:col-span-2">TANITIM</div>
      <div class="col-span-2 sm:col-span-1 text-center">FİYAT</div>
      <div class="col-span-2 lg:col-span-1 text-center">GÖSTER</div>
    </div>
    <draggable
      class="dragArea w-full z-0"
      handle=".handle"
      :list="productList"
      @change="log"
    >
      <transition-group>
        <div
          class="product-row"
          v-for="product in filteredProducts"
          :key="product.sortNumber"
          :class="product.isVisible ? 'text-gray-900' : 'text-gray-400'"
        >
          <div
            class="col-span-2 sm:col-span-1 handle inline-flex items-center justify-start cursor-pointer"
          >
            <div class="inline-flex items-center">
              <mdi-drag class="text-xl text-gray-300" />
              <span class="text-xs">
                {{ product.sortNumber }}
              </span>
            </div>
          </div>
          <div class="hidden lg:block lg:col-span-1">Kategori</div>
          <div
            class="col-span-6 hover:text-indigo-600 sm:col-span-3 lg:col-span-2 cursor-pointer"
            @click="openProductForm(product.sortNumber)"
          >
            {{ product.label }}
          </div>
          <div
            class="hidden sm:block sm:col-span-3 lg:col-span-2 sm:line-clamp-2"
          >
            {{ product.options }}
          </div>
          <div class="hidden sm:block sm:col-span-2 sm:line-clamp-2">
            {{ product.contents }}
          </div>
          <div class="hidden lg:block lg:col-span-2 lg:line-clamp-2">
            {{ product.description }}
          </div>
          <div
            class="col-span-2 sm:col-span-1 text-center focus:outline-none focus:bg-white focus:py-2 focus:border focus:border-gray-200 focus:rounded-md"
            contenteditable
            @blur="onEdit"
            @click="setProductKey(product.id)"
          >
            {{ product.price }}
          </div>
          <div
            class="col-span-2 lg:col-span-1 inline-flex items-center justify-center cursor-pointer"
          >
            <EyeOff v-model="product.isVisible" />
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
  <div>
    <Modal ref="productFormModal">
      <template v-slot:header>
        <h1>Ürün Ekleme ve Güncelleme</h1>
      </template>

      <template v-slot:body> </template>

      <template v-slot:footer>
        <div class="w-full flex flex-col sm:flex-row">
          <button
            class="w-full text-indigo-800 hover:text-indigo-500 hover:bg-indigo-50 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.productFormModal.closeModal()"
          >
            İptal
          </button>
          <button
            class="w-full bg-indigo-600 text-indigo-50 hover:text-white hover:bg-indigo-400 transition duration-300 ease-in-out px-10 py-2 m-1 rounded-md"
            @click="$refs.productFormModal.closeModal()"
          >
            Kaydet
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { ref, computed } from "vue";

export default defineComponent({
  components: {
    draggable: VueDraggableNext
  },
  props: {
    category: {
      type: String,
    },
  },
  setup(props) {
    const columns = ref([
      "Sıra",
      "Kategori",
      "Ürün Adı",
      "İçerik",
      "Açıklamalar",
      "Fiyat",
      "Resim",
      "Gizle",
      "Sil"
    ]);

    const filteredProducts = computed(() => {
      return props.category === '' ? productList.value : productList.value.filter(item => item.category === props.category)
    })

    const productList = ref([
      {
        sortNumber: 1,
        category: "Aperatifler",
        label: "Karışık Çerez",
        contents: "Fındık, fıstık, leblebi",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        options: "Karışık, Sade",
        price: 8,
        id: 1,
        isVisible: true
      },
      {
        sortNumber: 2,
        category: "Yiyecekler",
        label: "Tatlı Balık Turtası Acem Kızartması",
        contents: "Balık, elma, jambon, bakla, nohut",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        options: "Sade, Ballı",
        price: 14,
        id: 2,
        isVisible: true
      },
      {
        sortNumber: 3,
        category: "Tatlılar",
        label: "Sütlaç",
        contents: "Süt, pirinç, şeker, tarçın, fındık",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        options: "Fındıklı, Tarçınlı, Sade",
        price: 12,
        id: 3,
        isVisible: true
      },
      {
        sortNumber: 4,
        category: "İçecekler",
        label: "Şalgam Suyu",
        contents: "Kara havuç, tuz",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        options: "Acılı, acısız",
        price: 5,
        id: 4,
        isVisible: true
      }
    ]);

    return {
      columns,
      filteredProducts
    };
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      txt: "",
      productKey: ""
    };
  },
  methods: {
    log(event) {
      console.log(event);
      // bunu update için kullanacağız.
    },
    setProductKey(key) {
      this.productKey = key;
    },
    onEdit(evt) {
      console.log("m", evt);
      var src = evt.target.innerHTML;
      console.log(src, this.productKey);
      // this.txt = src;
    },
    openProductForm(key) {
      console.log("md", key);
      this.$refs.productFormModal.openModal();
    }

    /* endEdit() {
      console.log("mmm")
      // this.$el.querySelector("#editable").blur();
    } */
  }
});
</script>

<style lang="postcss" scoped>
.table-header {
  @apply grid grid-cols-12 w-full bg-indigo-600 text-gray-50 px-1 text-sm font-semibold items-center text-left rounded-t-md;
}

.product-row {
  @apply shadow-lg grid grid-cols-12 text-sm w-full bg-gray-50 border-b border-l border-r p-2 border-indigo-100 items-center ;
}
</style>
