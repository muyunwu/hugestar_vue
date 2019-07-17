import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import ProductsPage from "./views/ProductPage.vue";
import ReservationPage from "./views/ReservationPage.vue";
import LocationPage from "./views/LocationPage.vue";
import CartPage from "./views/CartPage.vue";
import Login from "./views/Login.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      alias: "/products",
      path: "/products/all",
      component: ProductsPage
    },
    {
      path: "/products/all/:q",
      name: "search",
      component: ProductsPage,
      props: true
    },
    {
      path: "/products/:category/:id",
      name: "product",
      component: ProductsPage,
      props: true
    },
    {
      path: "/products/:category",
      name: "products",
      component: ProductsPage,
      props: true
    },
    {
      path: "/locations",
      name: "locations",
      component: LocationPage
    },
    {
      path: "/reservation",
      name: "reservation",
      component: ReservationPage
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
