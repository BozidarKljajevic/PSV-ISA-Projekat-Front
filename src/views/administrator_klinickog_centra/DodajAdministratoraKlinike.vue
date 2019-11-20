<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">

    <!--Form with header-->
    <div class="card" style="width: 60%">

      <!--Header-->
      <div class="header pt-3 grey lighten-2">

        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodavanje administratora klinike</h3>
        </div>

      </div>
      <!--Header-->



      <div class="form-group">

        <div class="card-body mx-4 mt-4">
          <div class="row">

            <div class="col">
            <div class="md-form">
              
              <label for="Form-ime">Ime</label>
              <input type="text" id="Form-ime" class="form-control" v-model="user.ime" >
              
              <label for="Form-phone">Prezime</label>
              <input type="text" id="Form-prezime" class="form-control" v-model="user.prezime" >
              
              <label for="Form-email">Mail</label>
              <input type="text" id="Form-email" class="form-control" v-model="user.mail" >
              
              <label for="Form-adresa">Adresa</label>
              <input type="text" id="Form-adresa" class="form-control" v-model="user.adresa" >
              

            </div>
            </div>
            <div class="col">
            <div class="md-form pb-3">
              <label for="Form-grad">Grad</label>
              <input type="text" id="Form-grad" class="form-control" v-model="user.grad" >
              
              <label for="Form-država">Država</label>
              <input type="text" id="Form-država" class="form-control" v-model="user.drzava" >
              
              <label for="Form-br">Broj telefona</label>
              <input type="text" id="Form-br" class="form-control" v-model="user.brojTelefona" >

              <label for="Form-klinika">Klinika</label>
              <select v-model="selektovanaKlinika">
                <option v-for="klinika in klinike" :value="klinika.id" :key="klinika.id">{{klinika.naziv}}</option>
              </select>
              

            </div>
            </div>
          </div>
          <!--Body-->


          <div class="text-center mb-4">
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="dodajAdmina" >Dodaj administratora</button>
          </div>

        </div>

      </div>


    </div>
    <!--/Form with header-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        ime: "",
        prezime: "",
        mail: "",
        adresa: "",
        grad: "",
        drzava: "",
        brojTelefona: "",
        idKlinike: {}
      },
      klinike: [],
      selektovanaKlinika: ""
    };
  },
  methods: {
    dodajAdmina() {
      this.klinike.forEach(klinika => {
        if (klinika.id === this.selektovanaKlinika) {
          this.user.idKlinike = klinika
        }
      });
      axios
        .post("http://localhost:8080/adminKlinike/dodajAdminaKlinike", this.user)
        .then(user => {})
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/klinika/sveKlinike")
      .then(klinike => {
        this.klinike = klinike.data;
        console.log(klinike.data)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
  .header {
    background-color: lightgray;
  }
</style>