<template>
  <vue-cal selected-date="2019-12-21"
         :time-from="6 * 60"
         :time-to="23 * 60"
         :disable-views="['years']"
         :events="events">
  </vue-cal>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
    components: { VueCal },
    data: () => ({
      events: [
    {
      start: '',
      //end: '',
      
      //class: 'kartica',
      // You can also define event dates with Javascript Date objects:
      // startDate: new Date(2018, 11 - 1, 16, 10, 30),
      // endDate: new Date(2018, 11 - 1, 16, 11, 30),
      //title: 'Doctor appointment',
    }
    ]
    }),

    mounted() {
    if (this.$store.state.user.role.authority == "LEKAR") {
      axios
        .get("/lekar/obavezeLekara/"+
            this.$store.state.user.id, this.start)
        .then(events => {
          this.events=events.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>



<style>
.vuecal__event.kartica {background-color: rgba(255, 10, 10, 0.9);border: 1px solid rgb(233, 13, 10);color: #fff;}
</style>