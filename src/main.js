import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from "vee-validate";
Vue.use(VueTilt);
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
import pointer from "./components/Pointer.vue";
import appHeader from "./components/Header.vue";
import appFooter from "./components/Footer.vue";
import loading from "./components/Loading.vue";
import VueTilt from "vue-tilt.js";
import "sticky-sidebar";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faSearch,
  faTimes,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faShoppingCart,
  faSearch,
  faTimes,
  faFacebookF,
  faInstagram,
  faArrowRight,
  faArrowLeft,
  faPlus,
  faMinus
);
Vue.component("pointer", pointer);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("app-header", appHeader);
Vue.component("app-footer", appFooter);
Vue.component("loading", loading);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
