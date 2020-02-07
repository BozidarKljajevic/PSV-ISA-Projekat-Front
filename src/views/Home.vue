<template>
  <b-container class="mt-4" v-if="this.$store.state.user.role.authority == ''">
    <router-link
      to="/register"
      tag="button"
      class="btn btn-success btn-block z-depth-2"
    >Registracija</router-link>
    <router-link to="/login" tag="button" class="btn btn-danger btn-block z-depth-2">Prijava</router-link>
  </b-container>
  <b-container class="mt-4" v-else>
    <div class="row mb-4" v-if="this.$store.state.user.role.authority == 'PACIJENT'">
      <div class="col-6 mb-4" v-for="pregled in pregledi" :key="pregled.id">
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
                <label class="form-control">{{pregled.lekar.ime}} {{pregled.lekar.prezime}}</label>
                <label>Cena</label>
                <label class="form-control">{{pregled.sala.naziv}}</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="md-form pb-3">
                <label>Cena</label>
                <label class="form-control">{{pregled.cena}}</label>
              </div>
            </div>
          </div>
          <template v-slot:footer>
            <b-button @click="zakazi(pregled.id)">Zakazi</b-button>
          </template>
        </b-card>
      </div>
    </div>


   <!-- <div class="row mb-4" v-if="this.$store.state.user.role.authority == 'LEKAR'">
      <div class="col-6 mb-4" v-for="pregled in pregledi" :key="pregled.id">
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
            <router-link :to="'/ZapocniPregled/'+pregled.id" tag="button" class="btn btn-success btn-block z-depth-2">Zapocni Pregled</router-link>
          </template>
        </b-card>
      </div>
    </div> -->

    

    <div class="row mb-4 d-flex justify-content-center" v-else>
      <div v-if="this.$store.state.user.enabled == false">
        <b-card>
          <div class="header pt-3 lighten-2">
            <div class="row d-flex justify-content-start">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Promena Lozinke</h3>
            </div>
          </div>

          <div class="form-group">
            <div class="card-body mx-4 mt-4">
              <div class="row">
                <div class="col">
                  <div class="md-form">
                    <label for="Form-ime">Lozinka</label>
                    <input
                      type="password"
                      id="Form-lozinka"
                      class="form-control"
                      placeholder="Nova lozinka..."
                      v-model="lozinka.sifra"
                    />
                  </div>
                </div>
              </div>

              <div class="text-center mb-4 mt-4">
                <b-button class="mt-2" variant="danger" @click="promeniLozinku">Promeni</b-button>
              </div>
            </div>
          </div>
        </b-card>
      </div>
    </div>

  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      lozinka: {
        sifra: ""
      },
      putanja: "",
      pregledi: []
    };
  },
  methods: {
    zakazi(idPregleda) {
      axios
        .post(
          "pregled/zakaziPregledHome/" +
            idPregleda +
            "/" +
            this.$store.state.user.id
        )
        .then(response => {
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    promeniLozinku() {
      if (this.$store.state.user.role.authority == "ADMINCENTRA") {
        this.putanja = "adminCentra";
      } else if (this.$store.state.user.role.authority == "ADMIN") {
        this.putanja = "adminKlinike";
      } else if (this.$store.state.user.role.authority == "LEKAR") {
        this.putanja = "lekar";
      } else if (this.$store.state.user.role.authority == "MEDICINSKASESTRA") {
        this.putanja = "medicinskaSestra";
      }

      axios
        .post(
          "/" +
            this.putanja +
            "/izmeniGenerickuSifru/" +
            this.$store.state.user.id,
          this.lozinka
        )
        .then(() => {
          localStorage.removeItem("jwt");
          this.$store.state.user = {
            role: {
              authority: ""
            }
          };
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    if (this.$store.state.user.role.authority == "PACIJENT") {
      axios
        .get("pregled/predefinisaniPregledi")
        .then(response => {
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });

    } 

    if (this.$store.state.user.role.authority == "LEKAR") {
      axios
        .get("pregled/PreglediLekar/" + this.$store.state.user.id)
        .then(response => {
          console.log(response.data);
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    } 
    

  
  }
};
</script>
