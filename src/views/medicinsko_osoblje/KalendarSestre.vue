<template>
  <vue-cal
    selected-date="2020-01-20"
    :time-from="6 * 60"
    :time-to="23 * 60"
    :disable-views="['years']"
    :events="events"
  ></vue-cal>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import axios from "axios";

export default {
  components: { VueCal },
  data: () => ({
    selectedEvent: {},
    events: []
  }),

  mounted() {
    if (this.$store.state.user.role.authority == "MEDICINSKASESTRA") {
      axios
        .get("/lekar/obavezeLekaraKodSestre/" + this.$store.state.user.id)
        .then(events => {
          this.events = events.data;
          console.log(events.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
};
</script>



<style>
.vuecal__event.kartica {
  background-color: rgba(255, 10, 10, 0.9);
  border: 1px solid rgb(233, 13, 10);
  color: #fff;
}
</style>