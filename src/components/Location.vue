<template>
  <div class="location">
    <h2>LOCATION</h2>
    <ul class="store-list">
      <li class="store-list__item" v-for="store in stores" :key="store.id">
        <div class="store-content">
          <h3 class="store-title">{{store.site}}</h3>
          <div class="store-location">{{store.location}}</div>
          <div class="store-time">
            <span class="store-day">EVERY DAY</span>
            <span>{{store.startTime}}</span> -
            <span>{{store.endTime}}</span>
          </div>
          <a :href="store.mapUrl" class="store-link" _blank>GET DIRECTIONS</a>
        </div>
        <div class="store-img">
          <img :src="imgUrl" alt>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stores: [
        {
          id: 0,
          site: "中壢",
          location: "中壢區中美路二段93號1F",
          startTime: "8am",
          endTime: "6pm",
          imgUrl: "",
          mapUrl: ""
        },
        {
          id: 1,
          site: "桃園",
          location: "中壢區中美路二段93號1F",
          startTime: "9am",
          endTime: "6pm",
          imgUrl: "",
          mapUrl: ""
        },
        {
          id: 2,
          site: "台北",
          location: "中壢區中美路二段93號1F",
          startTime: "10am",
          endTime: "7pm",
          imgUrl: "",
          mapUrl: ""
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.location {
  padding-top: 100px;
  width: 35vw;
  float: right;
}
.location h2 {
  text-align: left;
  font-size: 28px;
  padding: 25px;
}
.store-list__item {
  transition: 1.2s;
  text-align: left;
  padding: 25px;
  font-size: 16px;
  &:hover {
    background: #f1f1f1;
  }
}
.store-title {
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 13px;
}
.store-location {
  margin-bottom: 12px;
}
.store-time {
  margin-bottom: 15px;
}
.store-day {
  color: #b8b8b7;
  font-size: 12px;
  margin-right: 10px;
}
.store-link {
  text-decoration: underline;
  color: #b8b8b7;
  transition: 1.2s;
  font-size: 13px;
  &:hover {
    color: #4f4f4d;
  }
}
</style>
