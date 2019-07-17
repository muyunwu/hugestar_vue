<template>
  <div class="product-modal">
    <div class="product-modal-content" v-if="isOpen">
      <a @click.prevent="closeModal" class="close-btn">
        <font-awesome-icon icon="times"/>
      </a>
      <div class="product-img">
        <div class="lg-list">
          <transition v-for="(item,idx) in product.image" :key="item.key" name="fade">
            <div class="product-img__lg" v-show="idx ==currentIndex">
              <img :src="item" alt>
            </div>
          </transition>
        </div>

        <ul class="product-anchor-list">
          <li class="product-anchor" v-for="(item,idx) in product.image" :key="item.id">
            <a href="#" @click.prevent="changeImg(idx)">
              <img :src="item" alt>
            </a>
          </li>
        </ul>
      </div>
      <div class="product-content">
        <div class="product-heading">
          <div class="product-category">{{product.category}}</div>
          <h3 class="product-title">{{product.title}}</h3>
        </div>

        <div class="product-description">{{ product.content}}</div>

        <div class="product-bot">
          <div class="price-qty">
            <div class="price">
              <span class="currency">NT</span>
              <span>{{product.price}}</span>
            </div>
            <div class="qty">
              <span class="qty-text">Qty</span>
              <div class="qty-group">
                <button class="qty-btn" @click="minus" :disabled="qty==1">
                  <font-awesome-icon icon="minus"/>
                </button>
                <input type="number" class="qty-num" v-model="qty" min="0" max="10" @keyup="input">
                <button class="qty-btn" @click="plus" :disabled="qty>=10">
                  <font-awesome-icon icon="plus"/>
                </button>
              </div>
            </div>
          </div>
          <button class="cart-btn" @click="addCart">Add to Cart</button>
        </div>
      </div>
    </div>
    <div class="lds-ripple" v-else>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      product: {},
      currentIndex: 0,
      qty: 1,
      isOpen: false
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(value, oldValue) {
        const vm = this;
        vm.dataId = value;
        const PRODUCTS_API = `${process.env.VUE_APP_PATH}/api/${
          process.env.VUE_APP_TOKEN
        }/product/${this.id}`;
        this.$http.get(PRODUCTS_API).then(res => {
          const product = res.data.product;
          vm.product = product;

          vm.isOpen = true;
          vm.setLoading(false);
        });
      }
    }
  },
  methods: {
    ...mapActions(["getCart"]),
    ...mapMutations(["setLoading"]),
    closeModal() {
      this.qty = 0;
      this.isOpen = false;
      this.$emit("close");
    },
    input() {
      if (parseInt(this.qty) > 10) this.qty = 10;
      if (parseInt(this.qty) < 1) this.qty = 1;
    },
    minus() {
      if (this.qty > 1) this.qty = this.qty - 1;
    },
    plus() {
      if (this.qty <= 10) this.qty = this.qty + 1;
    },
    changeImg(index) {
      this.currentIndex = index;
    },
    addCart() {
      const vm = this;
      const ADD_CART_API = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_TOKEN
      }/cart`;
      const data = {
        data: { product_id: vm.id, qty: vm.qty }
      };
      this.$http.post(ADD_CART_API, data).then(res => {
        vm.getCart();
        vm.closeModal();
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 206px;
  height: 206px;
}
.lds-ripple div {
  position: absolute;
  border: 3px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 102px;
    left: 102px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #000;
  cursor: pointer;
}
.product-modal {
  top: 0;
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background: rgba($color: #000000, $alpha: 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-modal-content {
  background: #fff;
  width: 960px;

  max-height: 95vh;
  // overflow: auto;
  position: relative;
  display: flex;
}
.product-img {
  flex: 4;
  padding: 25px;
}
.lg-list {
  position: relative;
  height: 0;
  padding-top: 100%;
  margin-bottom: 10px;
}
.product-img__lg {
  position: absolute;
  width: 100%;
  top: 0;
  img {
    width: 100%;
  }
}

.product-anchor-list {
  display: flex;
  width: 100%;
}
.product-anchor {
  flex: 1;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
  & + & {
    margin-left: 10px;
  }
  img {
    width: 100%;
    vertical-align: top;
  }
}
.product-content {
  flex: 6;
  padding: 25px;
  margin-left: -25px;
  padding-top: 55px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-category {
  font-size: 14px;
  color: #363636;
  margin-bottom: 15px;
}
.product-title {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 15px;
  margin-bottom: 25px;
  border-bottom: 1px solid #363636;
}
.product-description {
  margin-bottom: auto;
  font-size: 16px;
  line-height: 26px;
  overflow: auto;
}
.price-qty {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 25px;
}
.price,
.qty {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.currency {
  font-size: 16px;
  margin-right: 5px;
}
.qty-group {
  font-size: 14px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.qty-text {
  margin-right: 10px;
  font-size: 16px;
}
.qty-btn {
  background: transparent;
  font-size: 12px;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    color: #363636;
  }
  &:disabled {
    color: #ddd;
  }
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-num {
  appearance: none;
  width: 60px;
  text-align: center;
  //   padding: 0 25px;
  font-weight: bold;
  font-size: 14px;
}
.cart-btn {
  width: 100%;
  background-color: #000;
  color: #fff;
  border: 3px solid #000;
  transition: 0.3s;
  height: 50px;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 20px;
  &:hover {
    background: transparent;
    color: #000;
  }
}
</style>
