<template>
  <div>
    <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center">{{errorMessage}}</b-alert>
    </b-container>
    <b-container class="d-flex justify-content-center" style="margin-top: 20px"> 
      <div class= "row">
        <div class= "col" style="margin-right: 40%">
      <b-card style="width: 250%">
        <!--Header-->
        <div class="header pt-3 lighten-2">
          <div class="row d-flex justify-content-start">
            <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Profil</h3>
          </div>
        </div>

        <div class="form-group">
          <div class="card-body mt-4">
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label for="Form-username">E-mail</label>
                  <input
                    type="text"
                    id="Form-username"
                    class="form-control"
                    disabled
                    v-model="user.mail"
                  />

                  <label for="Form-ime">Ime</label>
                  <input
                    type="text"
                    id="Form-ime"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.ime"
                  />

                  <label for="Form-phone">Adresa</label>
                  <input
                    type="text"
                    id="Form-phone"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.adresa"
                  />

                  <label for="Form-email4">Država</label>
                  <input
                    type="text"
                    id="Form-email4"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.drzava"
                  />
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label for="Form-pass4">ID Zdravstvenog Osiguranika</label>
                  <input
                    type="text"
                    id="Form-pass4"
                    class="form-control"
                    disabled
                    v-model="user.id"
                  />

                  <label for="Form-prezime">Prezime</label>
                  <input
                    type="text"
                    id="Form-prezime"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.prezime"
                  />

                  <label for="Form-city">Grad</label>
                  <input
                    type="text"
                    id="Form-city"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.grad"
                  />

                  <label for="Form-sa">Broj Telefona</label>
                  <input
                    type="text"
                    id="Form-sa"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.brojTelefona"
                  />
                </div>
              </div>
            </div>
            <div v-if="postojiKarton == true" class="row">
               
            <router-link :to="'/KartonPacijenta/'+user.id" tag="button" class="btn btn-success btn-block z-depth-2">Karton pacijenta</router-link>
          
            </div>

            <div v-if="this.$store.state.user.role.authority == 'MEDICINSKASESTRA'" class="row">
               
            <router-link :to="'/KartonPacijenta/'+user.id" tag="button" class="btn btn-success btn-block z-depth-2">Karton pacijenta</router-link>
          
            </div>
           
          </div>
        </div>
      </b-card>
        </div>
        
        <div class="col">
        <b-container style="width: 200%" class="mt-4">
       <div class=" col-10 mb-4 "  v-for="pregled in pregledi" :key="pregled.id">
        
        <b-card bg-variant="danger" text-variant="white" header="Pregled" class="text-center">
          <div class="row">
            <div class="col">
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
                <label class="form-control">{{pregled.lekar.ime}}</label>
                <label>Cena</label>
                <label class="form-control">{{pregled.cena}}</label>
              </div>
            </div>
          </div>
          <template v-slot:footer>
            <router-link :to="'/ZapocniPregled/'+pregled.id+'/'+ user.id" tag="button" class="btn btn-success btn-block z-depth-2">Zapocni Pregled</router-link>
          </template>
        </b-card>
     
      </div>
        </b-container>
        </div>
      </div>
    </b-container> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      izmeni: false,
      postojiKarton: false,
      user: {},
      error: false,
      errorMessage: "",
      pregledi: []
    };
  },
  methods: {
   
  },
  mounted() {
  
    axios
      .get("/pacijent/preuzmi/" + this.$route.params.id)
      .then(pacijent => {
        this.user = pacijent.data;
      })
      .catch(error => {
        console.log(error);
      });

      axios
        .get("pregled/PreglediLekar/" + this.$store.state.user.id + "/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });

        axios
        .get("pregled/PostojiKarton/" + this.$store.state.user.id + "/" + this.$route.params.id)
        .then(response => {
          console.log(response.data);
          this.postojiKarton = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}

input {
  margin-bottom: 8%;
}
</style>