<template>
<div> 
  
  <div class="container d-flex justify-content-center" style="margin-top: 20px">

    
    <div class="card" style="width: 60%">

      
      <div class="header pt-3 grey lighten-2">

        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Profil</h3>
        </div>

      </div>
      



      <div class="form-group">

        <div class="card-body mx-4 mt-4">
          <div class="row">

            <div class="col">
            <div class="md-form">
              <label for="Form-username">E-mail</label>
              <input type="text" id="Form-username" class="form-control" v-model="user.mail" disabled >
              
              <label for="Form-ime">Ime</label>
              <input type="text" id="Form-ime" class="form-control" v-model="user.ime" :disabled="!izmeni" >
              
              <label for="Form-phone">Telefon</label>
              <input type="number" id="Form-phone" class="form-control" v-model="user.brojTelefona" :disabled="!izmeni" >
              
              <label for="Form-email4">Adresa</label>
              <input type="text" id="Form-email4" class="form-control" v-model="user.adresa" :disabled="!izmeni" >

              <label for="Form-email4">ID klinike</label>
              <input type="text" id="Form-email4" class="form-control" v-model="user.idKlinike.id" disabled >
              

            </div>
            </div>
            <div class="col">
            <div class="md-form pb-3">

              <label for="Form-city">ID Administratora</label>
              <input type="text" id="Form-city" class="form-control" v-model="user.id" disabled >
              
              <label for="Form-prezime">Prezime</label>
              <input type="text" id="Form-prezime" class="form-control" v-model="user.prezime" :disabled="!izmeni" >

              
              <label for="Form-city">Grad</label>
              <input type="text" id="Form-city" class="form-control" v-model="user.grad" :disabled="!izmeni" >

          
              <label for="Form-city">Drzava</label>
              <input type="text" id="Form-city" class="form-control" v-model="user.drzava" :disabled="!izmeni" >
              

            </div>
            </div>
          </div>
          


          <div class="text-center mb-4 mt-4">
            <template v-if="!izmeni">
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="izmeniClick" >Izmeni</button>
            </template>
            <template v-else>
            <button type="button" class="btn btn-success btn-block z-depth-2" @click = "sacuvajPodatke" >Sačuvaj</button>
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="odustaniClick" >Odustani</button>
            </template>
          </div>

        </div>

      </div>


    </div>
    

  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      izmeni:false,
      user: {}
    }
  },
  methods: {
    izmeniClick() {
      this.izmeni = true
    },
    odustaniClick() {
      this.izmeni = false
      axios
      .get("http://localhost:8080/adminKlinike/postojeciAdminKlinike")
      .then(adminKlinike =>{
        this.user = adminKlinike.data;
      })
      .catch(error => {
          console.log(error)
      });
    },
    sacuvajPodatke() {
      this.izmeni = false;
      axios
      .put("http://localhost:8080/adminKlinike/izmeniPodatkeAdminaKlinike", this.user)
      .then(adminKlinike =>{
        this.user = adminKlinike.data;
      })
      .catch(error => {
          console.log(error)
      });
    }
  },

  mounted() {
    axios
      .get("http://localhost:8080/adminKlinike/postojeciAdminKlinike")
      .then(adminKlinike =>{
        this.user = adminKlinike.data;
      })
      .catch(error => {
          console.log(error)
      });
  }

};
</script>

<style>
 .header {
    background-color: lightgray;
  }
</style>