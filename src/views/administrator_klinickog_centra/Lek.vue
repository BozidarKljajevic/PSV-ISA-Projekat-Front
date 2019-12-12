<template>
  <div>
    <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center">{{errormessage}}</b-alert>
    </b-container>

    <div class="container d-flex justify-content-center" style="margin-top: 20px">
      <!--Form with header-->
      <div class="card" style="width: 60%">
        <!--Header-->
        <div class="header pt-3 grey lighten-2">
          <div class="row d-flex justify-content-start">
            <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodaj lek</h3>
          </div>
        </div>
        <!--Header-->

        <div class="form-group">
          <div class="card-body mx-4 mt-4">
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label for="Form-ime">Naziv</label>
                  <input type="text" id="Form-ime" class="form-control" v-model="lek.naziv" />
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label for="Form-grad">Šifra leka</label>
                  <input type="text" id="Form-grad" class="form-control" v-model="lek.sifra" />
                </div>
              </div>
            </div>
            <!--Body-->

            <div class="text-center mb-4">
              <button
                type="button"
                class="btn btn-danger btn-block z-depth-2"
                @click="dodajLek"
              >Dodaj Lek</button>
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
import { isNumber } from "util";
export default {
  data() {
    return {
      lek: {
        naziv: "",
        sifra: ""
      },
      error: false,
      errormessage: ""
    };
  },
  methods: {
    dodajLek() {
      this.error = false;
      var re = /^[0-9]+$/;
      if (!re.test(String(this.lek.sifra.trim()))) {
        this.errormessage = "Šifra treba da bude sastavljena od borjeva";
        this.error = true;
        return;
      }
      axios
        .post("/lek/dodajLek", this.lek)
        .then(lek => {
          this.lek.naziv = "";
          this.lek.sifra = "";
          this.error = false;
        })
        .catch(error => {
          alert("Lek sa tom šifrom već postoji");
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>