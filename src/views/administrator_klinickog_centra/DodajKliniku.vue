<template>

<div>
  <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>
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
                <label for="Form-naziv">Naziv</label>
                <input
                  type="text"
                  id="Form-naziv"
                  class="form-control"
                  v-model="klinika.naziv"
                />

                <label for="Form-phone">Opis</label>
                <input
                  type="textarea"
                  id="Form-opis"
                  class="form-control"
                  v-model="klinika.opis"
                />

                <label for="Form-br">Broj telefona</label>
                <input type="text" id="Form-br" class="form-control" v-model="klinika.brojTelefona" />
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Grad</label>
                <input
                  type="text"
                  id="Form-grad"
                  class="form-control"
                  v-model="klinika.grad"
                />

                <label for="Form-adresa">Adresa</label>
                <input
                  type="text"
                  id="Form-adresa"
                  class="form-control"
                  v-model="klinika.adresa"
                />

                <label for="Form-država">Država</label>
                <input
                  type="text"
                  id="Form-država"
                  class="form-control"
                  v-model="klinika.drzava"
                />
              </div>
            </div>
          </div>
          <!--Body-->

          <div class="text-center mb-4">
            <button
              type="button"
              class="btn btn-danger btn-block z-depth-2"
              @click="dodajKliniku"
            >Dodaj kliniku</button>
          </div>
        </div>
      </div>
    </div>
    <!--/Form with header-->
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      klinika: {
        naziv: "",
        opis: "",
        brojTelefona: "",
        grad: "",
        adresa: "",
        drzava: "",
        ocena: 0,
      },
      error: false,
      errormessage: "",
    };
  },
  methods: {
    dodajKliniku() {
      if (this.klinika.naziv === "" || this.klinika.opis === ""  || this.klinika.adresa==="" || this.klinika.grad===""
       || this.klinika.drzava==="" || this.klinika.brojTelefona===""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }

      var rex = /^\+381\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.klinika.brojTelefona.trim()))) {
        this.errormessage = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }

      axios
        .post("/klinika/dodajKliniku", this.klinika)
        .then(klinika => {
          this.klinika.naziv="";
          this.klinika.opis="";
          this.klinika.brojTelefona="";
          this.klinika.grad="";
          this.klinika.adresa="";
          this.klinika.drzava="";
          this.klinika.ocena=0;
          this.error=false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}
</style>