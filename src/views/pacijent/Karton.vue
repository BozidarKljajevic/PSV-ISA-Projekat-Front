<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <b-container class="card" style="width: 60%">
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h1 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Zakazani pregedi</h1>
        </div>
      </div>

      <b-card
        border-variant="danger"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center"
        class="mt-4"
        v-for="pregled in pregledi"
        :key="pregled.id"
        :header="pregled.lekar.klinika.naziv"
      >
        <div class="row">
          <div class="col">
            <div class="md-form">
              <label>Pregled</label>
              <label class="form-control">{{pregled.tipPregleda.naziv}}</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form pb-3">
             <label>Sala</label>
              <label class="form-control">{{pregled.sala.naziv}}</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form pb-3">
              <label>Doktor</label>
              <label class="form-control">{{pregled.lekar.ime}}</label>
            </div>
          </div>
          <label class="form-control">{{pregled.datum}} - {{pregled.vreme}}</label>
          <div class="row">
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pregledi: []
    };
  },
  mounted(){
    axios
        .get("pregled/zakzaniPregledi/"+this.$store.state.user.id)
        .then(response => {
          console.log(response.data);
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  }
};
</script>

<style>
</style>