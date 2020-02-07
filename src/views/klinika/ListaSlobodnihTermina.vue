<template>
<div class="row mb-4">
<div class="col-6 mb-4 mt-2" v-for="pregled in pregledi" :key="pregled.id">
        <b-card bg-variant="danger" text-variant="white" header="Pregled" class="text-center mr-4">
          <div class="row mb-4">
            <div class="col-6 mb-4">
              <div class="md-form">
                <label>Tip Pregleda</label>
                <label class="form-control">{{pregled.tipPregleda.naziv}}</label>
                <label>Datum</label>
                <label class="form-control">{{pregled.datum}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Klinika</label>
                <label class="form-control">{{pregled.lekar.klinika.naziv}}</label>
                <label>Vreme</label>
                <label class="form-control">{{pregled.vreme}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Lekar</label>
                <label class="form-control">{{pregled.lekar.ime}} {{pregled.lekar.prezime}}</label>
                <label>Cena</label>
                <label class="form-control">{{pregled.cena}}</label>
              </div>
            </div>
          </div>
          
        </b-card>
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
      pregledi: []

      
    };
  },
   methods: {

   

   

   },
   mounted() {
    if (this.$store.state.user.role.authority == "ADMIN") {
      axios
        .get("pregled/slobodniPregledi/" + this.$store.state.user.id)
        .then(response => {
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });

    } 

    
    

  
  }
};
</script>

<style>
</style>