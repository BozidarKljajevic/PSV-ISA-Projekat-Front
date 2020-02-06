<template>
<div>
<b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center">{{errormessage}}</b-alert>
    </b-container>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    
    <div class="card" style="width: 60%">
      
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Lekara</h3>
        </div>
      </div>
      
  


    <div class="form-group" v-for="pregled in MedicinskoOsoblje" :key="pregled.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">vreme</label>
                <label id="Form-ime" class="form-control">{{pregled.vreme}}</label>
                <label for="Form-ime">datum</label>
                <label id="Form-ime" class="form-control">{{pregled.datum}}</label>

                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                      @click="otkaziPregled(pregled.id)"
                    
                  >otkazi pregled</button>
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
      MedicinskoOsoblje: [],
       error: false,
      errormessage: "",
      pretraziBtnClickerd: false,
 pretraga: {
        ime: "",
        prezime: ""
       
      },
      
    };
  },
   
   methods: {
    otkaziPregled(id) {
    axios
      .post("/lekar/otkaziPregledLekar/"  + id + "/" + this.$store.state.user.id)
      .then(MedicinskoOsoblje => {
        this.MedicinskoOsoblje = MedicinskoOsoblje.data;
      })
      .catch(error => {
            
          this.error = true;
          this.errormessage = "Pregled je za manje od 24h ne mozete ga otkazati";
        console.log(error);
      });
    }
   },
  mounted() {
    axios
      .get("/lekar/zahteviLekar/" + this.$store.state.user.id)
      .then(MedicinskoOsoblje => {
        this.MedicinskoOsoblje = MedicinskoOsoblje.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>