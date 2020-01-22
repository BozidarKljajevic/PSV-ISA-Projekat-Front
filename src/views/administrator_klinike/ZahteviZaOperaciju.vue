<template>
  <b-container class="mt-4">
      <div class="col-6 mb-4" v-for="zahtev in zahtevi" :key="zahtev.id">
        <b-card bg-variant="danger" text-variant="white" header="Pregled" class="text-center">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label>Tip Pregleda</label>
                <label class="form-control">{{zahtev.tipPregleda.naziv}}</label>
                <label>Datum</label>
                <label class="form-control">{{zahtev.datum}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Klinika</label>
                <label class="form-control">{{zahtev.lekar.klinika.naziv}}</label>
                <label>Vreme</label>
                <label class="form-control">{{zahtev.vreme}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Lekar</label>
                <label class="form-control">{{zahtev.lekar.ime}} {{zahtev.lekar.prezime}}</label>
                <label>Cena</label>
                <label class="form-control">{{zahtev.cena}}</label>
              </div>
            </div>
          </div>
          <!--<template v-slot:footer>
            <b-button @click="zakazi(zahtev.id)">Zakazi</b-button>
          </template>-->
        </b-card>
      
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
    return {
      zahtevi: []
    };
  },
  mounted() {
    axios
      .get("/zahtevi/zahteviZaOperacije")
      .then(zahtevi => {
        this.zahtevi = zahtevi.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style>

</style>