<template>
  <main>
    <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="flex flex-row justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ $route.meta.title }}
        </h1>
        <div
          class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
        >
          <router-link to="/" class="">Ana Sayfa</router-link>
        </div>
      </div>
    </header>

    <router-view />
  </main>
</template>
