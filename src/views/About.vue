<template>
  <main>
    <div v-for="(item, key) in products" :key="key">
        {{ item }}
    </div>
  </main>
</template>


<script setup>
import {  reactive } from 'vue';

const products = reactive({
  uid001: {
    label: "Peynirli Gözleme",
    price: 12.20,
    category: "foods",
    view: "card1",
    contents: "peynir, yufka, maydonoz",
    description: "Beyaz peynir, ev açması yufka ile tandırda pişirilir. Domates ve salatalık ile servis edilir.",
    options: "Büyük, orta ve küçük boy",
    extra: "Ürün detaylarını anlatabiliriz burada!",
    imageUrl: "https://iasbh.tmgrup.com.tr/32fead/812/467/0/404/768/846?u=https://isbh.tmgrup.com.tr/sbh/2019/12/09/yogurtlu-gozleme-tarifi-1575878221128.jpg",
  },
  uid002: {
    label: "Patatesli Gözleme",
    price: 14.20,
    category: "foods",
    view: "line1",
    contents: "patates, yufka, kaşar",
    description: "Patates, kaşar peyniri, ev açması yufka ile tandırda pişirilir. Domates ve salatalık ile servis edilir.",
    options: "Büyük, orta ve küçük boy",
    extra: "Ürün detaylarını anlatabiliriz burada!",
    imageUrl: "https://iasbh.tmgrup.com.tr/32fead/812/467/0/404/768/846?u=https://isbh.tmgrup.com.tr/sbh/2019/12/09/yogurtlu-gozleme-tarifi-1575878221128.jpg",
  }
})

</script>

