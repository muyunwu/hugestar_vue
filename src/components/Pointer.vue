<template>
  <div id="pointer" :style="{left:x,top:y}"></div>
</template>
<script>
export default {
  name: "pointer",
  props: {
    mouseX: {
      type: Number,
      default: 100
    },
    mouseY: {
      type: Number,
      default: 100
    }
  },
  computed: {
    x() {
      return this.mouseX + "px";
    },
    y() {
      return this.mouseY + "px";
    }
  }
};
</script>
<style lang="scss" scoped>
#pointer {
  // mix-blend-mode: difference;
  position: absolute;
  z-index: 9999;
  width: 15px;
  height: 15px;
  background-color: #333;
  opacity: 0.8;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>

