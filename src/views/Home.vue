<template>
  <main>
    <div class="bg-gray-50">
      <div
        class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
      >
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          www.menunuzburada.com

          <br />
          <span class="text-indigo-600"
            >QR menünüzü kolayca hazırlama hizmeti</span
          >
        </h2>
        <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
          <div class="inline-flex rounded-md shadow">
            <router-link
              to="/about"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
              >Next Page</router-link
            >
          </div>
          <ButtonRepo />
        </div>
      </div>
    </div>
  </main>
  <article class="prose prose-sm md:prose-md lg:prose-lg">
    <h1>Garlic bread with cheese: What the science tells us</h1>
    <p>
      For years parents have espoused the health benefits of eating garlic bread
      with cheese to their children, with the food earning such an iconic status
      in our culture that kids will often dress up as warm, cheesy loaf for
      Halloween.
    </p>
    <p>
      But a recent study shows that the celebrated appetizer may be linked to a
      series of rabies cases springing up around the country.
    </p>
    <!-- ... -->
  </article>
  <button
    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none m-4"
  >
    Share on Twitter
  </button>

  <div
    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
  >
    <router-link to="/products" class="">Ürün Yönetimi</router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ButtonRepo from "@/components/ButtonRepo.vue";

export default defineComponent({
  components: { ButtonRepo }
});
</script>
