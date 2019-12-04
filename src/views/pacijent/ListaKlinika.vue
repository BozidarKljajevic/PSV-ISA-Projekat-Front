<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <b-container class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Klinike</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group" v-for="klinika in klinike" :key="klinika.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label>Naziv</label>
                <label class="form-control">{{klinika.naziv}}</label>
                <label>Grad</label>
                <label class="form-control">{{klinika.grad}}</label>
                <label>Broj Telefona</label>
                <label class="form-control">{{klinika.brojTelefona}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Adresa</label>
                <label class="form-control">{{klinika.adresa}}</label>
                <label>Drzava</label>
                <label class="form-control">{{klinika.drzava}}</label>
                <label>Ocena</label>
                <label class="form-control">{{klinika.ocena}}</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label>Opis</label>
                <label class="form-control">{{klinika.opis}}</label>
              </div>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      klinike: []
    };
  },
  mounted() {
      axios
      .get("http://localhost:8080/klinika/sveKlinike")
      .then(klinike => {
        this.klinike = klinike.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>