<template>
  <div class="product">
    <transition name="fade">
      <productModal :id="id" @close="closeProduct" v-if="id"/>
    </transition>
    <!-- <loading :isLoading="isLoading"/> -->
    <main>
      <div class="wrapper">
        <div class="row clearfix">
          <div class="filter-group">
            <div class="filter--other">
              <div class="radio-group">
                <label class="radio">
                  <input type="radio" name="filter" v-model.number="filter" value="0">
                  <span>LATEST</span>
                </label>
                <label class="radio">
                  <input type="radio" name="filter" v-model.number="filter" value="1">
                  <span>OLDEST</span>
                </label>
              </div>
              <div class="radio-group">
                <label class="radio">
                  <input type="radio" name="filter" v-model.number="filter" value="2">
                  <span>LOW TO HIGH</span>
                </label>
                <label class="radio">
                  <input type="radio" name="filter" v-model.number="filter" value="3">
                  <span>HIGH TO LOW</span>
                </label>
              </div>
            </div>
            <div class="filter--category">
              <h3>Category</h3>
              <ul class="filter-list">
                <li class="filter-item" :class="[category === 'All'  ? 'active' : '']">
                  <router-link to="/products">
                    <span class="filter-icon"></span>
                    <span class="filter-text">All</span>
                    <span class="filter-total">({{total}})</span>
                  </router-link>
                </li>
                <li
                  v-for="(item,idx) in categories"
                  :key="idx"
                  class="filter-item"
                  :class="[category === item.category ? 'active' : '']"
                >
                  <router-link
                    :to="{
                    name:'products',
                    params:{
                        category:item.category,
                    }
                }"
                  >
                    <span class="filter-icon"></span>
                    <span class="filter-text">{{item.category}}</span>
                    <span class="filter-total">({{item.total}})</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <ul class="products-list">
            <li
              class="product-layout"
              v-for="product in filterProduct"
              :key="product.id"
              v-tilt="{scale:1.05}"
            >
              <a @click.prevent="openProduct(product.id)">
                <product :product="product" :category="category"></product>
              </a>
            </li>
            <li class="no-matches" v-if="filterCategory.length === 0
            ">
              <span>Sorry, Nothing Matches '{{q}}'</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import product from "../components/Products";
import productModal from "../components/Productmodal";
import { mapGetters, mapState } from "vuex";
export default {
  name: "prodcutPage",
  components: { product, productModal },
  props: {
    category: {
      type: String,
      default: "All"
    },
    q: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLoading: false,
      filter: 0,
      id: ""
    };
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["categories"]),
    total() {
      let total = 0;
      this.categories.forEach(item => {
        total += item.total;
      });
      return total;
    },
    filterProduct() {
      const vm = this;
      if (vm.filter === 0) {
        return vm.filterCategory;
      }
      if (vm.filter === 1) {
        let filterCategory = vm.filterCategory.slice();
        return filterCategory.reverse();
      }
      if (vm.filter === 2) {
        let filterCategory = vm.filterCategory.slice();
        return filterCategory.sort(function(a, b) {
          return a.price - b.price;
        });
      }
      if (vm.filter === 3) {
        let filterCategory = vm.filterCategory.slice();
        return filterCategory.sort(function(a, b) {
          return b.price - a.price;
        });
      }
    },
    filterCategory() {
      const vm = this;
      if (vm.category === "All") {
        if (!vm.q) return vm.products;
        else {
          let result = vm.products.filter(item => {
            let index = item.title
              .toLowerCase()
              .indexOf(vm.q.toLowerCase().trim());
            return index != -1;
          });
          return result;
        }
      } else {
        let result = vm.products.filter(item => {
          return item.category === vm.category;
        });
        return result;
      }
    }
  },
  methods: {
    openProduct(id) {
      this.id = id;
    },
    closeProduct() {
      this.id = "";
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.filter-group {
  padding: 0 15px;
  float: left;
  width: 33.333%;
  a {
    color: #333;
    transition: 0.5s;
    &:hover {
      color: #000;
    }
  }
  h3 {
    font-size: 16px;
    font-weight: bold;
    padding-top: 25px;
    border-top: 1px solid #e6e6e6;
  }
}
.filter-list {
  border-bottom: 1px solid #e6e6e6;
}
.no-matches {
  font-size: 22px;
  color: #333;
}
.filter-item {
  margin: 25px 0;
  display: flex;
  align-items: center;
  font-size: 13px;
  a {
    width: 100%;
  }
  &:hover {
    .filter-icon {
      border: 1px solid #000;
    }
  }
  &.active {
    color: #000;
    font-weight: bold;
    .filter-icon {
      border: 1px solid #000;
      &::after {
        display: block;
      }
    }
  }
}
.filter-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #e6e6e6;
  margin-right: 15px;
  transition: 0.5s;
  position: relative;
  &::after {
    display: none;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: #000;
  }
}
.filter-text {
  font-size: 14px;
}
.filter-total {
  font-size: 13px;
  margin-left: 5px;
}
.products-list {
  width: 66.666%;
  float: left;
  padding: 0 15px;
}
.product-layout {
  width: 50%;
}
.filter--other {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  flex-wrap: wrap;
}
.radio-group {
  background: #f1f1f1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  margin-bottom: 15px;
  padding: 5px;
  .radio + .radio {
    margin-left: 5px;
  }
  input {
    display: none;
    &:checked + span {
      background: #fff;
    }
  }
  span {
    display: block;
    cursor: pointer;
    border-radius: 100px;
    padding: 5px 10px;
    transition: 0.3s;
  }
}
</style>                       