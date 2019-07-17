<template>
  <div class="reservation">
    <div class="wrapper">
      <div class="reserve-group">
        <div class="reserve-calender">
          <h2>RESERVATION</h2>
          <vuejs-datepicker
            v-model="date"
            :format="customFormatter"
            :disabledDates="disableDates"
            :inline="true"
            :maximum-view="'day'"
          ></vuejs-datepicker>
        </div>
        <div class="reserve-form">
          <table>
            <tr>
              <th>
                <label for="reserve-name">Name</label>
              </th>
              <td>
                <input
                  type="text"
                  id="reserve-name"
                  name="Name"
                  v-validate="'required'"
                  v-model="name"
                >
                <span class="validate">{{ errors.first('Name') }}</span>
              </td>
            </tr>
            <tr>
              <th>
                <label for="reserve-phone">Phone</label>
              </th>
              <td>
                <input
                  type="tel"
                  id="reserve-phone"
                  name="Phone"
                  v-validate="'required|numeric|length:10'"
                  v-model="phone"
                >
                <span class="validate">{{ errors.first('Phone') }}</span>
              </td>
            </tr>
            <tr>
              <th>
                <label for="reserve-email">Email</label>
              </th>
              <td>
                <input
                  type="text"
                  id="reserve-email"
                  name="Email"
                  v-validate="'required|email'"
                  v-model="email"
                >
                <span class="validate">{{ errors.first('Email') }}</span>
              </td>
            </tr>
            <tr>
              <th>
                <label for="reserve-address">Address</label>
              </th>
              <td>
                <input
                  type="text"
                  id="reserve-address"
                  name="Address"
                  v-validate="'required'"
                  v-model="address"
                >
                <span class="validate">{{ errors.first('Address') }}</span>
              </td>
            </tr>
            <tr>
              <th>
                <label for="reserve-date">Date</label>
              </th>
              <td>
                <input
                  type="text"
                  id="reserve-date"
                  :value="formateDate"
                  placeholder="Please check left calender"
                  name="Date"
                  v-validate="'required'"
                >
                <span class="validate">{{ errors.first('Date') }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <textarea name id cols="30" rows="10" placeholder="message" v-model="message"></textarea>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <button
                  class="reserve-btn"
                  @click.prevent="submit"
                  :class="[isSubmit? 'active':'']"
                >
                  <span>SUBMIT</span>
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    "vuejs-datepicker": Datepicker
  },
  data() {
    return {
      date: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      disableDates: {
        to: new Date(),
        days: [6, 0]
      },
      isSubmit: false
    };
  },
  methods: {
    customFormatter(date) {
      return moment(date).format("MMMM D YYYY");
    },
    async submit() {
      const vm = this;
      const isValid = await this.$validator.validate();
      if (isValid) {
        // ABORT!!
        this.isSubmit = true;
        setTimeout(function() {
          vm.date = "";
          vm.name = "";
          vm.email = "";
          vm.phone = "";
          vm.address = "";
          vm.message = "";
          vm.isSubmit = false;
          vm.$validator.reset();
        }, 2000);
      }
    }
  },
  computed: {
    formateDate() {
      if (this.date === "") return "";
      return moment(this.date).format("MMMM D YYYY");
    }
  }
};
</script>
<style lang="scss" scoped>
.validate {
  font-size: 12px;
  position: absolute;
  bottom: -20px;
  right: 0;
}
h2 {
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 35px;
  padding-left: 40px;
  // text-align: center;
}
.reservation {
  padding: 160px 0 100px;
}
.reserve-group {
  display: flex;
  align-items: flex-start;
}
.reserve-form {
  color: #333;
  padding-left: 25px;
  flex: 4;
  input {
    color: #000;
    width: 100%;
  }
  table {
    width: 100%;
  }
  th {
    text-align: left;
    width: 80px;
  }
  tr {
    border-bottom: 1px solid #444;
    &:last-child {
      border: 0;
    }
  }
  td,
  th {
    position: relative;
    padding: 25px 0 10px 0;
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 5px;
    border-color: #333;
    outline: 0;
    font-weight: normal;
    &::placeholder {
      color: #ddd;
      font-size: 16px;
    }
    color: #000;
  }
}
.reserve-calender {
  padding-right: 25px;
  flex: 6;
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
.reserve-btn {
  color: #000;
  font-weight: 700;
  width: 100%;
  border: 3px solid #000;
  overflow: hidden;
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  font-size: 20px;
  span {
    display: inline-block;
    position: relative;
    z-index: 2;
    padding: 15px 25px;
    transition: 0.3s;
    &::after {
      display: inline-block;
      content: "THANK YOU !!";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      top: 100%;
      padding: 15px 0;
      box-sizing: border-box;
      width: 150%;
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
    width: 1000px;
    height: 1000px;
    transform: scale(0);
    background: #000;
    top: -500px;
    left: -500px;
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

