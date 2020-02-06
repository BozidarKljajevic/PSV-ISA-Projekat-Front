<template>
<div>
<b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    
    <div class="card" style="width: 60%">
      
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Slobodnih(predefinisanih) termina </h3>
        </div>
      </div>
      
   

    <div class="form-group" v-for="termin in slobodniTermini" :key="termin.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
           
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <input id="Form-ime"  class="form-control" v-model="termin.lekar" disabled>
                <label for="Form-ime">Oznaka</label>
                <input id="Form-ime" class="form-control" v-model="termin.datum" disabled>

                <label for="Form-ime">Cena</label>
                <input id="Form-ime" class="form-control" v-model="termin.vreme" disabled>

               
             
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
      slobodniTermini: []

      
    };
  },
   methods: {

   

   

   },
  mounted() {
    axios
      .get("/pregledi/slobodniPregledi/"+ this.$store.state.user.id)
      .then(slobodniTermini => {
        this.slobodniTermini = slobodniTermini.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>