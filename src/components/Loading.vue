<template>
  <div class="loading" :class="[isLoad]"></div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLoad() {
      if (this.isLoading === true) return "isLoad";
      else return "";
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  position: fixed;
  height: 100vh;
}
.loading {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100vh;
  transition: 1.75s 0.5s ease-out;
  z-index: 9000;
  background-color: #fff;
  transform-origin: top;
  bottom: 0;
  &.isLoad {
    height: 0;
  }
}
</style>
