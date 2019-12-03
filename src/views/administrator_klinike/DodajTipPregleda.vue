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
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodavanje Tipa pregleda</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <input type="text" id="Form-ime" class="form-control" v-model="user.naziv" />
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Broj</label>
                <input type="text" id="Form-grad" class="form-control" v-model="user.oznaka" />

               <!-- <label for="Form-klinika">Klinika</label>
                <b-form-select v-model="selektovanaKlinika">
                  <option
                    v-for="klinika in klinike"
                    :value="klinika.id"
                    :key="klinika.id"
                  >{{klinika.naziv}}</option>
                </b-form-select> -->
              </div>
            </div>
          </div>
          <!--Body-->

          <div class="text-center mb-4">
            <button
              type="button"
              class="btn btn-danger btn-block z-depth-2"
              @click="dodajTipPregleda"
            >Dodaj salu</button>
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
      user: {
        naziv: "",
        broj: "",
        idKlinike: {}
      },
      klinike: [],
      selektovanaKlinika: "",
      error: false,
      errormessage: "",
    };
  },
  methods: {
    dodajTipPregleda() {
      this.klinike.forEach(klinika => {
        if (klinika.id === this.selektovanaKlinika) {
          this.user.idKlinike = klinika;
        }
      });
      if (this.user.naziv === "" || this.user.oznaka === ""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    
      

      axios
        .post(
          "http://localhost:8080/tipPregleda/dodajTipPregleda",
          this.user
        )
        .then(user => {
          this.user.naziv = "";
          this.user.oznaka = "";
          this.error=false;
        })
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