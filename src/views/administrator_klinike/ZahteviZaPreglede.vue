<template>

<b-container class="mt-4">
 <div  class="col-6 mb-4" v-for="zahtev in zahtevi" :key="zahtev.id">
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
                <label class="form-control">{{zahtev.lekar.ime}}</label>
                <label>Cena</label>
                <label class="form-control">{{zahtev.cena}}</label>
              </div>
            </div>
          </div>
          <div>
          <label for="Form-klinika">Dodaj salu</label>
                  <b-form-select v-model="selektovanaSala">
                    <option
                      v-for="sale in SaleKlinike"
                      :value="sale.id"
                      :key="sale.id"
                    >{{sale.naziv}}</option>
                  </b-form-select>
      </div>
        <button
                    type="button"
                    class="btn btn-success btn-block  mt-2 z-depth-2"
                    @click="rezervisiSalu(zahtev)"
                  >Zakazi pregled</button>
        </b-card>
      </div>
</b-container>

</template>

<script>
import axios from "axios";
export default {
data() {
    return {
      zahtevi: [],
      SaleKlinike: [],
      selektovanaSala: "",
    };
    
  },
  methods: {
        rezervisiSalu(zahtev) {
          axios
        .post("/zahtevi/rezervisiSalu/" + this.selektovanaSala, zahtev)
        .then(response => {
         
        })
        .catch(error => {
          console.log(error);
        });
        }
  },
   mounted() {
   
      axios
        .get("/zahtevi/zahteviZaPreglede")
        .then(response => {
          console.log(response.data);
          this.zahtevi = response.data;
        })
        .catch(error => {
          console.log(error);
        });

         axios
      .get("/salaKLinike/SaleKlinike/" + this.$store.state.user.id)
      .then(SaleKlinike => {
        this.SaleKlinike = SaleKlinike.data;
      })
      .catch(error => {
        console.log(error);
      });
    }
};
</script>

<style>

</style>