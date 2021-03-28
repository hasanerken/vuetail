import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import ScrollAnimation from "./directives/scroll-animation";
import Clickoutside from "./directives/clickoutside";


const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes
});


app.directive("clickoutside", Clickoutside);
app.directive("scroll-animation", ScrollAnimation);
app.use(router);
app.mount("#app");
