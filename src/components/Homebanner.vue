<template>
  <div class="home-banner">
    <div class="banner-ctrlgroup">
      <a href="#" class="ctrl ctrl--prev" @click.prevent="prev">PREV</a>
      <a href="#" class="ctrl ctrl--next" @click.prevent="next">NEXT</a>
    </div>

    <slick
      ref="slick"
      :options="slickOptions"
      @afterChange="handleAfterChange"
      @beforeChange="handleBeforeChange"
    >
      <div class="home-banner__bg" v-for="(banner,idx) in bannerList" :key="idx">
        <div class="home-banner__img" ref="banner">
          <img :src="banner.imgUrl" alt>
        </div>
        <div class="home-banner__content">
          <div class="wrapper">
            <div class="home-banner__text">
              <h2>
                <span class="banner-title">{{banner.title}}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </slick>
  </div>
</template>
<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
export default {
  name: "homeBanner",
  components: { Slick },
  props: {
    bannerList: {
      type: Array
    }
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        draggable: false,
        arrows: false,
        speed: 1400,
        cssEase: "ease-in-out"
      }
    };
  },
  computed: {
    lastSlide() {
      return this.bannerList.length - 1;
    }
  },
  methods: {
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    prev() {
      this.$refs.slick.prev();
    },
    next() {
      this.$refs.slick.next();
    },
    handleAfterChange(event, slick, currentSlide) {
      let clone = document.getElementsByClassName("slick-cloned");
      for (let i = 0; i < clone.length; i++) {
        if (clone[i].classList.contains("slick-clone-active")) {
          console.log("after", currentSlide);
          clone[i].classList.remove("slick-clone-active");
        }
      }
    },
    handleBeforeChange(event, slick, currentSlide, nextSlide) {
      const vm = this;
      // console.log("currentSlide:", currentSlide, "nextSlide", nextSlide);
      if (currentSlide === 0 || currentSlide === vm.lastSlide) {
        let clone = document.getElementsByClassName("slick-cloned");
        for (let i = 0; i < clone.length; i++) {
          clone[i].classList.add("slick-clone-active");
        }
      }
    }
  },
  mounted() {
    this.reInit();
  }
};
</script>
<style lang="scss" scoped>
.home-banner {
  min-height: 500px;
  height: 100vh;
  position: relative;
}
.home-banner__bg {
  height: 100vh;
  min-height: 500px;
  vertical-align: bottom;
  position: relative;
  opacity: 0;
  transform: scale(0.65) !important;
  transition: all 1.2s ease-in-out;
}
.home-banner__img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.12);
    transition: 2.5s ease-in;
    filter: brightness(65%);
  }
}
.slick-active .home-banner__bg,
.slick-clone-active .home-banner__bg {
  opacity: 1;
  transform: scale(1) !important;
  img {
    transform: scale(1);
  }
}

.home-banner__content {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  min-height: 500px;
  width: 100%;
  z-index: 500;
  .wrapper {
    height: 100%;
  }
}
.home-banner__text {
  position: absolute;
  left: 5%;
  bottom: 35%;
  font-size: 60px;
  color: #fff;
  letter-spacing: 5px;
}
.banner-title {
  font-weight: bold;
  margin: 15px;
}
.banner-text {
  font-weight: lighter;
}
.banner-ctrlgroup {
  position: absolute;
  color: #fff;
  z-index: 200;
  font-size: 20px;
  bottom: 30%;
  right: 15%;
  z-index: 200;
}

.ctrl {
  color: #fff;
  font-size: 22px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  display: inline-block;
  border: 1px solid transparent;
  transition: border 1.2s;
  & + & {
    margin-left: 5px;
  }
  &:hover {
    border: 1px solid #f3f3f3;
  }
}
</style>

