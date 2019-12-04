<template>
<div>
  

  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodaj bolesti</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <input type="text" id="Form-ime" class="form-control" v-model="bolest.naziv" />

              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Šifra bolesti</label>
                <input type="text" id="Form-grad" class="form-control" v-model="bolest.sifra" />

            </div>
          </div>
          </div>
          <!--Body-->

          <div class="text-center mb-4">
            <button
              type="button"
              class="btn btn-danger btn-block z-depth-2"
              @click="dodajBolest"
            >Dodaj Bolest</button>
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
      bolest: {
          naziv: "",
          sifra: "",
      }
    };
  },
   methods: {
    dodajBolest() {
      axios
        .post(
          "http://localhost:8080/bolesti/dodajBolest",
          this.bolest
        )
        .then(bolest => {
          this.bolest.naziv = "";
          this.bolest.sifra = "";
        })
        .catch(error => {
            alert("Bolest sa tom šifrom već postoji")
          console.log(error);
        });
    },
   },
}
</script>

<style>

</style>