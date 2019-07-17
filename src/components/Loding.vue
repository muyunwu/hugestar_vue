<template>
  <div class="bg">
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  position: fixed;
}
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
</style>

