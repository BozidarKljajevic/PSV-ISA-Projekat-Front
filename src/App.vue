<template>

  <div id="app">
    <app-navbar></app-navbar>
    <router-view />
  </div>


</template>
<script>
import NavBar from "@/components/NavBar.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  components: {
    "app-navbar": NavBar
  },
  mounted() {
    if (localStorage.getItem("jwt") != undefined) {
      this.$store.state.user = VueJwtDecode.decode(localStorage.getItem("jwt"));
    }
  }
};
</script>

<style>
</style>
