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
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodavanje Sale klinike</h3>
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
                <input type="text" id="Form-grad" class="form-control" v-model="user.broj" />

            
              <!--  <label for="Form-klinika">Klinika</label>
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
              @click="dodajSalu"
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
        klinika: {}
      },
      klinike: [],
      selektovanaKlinika: "",
      error: false,
      errormessage: "",
    };
  },
  methods: {
    dodajSalu() {
      this.klinike.forEach(klinika => {
        if (klinika.id === this.selektovanaKlinika) {
          this.user.klinika = klinika;
        }
      });
      if (this.user.naziv === "" || this.user.broj === ""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    
       var rexx = /^[0-9]+$/;
      if (!rexx.test(String(this.user.broj.trim()))) {
        this.errormessage = "Broj sale ne sme da sadrzi slova";
        this.error = true;
        return;
      }

      axios
        .post(
          "/salaKLinike/dodajSaluKlinike/" + this.$store.state.user.id,
          this.user
        )
        .then(user => {
          this.user.naziv = "";
          this.user.broj = "";
          this.error=false;
        })
        .catch(error => {
          console.log(error);
          this.errormessage = "Oznaka ili broj vec postoji";
          this.error = true;
        });
    }
  },
  mounted() {
    
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}
</style>