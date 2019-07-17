<template>
  <div class="login-bg">
    <div class="overlay"></div>

    <div class="login-box">
      <div class="logo"></div>
      <form @submit.prevent="login">
        <span class="input-text">EMAIL</span>
        <input type="text" v-model="user.username">
        <span class="input-text">PASSWORD</span>
        <input type="password" v-model="user.password">
        <button>LOGIN</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const vm = this;
      const API = `${process.env.VUE_APP_PATH}/signin`;
      this.$http.post(API, vm.user).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: url("../assets/Original1227-pendant-banner.jpg");
  background-size: cover;
  filter: grayscale(100%);
}
.login-video {
  position: absolute;
  width: 100%;
  height: 100%;

  overflow: hidden;
  video {
    min-width: 100%;
    min-height: 100%;
  }
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
}
.login-box {
  position: relative;
  width: 320px;
  z-index: 100;
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    border: 1px solid #fff;
    padding: 10px 20px;
    margin-bottom: 15px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.15);
    font-size: 18px;
    color: #fff;
    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.25);
    }
  }
  .input-text {
    color: #eee;
    margin-bottom: 5px;
    margin-left: 12px;
  }
  button {
    padding: 10px 20px;
    margin-bottom: 15px;
    border-radius: 100px;
    font-size: 18px;
    background: #fc4a1a; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f7b733,
      #fc4a1a
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f7b733,
      #fc4a1a
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-weight: bold;
  }
}
</style>