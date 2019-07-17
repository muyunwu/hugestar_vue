import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(Vuex);
Vue.use(VueAxios, axios);
export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    isLoading: false
  },
  getters: {
    categories(state) {
      const set = new Set();
      let categories = state.products.filter(item =>
        !set.has(item.category) ? set.add(item.category) : false
      );
      categories = categories.map(item => {
        let total = 0;
        let category = item.category;
        state.products.forEach(product => {
          if (category === product.category) {
            total++;
          }
        });
        return {
          ...item,
          total
        };
      });

      return categories;
    },
    newArrival(state) {
      let newArrival = state.products.filter((item, idx, array) => {
        return idx > array.length - 4 && idx <= array.length;
      });
      return newArrival;
    },
    cartLength(state) {
      return state.cart.length;
    },
    cartTotal(state) {
      let total = 0;
      state.cart.forEach(item => {
        total += parseInt(item["final_total"]);
      });
      return total;
    }
  },
  mutations: {
    getProducts(state, products) {
      state.products = products;
    },
    getCart(state, cart) {
      state.cart = cart;
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    }
  },
  actions: {
    getProducts({ commit }) {
      const PRODUCTS_API = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_TOKEN
      }/products/all`;

      Vue.axios.get(PRODUCTS_API).then(res => {
        const products = res.data.products;
        commit("getProducts", products);
      });
    },
    getCart({ commit }) {
      const GET_CART_API = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_TOKEN
      }/cart`;

      Vue.axios.get(GET_CART_API).then(res => {
        let cart = res.data.data.carts;
        commit("getCart", cart);
      });
    }
  }
});
