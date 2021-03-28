<template>
  <div class="m-1 sm:m-4 z-0">
    <div class="table-header">
      <div class="col-span-2 sm:col-span-1 inline-flex items-center">
        <RoundedButton />
      </div>
      <div class="col-span-3 sm:col-span-2">RESİM</div>
      <div class="col-span-4 sm:col-span-3 text-left">
        KATEGORİ
      </div>
      <div class="hidden sm:block sm:col-span-4">TANITIM</div>
      <div class="col-span-3 sm:col-span-2 text-center">GÖSTER</div>
    </div>
    <draggable
      class="dragArea w-full z-0"
      handle=".handle"
      :list="categoryList"
      @change="log"
    >
      <transition-group>
        <div
          class="category-row"
          v-for="category in categoryList"
          :key="category.sortNumber"
          :class="category.isVisible ? 'text-gray-900' : 'text-gray-400'"
        >
          <div
            class="col-span-2 sm:col-span-1 handle inline-flex items-center justify-start cursor-pointer"
          >
            <div class="inline-flex items-center">
              <mdi-drag class="text-xl text-gray-300" />
              <span class="text-xs">
                {{ category.sortNumber }}
              </span>
            </div>
          </div>
          <div class="col-span-3 sm:col-span-2">
            <img src="/logo.svg" alt="" class="h-16 w-16">
          </div>
          
          <div
            class="col-span-4 sm:col-span-3 hover:text-indigo-600 cursor-pointer"
            @click="selectRow(category.id)"
          >
            {{ category.title }}
          </div>
          
          
          <div class="hidden sm:col-span-4 sm:line-clamp-2">
           {{ category.description }}
          </div>
          <div
            class="col-span-3 sm:col-span-2 inline-flex items-center justify-center cursor-pointer"
          >
            <EyeOff v-model="category.isVisible" />
          </div>
        </div>
      </transition-group>
    </draggable>
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
      type: String
    }
  },
  setup(props) {
   
    

    const categoryList = ref([
      {
        sortNumber: 1,
        title: "Atıştırmalık",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        id: "1",
        isVisible: true
      },
      {
        sortNumber: 2,
        title: "Yiyecekler",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        id: "2",
        isVisible: true
      },
      {
        sortNumber: 3,
        title: "Tatlılar",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        id: "3",
        isVisible: true
      },
      {
        sortNumber: 4,
        title: "İçecekler",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, fuga asperiores distinctio inventore nisi suscipit.",
        id: "4",
        isVisible: true
      }
    ]);

    return {
      categoryList
    };
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      txt: "",
      categoryKey: ""
    };
  },
  methods: {
    log(event) {
      console.log(event);
      // bunu update için kullanacağız.
    },
    // TODO: setcategoryPrice ve onEdit birleştirilerek sadece fiyat güncellemesi yaptırılabilir. 
    setcategoryPrice(key) {
      this.categoryKey = key;
    },
    onEdit(evt) { 
      var src = evt.target.innerHTML;
      console.log(src, this.categoryKey);
      // this.txt = src;
    },
    selectRow(id) {
      this.$emit("selectedRow", id);
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

.category-row {
  @apply shadow-lg grid grid-cols-12 text-sm w-full bg-gray-50 border-b border-l border-r p-2 border-indigo-100 items-center;
}
</style>
