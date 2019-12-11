<template>
  <b-container style="margin-top: 20px">
    <div>
      <h1 class="justify-content-center">{{poruka}}</h1>
    </div>
    <div>
      <router-link
        to="/"
        tag="button"
        class="btn btn-success btn-block z-depth-2 mt-4"
        v-if="prikazi_dugme"
      >Pcetna stranica</router-link>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      code: "",
      poruka: "Vas nalog je u procesu aktiviranja",
      prikazi_dugme: false
    };
  },
  mounted() {
    this.code = this.$route.params.code;
    this.poruka = "Vas nalog je u procesu aktiviranja";
    this.prikazi_dugme = false;

    axios
      .post("/auth/activate/" + this.code)
      .then(() => {
        this.poruka = "Vas nalog je uspesno aktiviran";
        this.prikazi_dugme = true;
      })
      .catch(error => {
        this.poruka = "Doslo je do greske prilikom aktivacije vaseg naloga";
        console.log(error);
      });
  }
};
</script>

<style>
</style>