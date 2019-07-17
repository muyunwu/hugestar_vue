<template>
  <div class="new-arrival" v-if="newArrival">
    <div class="product">
      <div class="slider-track">
        <a href="#" class="slider-ctrl" @click.prevent="prev">
          <font-awesome-icon icon="arrow-left"/>
        </a>
        <a href="#" class="slider-ctrl next" @click.prevent="next">
          <font-awesome-icon icon="arrow-right"/>
        </a>
        <div class="slider-list" :style="{width:listWidth,left:listLeft,'transition':transiton}">
          <template v-if="cloneFirst">
            <div
              class="slider-item"
              :style="{width:itemWidth,'opacity': currentIndex === -1 ? 1 :0}"
            >
              <div class="product-image">
                <img :src="cloneLast.image[0]" alt>
              </div>
              <div class="product-content">
                <div class="product-category">{{cloneLast.category}}</div>
                <div class="product-title">{{cloneLast.title}}</div>
              </div>
            </div>
          </template>

          <!-- <router-link to></router-link> -->
          <div
            class="slider-item"
            v-for="(arrival,idx) in newArrival"
            :key="arrival.key"
            :style="{ 
                  width:itemWidth,
                  'opacity': 
                   currentIndex === -1  ?  1 : currentIndex === newArrival.length ? 1 : currentIndex === idx ? 1 : 0}"
          >
            <a class="product-item" href="#" @click.prevent="openProduct(arrival.id)">
              <div class="product-image">
                <div class="product-image">
                  <img :src="arrival.image[0]" alt>
                </div>
              </div>
              <div class="product-content">
                <div class="product-category">{{arrival.category}}</div>
                <div class="product-title">{{arrival.title}}</div>
              </div>
            </a>
          </div>

          <template v-if="cloneLast">
            <div
              class="slider-item"
              :style="{width:itemWidth,'opacity': currentIndex === newArrival.length ? 1 :0}"
            >
              <div class="product-image">
                <!-- <img :src="cloneFirst.image[0]" alt> -->
              </div>
              <div class="product-content">
                <div class="product-category">{{cloneFirst.category}}</div>
                <div class="product-title">{{cloneFirst.title}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="image">
      <div
        class="image-item"
        v-for="(img,idx) in newArrival"
        :style="{backgroundImage: `url(${img.image[img.image.length-1]})`,'opacity':idx===index ? 1:0,'transition':`${speed/1000}s`} "
        :key="img.id"
      ></div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      active: false,
      speed: 300,
      delay: 0,
      ease: "ease-in",
      currentIndex: 0,
      nextIndex: 0,
      befroeIndex: 0,
      opacity: 0
    };
  },
  computed: {
    ...mapGetters(["newArrival"]),
    transiton() {
      if (this.active === true) {
        return `${this.speed / 1000}s ${this.delay / 1000}s ${this.ease}`;
      } else {
        return "";
      }
    },
    cloneFirst() {
      return this.newArrival[0];
    },
    cloneLast() {
      return this.newArrival[this.newArrival.length - 1];
    },
    listWidth() {
      return `${(this.newArrival.length + 2) * 100}% `;
    },
    listLeft() {
      return `${-100 - this.currentIndex * 100}%`;
    },
    itemWidth() {
      return `${100 / (this.newArrival.length + 2)}%`;
    },
    index() {
      let index = this.currentIndex;
      if (this.currentIndex === -1) {
        index = this.newArrival.length - 1;
      }
      if (this.currentIndex === this.newArrival.length) {
        index = 0;
      }
      return index;
    }
  },
  methods: {
    openProduct(id) {
      // console.log(id);
      this.$emit("openModal", id);
    },
    closeProduct() {
      this.id = "";
    },
    next() {
      const vm = this;
      if (!vm.active) {
        vm.active = true;
        vm.befroeIndex = vm.currentIndex;
        vm.currentIndex += 1;
        vm.nextIndex = vm.currentIndex + 1;
        setTimeout(() => {
          if (vm.currentIndex == vm.newArrival.length) {
            vm.currentIndex = 0;
          }
          vm.active = false;
        }, vm.speed);
      }
    },
    prev() {
      const vm = this;
      if (!vm.active) {
        vm.active = true;
        vm.befroeIndex = vm.currentIndex;
        vm.currentIndex -= 1;
        vm.nextIndex = vm.currentIndex - 1;
        setTimeout(() => {
          if (vm.currentIndex == -1) {
            vm.currentIndex = vm.newArrival.length - 1;
          }
          vm.active = false;
        }, vm.speed);
      }
    }
  },
  mounted() {
    // const vm = this;
    // const API = `${process.env.VUE_APP_PATH}/api/${
    //   process.env.VUE_APP_TOKEN
    // }/products/all`;
    // this.$http.get(API).then(res => {
    //   if (res.data.success) {
    //     vm.newArrival = res.data.products.filter((item, idx, arr) => {
    //       return idx > arr.length - 4 && idx <= arr.length;
    //     });
    //     vm.isload = true;
    //   }
    // });
  }
};
</script>
<style lang="scss" scoped>
.new-arrival {
  display: flex;
  background: #f6f6f6;
  min-height: calc(100vh - 86px);
}
.product {
  width: 50%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image {
  width: 50%;
  position: relative;
}
.image-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.slider-track {
  width: 80%;
  overflow: hidden;
  position: relative;
}
.slider-ctrl {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #363636;
  font-size: 18px;
  font-weight: bold;
  z-index: 2;
  transition: 0.3s;
  &:hover {
    color: #000;
  }
  &.next {
    right: 0;
  }
}
.slider-list {
  position: relative;
  top: 0;
  &::after {
    display: table;
    content: "";
    clear: both;
  }
}
.product-item {
  display: block;
  &:hover {
    img {
      transform: scale(1.12);
    }
  }
}
.slider-item {
  opacity: 0;
  float: left;
  transition: 0.6s 0.1s;
  padding: 0 30px;
}
.product-image {
  overflow: hidden;
  img {
    transition: 0.8s;
    width: 100%;
    vertical-align: top;
  }
}
.product-content {
  text-align: center;
  font-size: 16px;
  color: #000;
}
.product-category {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
}
</style>