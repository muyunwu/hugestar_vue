<template>
  <div id="app" @mousemove="mouse">
    <!-- <pointer :mouseX="x" :mouseY="y"/> -->
    <app-header :page="page"/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  computed: {
    page() {
      return this.$route.name;
    }
  },
  methods: {
    mouse(event) {
      // this.x = event.pageX;
      // this.y = event.pageY;
    },
    ...mapActions(["getProducts", "getCart"])
  },
  mounted() {
    this.getProducts();
    this.getCart();
  }
};
</script>

<style lang="scss">
@import "reset-css";
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.vdp-datepicker__calendar {
  width: 100% !important;
  border: 0 !important;
}
.vdp-datepicker__calendar .cell.selected {
  background: #000 !important;
  color: #fff !important;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border-color: #000 !important;
}
.vdp-datepicker__calendar header {
  // line-height: 60px !important;
  margin-bottom: 10px;
}
.day__month_btn {
  font-size: 26px !important;
}
html {
  box-sizing: border-box;
  font-family: Roboto, nimbus-sans, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  font-family: inherit;
  // cursor: none;
}
a {
  text-decoration: none;
  color: #fff;
}
button {
  outline: 0;
  border: 0;
  cursor: pointer;
}
main {
  padding: 150px 0;
}
.clearfix::after {
  display: table;
  content: "";
  clear: both;
}
.text-center {
  text-align: center;
}
.loading-cover {
  width: 100%;
  height: 100vh;
  background: #2c3e50;
  position: fixed;
}
.wrapper {
  width: 960px;
  margin: 0 auto;
  position: relative;
  @media screen and (min-width: 960px) {
    width: 1140px;
  }
  .row {
    margin: 0 -15px;
  }
}
input {
  background: transparent;
  outline: 0;
  border: 0;
}
.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}
.btn {
  display: inline-block;
  font-size: 14px;
  padding: 15px 45px;
  background: #fff;
  border-radius: 100px;
  font-weight: bold;
  color: #000;
  overflow: hidden;
  position: relative;
  transition: 0.8s;
  span {
    position: relative;
    z-index: 2;
  }
  &:after {
    display: block;
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    transform: scale(0);
    background: #000;
    // top: calc(50% - 150px);
    // left: calc(50% - 150px);
    top: -200px;
    left: -200px;
    z-index: 1;
    border-radius: 50%;
    transition: 0.8s;
  }
  &:hover {
    color: #fff;

    &:after {
      transform: scale(1);
    }
  }
}
.products-list {
  display: flex;
  flex-wrap: wrap;
}
.product-layout,
.category-layout {
  padding: 0 15px;
  margin-bottom: 50px;
  width: 33.3333%;
}
.category-layout {
  margin-bottom: 65px;
}
.category-item {
  display: block;
  background: #fff;
  position: relative;
  cursor: pointer;
  img {
    vertical-align: top;
  }
  &:hover {
    img {
      transform: scale(1.12);
    }
    .category-title {
      &::after {
        left: 0;
        transition: 0.8s;
      }
    }
  }
}
.category-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    transform: scale(1);
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    transition: 0.8s;
  }
}
.category-content {
  position: absolute;
  background: #fff;
  width: 75%;
  padding: 20px 25px;
  padding-right: 15px;
  bottom: 0px;
  transform: translateY(70%);
  // backface-visibility: hidden; //文字抖動
  right: 0;
  z-index: 1;
}
.category-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 800;
  padding-bottom: 15px;
  overflow: hidden;
  position: relative;
  color: #000;
  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 300%;
    height: 2px;
    background: linear-gradient(
      to right,
      #000 0,
      #000 33.333%,
      #fff 33.333%,
      #fff 66.666%,
      #000 66.666%,
      #000 100%
    );
    bottom: 0;
    left: -200%;
  }
}
</style>
