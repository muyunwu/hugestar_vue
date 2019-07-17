<template>
  <header id="header" @keyup.esc="searchModal = false;searchValue='' " :class="[headerClass]">
    <transition name="fade">
      <div class="search-modal" v-if="searchModal">
        <div class="wrapper">
          <button type="button" @click="searchModal=false;searchValue=''" class="close-btn">
            <font-awesome-icon icon="times"/>
          </button>
          <label class="search-group">
            <input
              type="text"
              class="search-input"
              placeholder="SEARCH"
              @keyup.enter="searchProduct"
              v-model="searchValue"
            >
            <span class="search-icon" :style="{color:searchColor}">
              <font-awesome-icon icon="search"/>
            </span>
          </label>
          <div class="search-text">PRESS ENTER TO SEARCH OR ESC TO CLOSE</div>
        </div>
      </div>
    </transition>

    <div class="wrapper">
      <nav class="nav--main">
        <div class="nav__item" data-aos="fade-down" data-aos-delay="200">
          <router-link class="nav__link" to="/products">Products</router-link>
        </div>
        <div class="nav__item" data-aos="fade-down" data-aos-delay="300">
          <router-link class="nav__link" to="/reservation">Reserve</router-link>
        </div>
        <div class="nav__item" data-aos="fade-down" data-aos-delay="400">
          <router-link class="nav__link" to="/locations">Locations</router-link>
        </div>
      </nav>
      <div class="logo" data-aos="fade-down" data-aos-delay="600">
        <router-link to="/">
          <img :src="logoUrl" alt>
        </router-link>
      </div>
      <nav class="nav--sub">
        <div class="nav__item" data-aos="fade-down" data-aos-delay="800">
          <a href class="nav__link" @click.prevent="searchModal=true">
            <span class="nav__icon">
              <font-awesome-icon icon="search"/>
            </span>
            Search
          </a>
        </div>
        <div class="nav__item" data-aos="fade-down" data-aos-delay="900">
          <router-link to="/cart" class="nav__link" @click.prevent>
            <span class="nav__icon">
              <font-awesome-icon icon="shopping-cart"/>
            </span>
            Cart
            <span class="cart-num">{{cartLength}}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";

import { mapGetters } from "vuex";
export default {
  name: "appHeader",
  props: {
    page: {
      type: String,
      default: "other"
    }
  },
  data() {
    return {
      logoUrl: "",
      searchModal: false,
      searchValue: "",
      headerClass: ""
    };
  },
  methods: {
    searchProduct() {
      const vm = this;
      this.$router.push({
        name: "search",
        params: {
          q: vm.searchValue
        }
      });
      this.searchModal = false;
      this.searchValue = "";
    },
    scroll() {
      const vm = this;
      var height =
        window.innerHeight - 85 ||
        document.documentElement.clientHeight - 85 ||
        document.body.clientHeight - 85;
      if (window.pageYOffset > height) {
        vm.headerClass = "";
        vm.logoUrl = require("../assets/HUGE STAR.png");
      } else {
        vm.headerClass = "Light";
        vm.logoUrl = require("../assets/HUGE STAR_L.png");
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(val) {
        const vm = this;
        if (val.name === "home") {
          this.headerClass = "Light";
          vm.logoUrl = require("../assets/HUGE STAR_L.png");
          window.addEventListener("scroll", vm.scroll);
        } else {
          this.headerClass = "";
          vm.logoUrl = require("../assets/HUGE STAR.png");
          window.removeEventListener("scroll", vm.scroll);
        }
      }
    }
  },
  computed: {
    searchColor() {
      return this.searchValue ? "#fff" : "#4d4d4d";
    },
    ...mapGetters(["cartLength"])
    // ...mapState(["cartLength"])
  },
  mounted() {
    AOS.init({
      duration: 1500,
      easing: "ease-in-out"
    });

    function scroll() {
      var height =
        window.innerHeight - 85 ||
        document.documentElement.clientHeight - 85 ||
        document.body.clientHeight - 85;
      if (window.pageYOffset > height) {
        vm.headerClass = "";
        vm.logoUrl = require("../assets/HUGE STAR.png");
      } else {
        vm.logoUrl = require("../assets/HUGE STAR_L.png");
        vm.headerClass = "Light";
      }
    }
    // window.addEventListener("scroll", scroll);
  }
};
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  width: 100%;
  padding: 30px 0;
  z-index: 999;
  transition: 0.5s;
  border-bottom: 1px solid transparent;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  a {
    color: #000;
  }
  .cart-num {
    background-color: #000;
    color: #fff;
    text-align: center;
    font-size: 12px;
  }
  &.Light {
    background-color: transparent;
    border-bottom: 1px solid transparent;
    a {
      color: #fff;
    }
    .cart-num {
      background-color: transparent;
      color: #fff;
    }
  }
}
#header > .wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.logo {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 130px;
  img {
    width: 100%;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.search-modal {
  top: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.9);
  z-index: 2000;
}
.search-modal .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: column;
  color: #4d4d4d;
}
.search-group {
  border-bottom: 1px solid #fff;
  min-width: 600px;
  width: 35%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 15px;
}
.search-icon {
  color: #4d4d4d;
  font-size: 36px;
  // padding-bottom: 10px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  transition: 0.5s;
}
.search-input {
  color: #fff;
  padding: 10px;
  padding-right: 0;
  flex: 1;
  letter-spacing: 2px;
  font-size: 36px;
  &::placeholder {
    color: #4d4d4d;
    transition: 0.5s;
  }
  &:focus {
    &::placeholder {
      color: #fff;
    }
  }
}
.search-input:focus + span {
  color: #fff !important;
}
.search-text {
  font-size: 14px;
  min-width: 600px;
  width: 35%;
  text-align: left;
}
.close-btn {
  position: absolute;
  top: 40px;
  right: 0px;
  outline: 0;
  border: 0;
  color: #fff;
  background: transparent;
  font-size: 36px;
  cursor: pointer;
}
.nav--main,
.nav--sub {
  line-height: 22px;
  padding: 0;
}
.nav__item {
  font-size: 16px;
  letter-spacing: 0.4px;
  display: inline-flex;
  align-items: center;
  & + & {
    margin-left: 25px;
  }
}
.nav__link {
  display: inline-flex;
  align-items: center;
  color: #fff;
  transition: color 0.75s;
  padding-bottom: 2px;
  &:hover {
    color: #bdbdbd;
  }
}
.nav__icon {
  font-size: 14px;
  margin-right: 8px;
}
.cart-num {
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
  min-width: 20px;
  text-align: center;
}
</style>
