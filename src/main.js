import { createApp } from "vue";
import "./tailwind.css";
import App from "./App.vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import ScrollAnimation from "./directives/scroll-animation";
import Clickoutside from "./directives/clickoutside";
import { auth } from "./directives/firebase";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const alertOptions = {
  confirmButtonColor: "#530FF1",
  denyButtonColor: "#DB2777"
};

const router = createRouter({
  history: createWebHistory(),
  routes
});

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(VueSweetalert2, alertOptions);
    app.directive("clickoutside", Clickoutside);
    app.directive("scroll-animation", ScrollAnimation);
    app.use(router);
    app.mount("#app");
  }
});
