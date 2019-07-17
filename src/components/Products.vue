<template>
  <div class="product-item">
    <div class="product-image">
      <img :src="product.image[0]" alt>
    </div>
    <div class="product-content">
      <div class="product-text">
        <span class="product-category">{{product.category}}</span>
        <span class="product-title">{{product.title}}</span>
      </div>
      <div class="product-price">
        <span class="origin-price"></span>
        <span class="price">NT {{product.price}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object
    },
    idx: {
      type: Number
    }
  },
  data() {
    return {
      newclass: "new"
    };
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.product-item {
  background: #fff;
  display: block;
  position: relative;
  cursor: pointer;
  backface-visibility: hidden;
  z-index: 1;
  transition: 0.5s;
  img {
    vertical-align: top;
  }
  &:hover {
    box-shadow: 0 15px 20px -10px rgba(0, 0, 0, 0.3);
  }
}
.product-image {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
.product-content {
  padding: 10px 15px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  color: #000;
}
.product-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-right: 15px;
  line-height: 22px;
  font-size: 15px;
}
.product-price {
  display: flex;
  white-space: nowrap;
  font-size: 15px;
  line-height: 22px;
}
.product-category {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}
</style>
