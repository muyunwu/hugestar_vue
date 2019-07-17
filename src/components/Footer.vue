<template>
  <footer id="footer">
    <div class="wrapper">
      <div class="subscribe-content">
        <label class="subscribe-group">
          <span class="subscribe-text">Want to hear news from us?</span>
          <input
            type="email"
            placeholder="Your email address"
            v-model="email"
            name="Email"
            v-validate="'required|email'"
          >
          <span class="validate">{{ errors.first('Email') }}</span>
          <button
            class="btn subscribe"
            @click.prevent="subscribe"
            :class="[isSubmit? 'active': '']"
          >
            <span>SUBSCRIBE</span>
          </button>
        </label>
      </div>
      <div>
        <img src alt>
      </div>
      <div class="media-content">
        <span>Follow us</span>
        <a href class="media">
          <span>
            <font-awesome-icon :icon="['fab','facebook-f']"/>
          </span>
        </a>
        <a href class="media">
          <span>
            <font-awesome-icon :icon="['fab','instagram']"/>
          </span>
        </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      isSubmit: false
    };
  },
  methods: {
    async subscribe() {
      const vm = this;
      const isValid = await this.$validator.validate();
      if (isValid) {
        // ABORT!!
        this.isSubmit = true;
        setTimeout(function() {
          vm.email = "";
          vm.isSubmit = false;
          vm.$validator.reset();
        }, 2000);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#footer {
  background: #f3efec;
  padding: 80px 0;
  color: #7f7f7f;
  font-size: 14px;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.subscribe-content {
  color: #7f7f7f;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.subscribe-group {
  display: flex;
  position: relative;
  input {
    background: #fff;
    font-size: 16px;
    padding: 10px;
    width: 250px;
    &::placeholder {
      color: #7f7f7f;
    }
  }
}
.validate {
  position: absolute;
  left: 0;
  bottom: -20px;
  font-size: 12px;
}
.subscribe-text {
  position: absolute;
  top: -30px;
  left: 0;
}
.media-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.media {
  background: #fff;
  border-radius: 50%;
  display: inline-flex;
  width: 35px;
  height: 35px;
  color: #000;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  position: relative;
  overflow: hidden;
  transition: 0.5s;
  &::after {
    display: block;
    content: "";
    position: absolute;
    background: #000;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    top: -50px;
    left: -50px;
    transform: scale(0);
    transition: 0.5s;
  }
  span {
    position: relative;
    z-index: 2;
  }
  &:hover {
    color: #fff;
    &::after {
      transform: scale(1);
    }
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.btn.subscribe {
  border-radius: 0;
  border: 2px solid #000;
  padding: 0;
  transition: 0.3s;
  width: 150px;
  span {
    display: inline-block;
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 15px 0px;
    transition: 0.3s;
    &::after {
      display: inline-block;
      content: "THANK YOU !!";
      position: absolute;
      left: 0;
      height: 100%;
      width: 100%;
      top: 100%;
      padding: 15px 25px;
      box-sizing: border-box;
    }
  }
  &.active {
    color: #fff;
    &:after {
      transform: scale(1);
    }
    span {
      transform: translateY(-100%);
      &::after {
        animation-name: blink;
        animation-duration: 1.2s;
        animation-delay: 0.3s;
      }
    }
  }
  &:after {
    display: block;
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    transform: scale(0);
    background: #000;
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
</style>
