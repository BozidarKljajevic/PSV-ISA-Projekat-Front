<template>
<div>
<b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    
    <div class="card" style="width: 60%">
      
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Tipova Pregleda</h3>
        </div>
      </div>
      
   

    <div class="form-group" v-for="tip in TipoviPregleda" :key="tip.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <input id="Form-ime"  class="form-control" v-model="tip.naziv" :disabled="!izmeni">
                <label for="Form-ime">Oznaka</label>
                <input id="Form-ime" class="form-control" v-model="tip.oznaka" :disabled="!izmeni">

                <label for="Form-ime">Cena</label>
                <input id="Form-ime" class="form-control" v-model="tip.cena" :disabled="!izmeni">

                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="IzbrisiClick(tip.id)" 
                    
                  >Izbrisi</button>
                </div> 
               <div class="text-center mb-4 mt-4">
            <template v-if="!izmeni">
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="izmeniClick" >Izmeni</button>
            </template>
            <template v-else>
            <button type="button" class="btn btn-success btn-block z-depth-2" @click ="sacuvajPodatke(tip)" >Sačuvaj</button>
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="odustaniClick" >Odustani</button>
            </template>
          </div>
              </div>
            </div>
           
            </div>
          </div>
           </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        izmeni:false,
        error: false,
        errormessage: "",
      TipoviPregleda: []

      
    };
  },
   methods: {

    izmeniClick() {
      this.izmeni = true
    },

    odustaniClick() {
      this.error = false;
      this.izmeni = false
     axios
      .get("/tipPregleda/TipoviKlinike/"+ this.$store.state.user.id )
      .then(TipoviPregleda => {
        this.TipoviPregleda = TipoviPregleda.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    

    IzbrisiClick(id) {
      axios
      .post("/tipPregleda/izbrisiTipPregleda/"+ id + "/" + this.$store.state.user.id )
      .then(tipovi => {
        this.TipoviPregleda = tipovi.data;
      })
      .catch(error => {
        console.log(error);
        this.error=true;
         this.errormessage="Ne mozete obrisati tip koji koristi lekar te klinike";
      });

    },

     sacuvajPodatke(tip) {
      this.error = false;
      if (tip.naziv === "" || tip.oznaka === "" || tip.cena === ""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    
      
    
      axios
      .post("/tipPregleda/izmeniPodatkeTipaPregleda", tip)
      .then(SaleKlinikee =>{
        this.user = SaleKlinikee.data;
        this.izmeni = false;
      })
      .catch(error => {
          console.log(error)
      });
    }

   },
  mounted() {
    axios
      .get("/tipPregleda/TipoviKlinike/"+ this.$store.state.user.id)
      .then(TipoviPregleda => {
        this.TipoviPregleda = TipoviPregleda.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>