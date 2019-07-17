<template>
  <div class="location">
    <div class="map-content"></div>
    <div class="location-content">
      <h2>LOCATIONS</h2>
      <ul class="store-list">
        <li
          class="store-list__item"
          v-for="(store,idx) in stores"
          :key="store.id"
          :class="[selectIdx ===idx? 'active':'']"
          @click="selectIdx = idx"
        >
          <div class="store-content">
            <h3 class="store-title">{{store.site}}</h3>
            <div class="store-location">{{store.location}}</div>
            <div class="store-time">
              <span class="store-day">MON - FRI</span>
              <span>{{store.startTime}}</span> -
              <span>{{store.endTime}}</span>
            </div>
            <a :href="store.mapUrl" class="store-link" target="_blank">GET DIRECTIONS</a>
          </div>
          <div class="store-img">
            <img :src="imgUrl" alt>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import location from "../components/Location.vue";
export default {
  name: "locationpage",
  components: {},
  data() {
    return {
      selectIdx: 0,
      stores: [
        {
          id: 0,
          site: "Zhongli ",
          location:
            "No. 300, Zhongda Rd., Zhongli Dist., Taoyuan City 320, Taiwan (R.O.C.)",
          startTime: "8am",
          endTime: "6pm",
          imgUrl: "",
          mapUrl: ""
        },
        {
          id: 1,
          site: "Taoyuan",
          location:
            "No. 300, Zhongda Rd., Zhongli Dist., Taoyuan City 320, Taiwan (R.O.C.)",
          startTime: "9am",
          endTime: "6pm",
          imgUrl: "",
          mapUrl: ""
        },
        {
          id: 2,
          site: "Taipei",
          location:
            "No. 300, Zhongda Rd., Zhongli Dist., Taoyuan City 320, Taiwan (R.O.C.)",
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
  display: flex;
  padding-top: 105px;
  padding-bottom: 25px;
  min-height: 100vh;
}

.map-content {
  flex: 1;
}
.map {
  width: 100%;
  height: 100%;
}
.location-content {
  flex: 1;
}
.location-content h2 {
  text-align: left;
  font-size: 40px;
  font-weight: bold;
  padding: 25px;
}
.store-list__item {
  transition: 0.8s;
  text-align: left;
  padding: 25px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &.active {
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
