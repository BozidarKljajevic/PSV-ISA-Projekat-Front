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
      
   

    <div class="form-group" v-for="lekar in MedicinskoOsoblje" :key="lekar.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Ime</label>
                <label id="Form-ime" class="form-control">{{lekar.ime}}</label>
                <label for="Form-ime">Mail</label>
                <label id="Form-ime" class="form-control">{{lekar.mail}}</label>

                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="IzbrisiClick(lekar.id)"
                    
                  >Izbrisi</button>
                </div>
                <div class="text-center mb-4">
                  <router-link :to="'/MedicinskoOsobljeProfil/'+lekar.id" tag="button" class="btn btn-success btn-block z-depth-2">Profil</router-link>
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
      errormessage: ""
      
    };
  },
   methods: {
    IzbrisiClick(id) {
      axios
      .post("/lekar/izbrisiLekara/"+ id)
      .then(MedicinskoOsoblje => {
        this.MedicinskoOsoblje = MedicinskoOsoblje.data;
      })
      .catch(error => {
        this.errormessage = "Ne sme se obrisati lekar koji ima zakazan pregled";
          this.error = true;
        console.log(error);
      });

    },
   },
  mounted() {
    axios
      .get("/lekar/postojeciLekariKlinike/" + this.$store.state.user.id)
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