<template>
  <div class="cart">
    <div class="wrapper">
      <div class="cart-list">
        <h2>CART</h2>
        <table class="cart-table" v-if="cart.length!=0">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>TITLE</th>
              <th>QTY</th>
              <th>ORIGINAL</th>
              <th>FINAL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.key">
              <td>
                <img :src="item.product.image[0]" width="100" alt>
              </td>
              <td>
                <span>{{item.product.title}}</span>
              </td>
              <td>{{item.qty}}</td>
              <td>{{item.total}}</td>
              <td>{{item.final_total}}</td>
              <td>
                <button class="del-btn" @click="delCart(item.id)">DELETE</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td></td>
            <td></td>
            <td></td>
            <td class="bold">TOTAL :</td>
            <td class="bold">{{cartTotal}}</td>
            <td></td>
          </tfoot>
        </table>
        <div v-else>
          <p>Cart is Empty...</p>
          <router-link to="/products">go to buy</router-link>
        </div>
      </div>
      <div class="cart-form">
        
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["cartTotal"])
  },
  methods: {
    ...mapActions(["getCart"]),
    delCart(id) {
      const DEL_CART_API = `${process.env.VUE_APP_PATH}/api/${
        process.env.VUE_APP_TOKEN
      }/cart/${id}`;
      this.$http.delete(DEL_CART_API).then(() => {
        this.getCart();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.bold {
  font-weight: bold;
}
.cart {
  padding-top: 100px;
  background: #f3efec;
}
.wrapper {
  display: flex;
}
.cart-list {
  min-height: 500px;
  flex: 6;
  background: #fff;
  padding: 0 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
h2 {
  text-align: left;
  font-size: 40px;
  font-weight: bold;
  padding: 25px 0;
}
.cart-form {
  flex: 4;
}
.cart-table {
  th {
    font-weight: bold;
  }
  th,
  td {
    padding: 10px;
    vertical-align: middle;
    &:nth-child(1) {
      text-align: center;
    }
    &:nth-child(2) {
      text-align: left;
    }
    &:nth-child(3) {
      text-align: center;
    }
    &:nth-child(4) {
      text-align: right;
    }
    &:nth-child(5) {
      text-align: right;
    }
  }
  tfoot {
    border-top: 1px solid #333;
    td {
      padding: 15px 10px;
    }
  }
}
.del-btn {
  color: #282c34;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  border: 2px solid #282c34;
  background: transparent;
  transition: 0.2s;
  &:hover {
    background: #282c34;
    color: #fff;
  }
}
</style>