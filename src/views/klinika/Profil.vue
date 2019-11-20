<template>
<div>
  <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center">{{message}}</b-alert>
    </b-container>
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
              
              <label for="Form-ime">Naziv</label>
              <input type="text" id="Form-ime" class="form-control" v-model="klinika.naziv" :disabled="!izmeni" >
              
              <label for="Form-email4">Broj telefona</label>
              <input type="text" id="Form-email4" class="form-control" v-model="klinika.brojTelefona" :disabled="!izmeni" >
              
              <label for="Form-email4">Adresa</label>
              <input type="text" id="Form-email4" class="form-control" v-model="klinika.adresa" :disabled="!izmeni" >

              <label for="Form-text">Opis</label>
              <input type="textarea" id="Form-opis" class="form-control" v-model="klinika.opis" :disabled="!izmeni" >


            </div>
            </div>
            <div class="col">
            <div class="md-form pb-3">

              
              <label for="Form-city">Grad</label>
              <input type="text" id="Form-city" class="form-control" v-model="klinika.grad" :disabled="!izmeni" >

          
              <label for="Form-city">Drzava</label>
              <input type="text" id="Form-city" class="form-control" v-model="klinika.drzava" :disabled="!izmeni" >

              <label for="Form-email4">ID klinike</label>
              <input type="text" id="Form-email4" class="form-control" v-model="klinika.id" disabled >

              <label for="Form-email4">Ocena</label>
              <input type="text" id="Form-email4" class="form-control" v-model="klinika.ocena" disabled >
              

            </div>
            </div>

          </div>
          


          <div class="text-center mb-4 mt-4">
            <template v-if="!izmeni">
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="izmeniClick" >Izmeni</button>
            </template>
            <template v-else>
            <button type="button" class="btn btn-success btn-block z-depth-2" @click="sacuvajPodatke" >Sačuvaj</button>
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="odustaniClick" >Odustani</button>
            </template>
          </div>

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
      klinika: {},
      error: false,
      message: ""
      
    }
  },
  methods: {
    izmeniClick() {
      this.izmeni = true
    },
    odustaniClick() {
      this.error = false;
      this.izmeni = false
      axios
      .get("http://localhost:8080/klinika/postojecaKlinika")
      .then(klinike =>{
        this.klinika = klinike.data;
      })
      .catch(error => {
          console.log(error)
      });
    },
    sacuvajPodatke() {
      this.error = false;
      if(this.klinika.naziv === ""  || this.klinika.adresa === "" || this.klinika.opis === "" || this.klinika.grad === "" || this.klinika.drzava === ""
      || this.klinika.brojTelefona === "") {
        this.message = "Molimo vas popunite sva polja";
        this.error = true;
        return;
      }

      var rex = /^\+381\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.klinika.brojTelefona.trim()))) {
        this.message = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }

      axios
      .put("http://localhost:8080/klinika/izmeniPodatkeKlinike", this.klinika)
      .then(klinike =>{
        this.klinika = klinike.data;
        this.izmeni = false;
      })
      .catch(error => {
          console.log(error)
      });
    }
  },
  
  mounted() {
    axios
      .get("http://localhost:8080/klinika/postojecaKlinika")
      .then(klinike =>{
        this.klinika = klinike.data;
        console.log(klinike.data)
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







