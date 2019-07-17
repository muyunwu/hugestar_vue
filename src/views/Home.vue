<template>
  <div class="page">
    <transition name="fade">
      <productModal :id="productId" @close="closeProduct" v-if="productId"/>
    </transition>
    <homeBanner :bannerList="bannerList"></homeBanner>
    <div class="home-products">
      <h2>NEW ARRIVAL</h2>
      <newArrival @openModal="openProduct"/>
    </div>
    <div class="home-category">
      <div class="wrapper">
        <div class="row">
          <h2>CATEGORIES</h2>
          <ul class="products-list">
            <li class="category-layout" v-for="category in categories" :key="category.key">
              <router-link
                class="category-item"
                :to="{
                  name:'products',
                  params:{
                    category:category.category,
                  }
                }"
              >
                <div class="category-image">
                  <img :src="category.image[0]" alt>
                </div>
                <div class="category-content">
                  <h3 class="category-title">{{category.category}}</h3>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="home-reserve">
      <div class="wrapper">
        <div class="reserve-bg">
          <div class="overlay"></div>
          <div class="reserve-content">
            <h2>RESERVE</h2>
            <div class="text-fade"></div>
            <ul class="reserve-steps">
              <li class="step">1. Lorem ipsum dolor</li>
              <li class="step">2. Lorem ipsum, dolor sit amet consectetur adipisicing.</li>
              <li class="step">3. Lorem ipsum dolor sit amet consectetur.</li>
              <li class="step">4. Lorem ipsum dolor sit amet.</li>
              <li class="step">5. Lorem ipsum dolor sit</li>
            </ul>
            <div class="btn-group">
              <router-link to="/reserve" class="link">
                <span>LET'S GO</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import homeBanner from "../components/Homebanner.vue";
import newArrival from "../components/Newarrival.vue";
import product from "../components/Products";
import productModal from "../components/Productmodal";
export default {
  name: "home",
  components: { homeBanner, product, newArrival, productModal },
  data() {
    return {
      bannerList: [
        {
          imgUrl: require("../assets/banner/lax-photo_l.jpg"),
          title: "BEAUTY"
        },
        {
          imgUrl: require("../assets/banner/wr_hero_DFevent-41_HR.jpg"),
          title: "SIMPLE"
        },
        {
          imgUrl: require("../assets/banner/Reznor_Starmore-Office-L-1.jpg"),
          title: "CLEAN"
        }
      ],
      productId: ""
    };
  },
  computed: {
    ...mapGetters(["categories"])
  },
  methods: {
    openProduct(id) {
      this.productId = id;
    },
    closeProduct() {
      this.productId = "";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #363636;
  margin: 45px 0;
}
.home-products {
  background: #fff;
}

.home-reserve {
  padding: 50px 0;
  color: #fff;
  .reserve-bg {
    position: relative;
    background: url("../assets/henry-co-180108-unsplash.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    padding: 30px 0;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
    z-index: 1;
  }

  h2 {
    color: #fff;
    // margin-bottom: 15px;
  }
}
.reserve-content {
  position: relative;
  z-index: 2;
}
.reserve-steps {
  width: 55%;
  margin: 0 auto;
}
.step {
  margin-bottom: 35px;
  font-size: 16px;
  font-weight: 100;
  position: relative;
}
.text-fade {
  width: 1px;
  height: 25px;
  margin: -10px auto 25px;
  background: #fff;
  opacity: 0.6;
}
.product-item {
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.2);
}
.link {
  font-size: 22px;
  border-bottom: 1px solid transparent;
  padding-bottom: 5px;
  &:hover {
    border-bottom: 1px solid #fff;
  }
}
</style>

