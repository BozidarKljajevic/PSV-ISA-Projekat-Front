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
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Posalji zahtev za godisnji</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Datum od</label>
                <input type="date" id="Form-ime" class="form-control" v-model="godisnji.datumOd" />
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Datum do</label>
                <input type="date" id="Form-grad" class="form-control" v-model="godisnji.datumDo" />

            
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
              @click="posalji"
            >Posalji zahtev</button>
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
      godisnji: {
        datumOd: "",
        datumDo: ""
      
      },
      klinike: [],
      selektovanaKlinika: "",
      error: false,
      errormessage: "",
    };
  },
  methods: {
    posalji() {
      
      if (this.godisnji.datumOd === "" || this.godisnji.datumDo === ""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    
      

      axios
        .post(
          "/godisnji/zahtevGodisnjiSestra/" + this.$store.state.user.id,
          this.godisnji
        )
        .then(user => {
          this.godisnji.datumOd = "";
          this.godisnji.datumDo = "";
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