<template>
  <div class="m-1 sm:m-4 z-0">
    <div class="table-header p-1">
      <div class="col-span-2 sm:col-span-1 inline-flex items-center">
        <RoundedButton />
      </div>

      <div class="col-span-6 sm:col-span-4 md:col-span-2 text-left">
        ÜRÜN ADI
      </div>
      <div class="hidden lg:block lg:col-span-1">KATEGORİ</div>
      <div class="hidden md:block md:col-span-3 lg:col-span-1">SEÇENEKLER</div>
      <div class="hidden md:block md:col-span-2 lg:col-span-1">İÇERİK</div>
      <div class="hidden lg:block lg:col-span-2">TANITIM</div>
      <div class="hidden sm:block sm:col-span-2 md:col-span-1 text-center">
        RESİM
      </div>
      <div class="col-span-2 md:col-span-1 text-center">FİYAT</div>
      <div class="col-span-2 sm:col-span-2 md:col-span-1 text-center">
        GÖSTER
      </div>
      <div class="hidden sm:block sm:col-span-1 text-center">SİL</div>
    </div>
    <VueDraggableNext
      class="dragArea w-full z-0"
      handle=".handle"
      :list="products"
      @change="log"
      @start="clearCategories"
    >
      <transition-group>
        <div
          class="product-row"
          v-for="product in products"
          :key="product.sortNumber"
          :class="product.isVisible ? 'text-gray-900' : 'text-gray-400'"
        >
          <div
            class="col-span-2 sm:col-span-1 handle inline-flex items-center justify-start cursor-pointer"
          >
            <div class="inline-flex items-center">
              <mdi-drag class="text-xl text-gray-300" />
              <span class="text-xs">
                {{ product.sortNumber + 1 }}
              </span>
            </div>
          </div>

          <div
            class="col-span-6 hover:text-indigo-600 sm:col-span-4 md:col-span-2 cursor-pointer"
            @click="selectRow(product)"
          >
            {{ product.title }}
          </div>
          <div class="hidden lg:block lg:col-span-1">
            {{ product.category.title }}
          </div>
          <div
            class="hidden md:block md:col-span-3 lg:col-span-1 md:line-clamp-2"
          >
            {{ product.options }}
          </div>
          <div
            class="hidden text-left md:block md:col-span-2 md:line-clamp-2 lg:col-span-1"
          >
            {{ product.contents }}
          </div>
          <div class="hidden lg:block lg:col-span-2 lg:line-clamp-2">
            {{ product.description }}
          </div>
          <div
            class="hidden sm:flex sm:col-span-2 md:col-span-1 items-center justify-center"
          >
            <img
              v-if="product.imageUrl"
              :src="product.imageUrl"
              alt=""
              class="w-8 sm:w-12"
            />
            <div v-else class="">
              <div
                class="w-10 hover:bg-indigo-200 transition duration-300 h-10 flex items-center justify-center rounded-full"
              >
                <mdi-cloud-upload
                  class="text-2xl text-indigo-600 cursor-pointer"
                  @click="selectRow(product)"
                />
              </div>
            </div>
          </div>

          <div
            class="col-span-2 sm:col-span-2 md:col-span-1 text-center focus:outline-none focus:bg-white focus:py-2 focus:border focus:border-gray-200 focus:rounded-md"
            contenteditable
            @keydown.enter.prevent
            @keypress="isNumber($event)"
            @blur="updatePrice"
            @click="setProductId(product.id)"
          >
            {{ product.price }}
          </div>

          <div
            class="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 inline-flex items-center justify-center cursor-pointer"
          >
            <EyeOff
              v-model="product.isVisible"
              :imageOnly="true"
              @update:modelValue="updateVisibility(product)"
            />
          </div>
          <div
            class="hidden text-center sm:col-span-1 sm:flex md:col-span-1 justify-center items-center"
          >
            <div
              class="flex w-12 hover:bg-gray-200 transition duration-300 h-12 items-center justify-center rounded-full"
            >
              <mdi-delete
                class="text-3xl p-1 text-gray-500"
                @click="deleteCategory(category.id)"
              />
            </div>
          </div>
        </div>
      </transition-group>
    </VueDraggableNext>
    <div
      class="bg-indigo-600 rounded-b-lg flex flex-row items-center justify-center h-8"
    >
      <!--  <div
        class="p-1 hover:bg-indigo-400 transition duration-300 rounded-sm m-1"
        @click="decreaseRowNumbers"
      >
        <mdi-chevron-double-left class="m-2 text-xl text-gray-50" />
      </div>
      <div class="px-5 text-center text-indigo-100">
        {{ firstRow }} - {{ lastRow }} / {{ numberOfRows }}
      </div>
      <div
        class="p-1 hover:bg-indigo-400 transition duration-300 rounded-sm m-1"
      >
        <mdi-chevron-double-right
          class="m-2 text-xl text-gray-50"
          @click="increaseRowNumbers"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { VueDraggableNext } from "vue-draggable-next";
import {
  ref,
  onMounted,
  defineProps,
  defineEmit,
  getCurrentInstance,
  watchEffect
} from "vue";
import { db } from "../../directives/firebase";
import { useRoute } from "vue-router";

const route = useRoute();
const alias = route.params.alias;

const emit = defineEmit(["selectedRow", "clearCategories"]);
const swalAlert = getCurrentInstance().appContext.config.globalProperties.$swal;

const enabled = ref(true);
const dragging = ref(false);
const txt = ref("");
const products = ref([]);
const props = defineProps({ category: { type: Object || String } });
const filteredProducts = ref([]);
// const numberOfRows = ref(0);
// const pageSize = ref(10);
// const firstRow = ref(1);
// const lastRow = ref(20);
const userId = "user3";

watchEffect(() => {
  if (props.category === "Tümü") {
    db.ref("menus")
      .child(alias + "/products/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tempProducts = Object.values(data);
          products.value = tempProducts.sort(
            (a, b) => a.sortNumber - b.sortNumber
          );
        } 
      });
  } else if (props.category !== "") {
    db.ref("menus")
      .child(alias + "/products/")
      .orderByChild("category/id")
      .equalTo(props.category.id)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tempProducts = Object.values(data);
          products.value = tempProducts.sort(
            (a, b) => a.sortNumber - b.sortNumber
          );
        } else {
          products.value = [];
        }
      });
  }

  /* if (props.category !== "") {
    filteredProducts.value = products.value.filter((item) => {
      return item.category === props.category;
    });
  } else {
    filteredProducts.value = products.value;
  } */
  /* numberOfRows.value = filteredProducts.value.length;
  lastRow.value =
    numberOfRows.value < pageSize.value ? numberOfRows.value : pageSize.value; */
});

function selectRow(product) {
  emit("selectedRow", product);
}

// DATABASE MANAGEMENT
/* onMounted(() => {
  db.ref(userId)
    .child(alias + '/products/').orderByChild('category').equalTo('A Kat')
    .on("value", (snapshot) => {
      const data = snapshot.val();
      const tempProducts = Object.values(data);
      products.value = tempProducts.sort((a, b) => a.sortNumber - b.sortNumber);
    });
}); */

function deleteCategory(productId) {
  swalAlert({
    title: "Kategoriyi silmek istediğinizden emin misiniz?",
    showDenyButton: true,
    confirmButtonText: `Evet, silelim.`,
    denyButtonText: `Hayır, kalsın.`
  }).then((result) => {
    if (result.isConfirmed) {
      db.ref("menus")
        .child(alias + "/products/" + productId)
        .remove();
    }
  });
}

let productId;

function updatePrice(event) {
  const newPrice = event.target.innerText;
  db.ref("menus")
    .child(alias + "/products/" + productId)
    .update({ price: newPrice });
}

function setProductId(value) {
  productId = value;
}

function updateVisibility(product) {
  db.ref("menus")
    .child(alias + "/products/" + product.id)
    .update({ isVisible: product.isVisible });
}

function clearCategories() {
  emit("clearCategories");
}

/* function decreaseRowNumbers() {
  if (lastRow.value - numberOfRows.value === 0) {
    lastRow.value = numberOfRows.value;
    firstRow.value = 1;
  } else if (lastRow.value % pageSize.value !== 0) {
    lastRow.value -= numberOfRows.value % pageSize.value;
    firstRow.value = lastRow.value - pageSize.value + 1;
  } else if (lastRow.value - pageSize.value > 0) {
    lastRow.value -= pageSize.value;
    firstRow.value = lastRow.value - pageSize.value + 1;
  }
}
 */
/* function increaseRowNumbers() {
  if (numberOfRows.value < lastRow.value + pageSize.value) {
    lastRow.value = numberOfRows.value;
    firstRow.value =
      numberOfRows.value - (numberOfRows.value % pageSize.value) + 1;
  } else {
    lastRow.value += pageSize.value;
    firstRow.value = lastRow.value - pageSize.value + 1;
  }
}
 */
function log(event) {
  products.value.forEach((item, index) => {
    console.log(item.id, item.sortNumber, index);
    db.ref("menus")
      .child(alias + "/products/" + item.id)
      .update({ sortNumber: index });
  });
}

function isNumber(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
}

/* const paginatedProducts = computed(() => {
  return filteredProducts.value.slice(firstRow.value - 1, lastRow.value);
}); */
</script>

<style lang="postcss" scoped>
.table-header {
  @apply grid grid-cols-12 w-full bg-indigo-600 text-gray-50 px-1 text-sm font-semibold items-center text-left rounded-t-md;
}

.product-row {
  @apply shadow-lg grid grid-cols-12 text-sm w-full bg-gray-50 border-b border-l border-r p-2 border-indigo-100 items-center;
}
</style>
