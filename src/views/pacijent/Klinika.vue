<template>
  <div>
    <div class="container d-flex justify-content-center" style="margin-top: 20px">
      <!--Form with header-->
      <b-container class="card" style="width: 60%">
        <div class="header pt-3 grey lighten-2">
          <div class="row d-flex justify-content-start">
            <h1 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">{{klinika.naziv}}</h1>
          </div>
        </div>

        <b-container class="mt-4">
          <h4>Lekari</h4>
        </b-container>

        <b-container v-if="success">
          <b-alert
            show="2"
            variant="success"
            class="d-flex justify-content-center mt-2"
          >Uspesno ste poslali zahtev za pregled</b-alert>
        </b-container>

        <b-card
          border-variant="danger"
          header-border-variant="danger"
          header-text-variant="danger"
          align="center"
          class="mt-4"
          v-for="lekar in lekari"
          :header="lekar.ime + ' ' + lekar.prezime"
          :key="lekar.id"
        >
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label>Opis</label>
                <label class="form-control">{{lekar.tipPregleda.naziv}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Ocena</label>
                <label class="form-control">{{lekar.ocena}}</label>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label>Cena</label>
                <label class="form-control">{{lekar.tipPregleda.cena}}</label>
              </div>
            </div>
          </div>
          <template v-slot:footer>
            <b-button variant="success" @click="podnesiZahtev(lekar)">Podnesi Zahtev Za Pregled</b-button>
          </template>
        </b-card>

        <b-container class="mt-4">
          <h4>Predefinisani pregledi</h4>
        </b-container>

        <b-card
          bg-variant="danger"
          text-variant="white"
          header="Pregled"
          class="text-center mt-4"
          v-for="pregled in pregledi"
          :key="pregled.id"
        >
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
                <label class="form-control">{{pregled.cena}}</label>
              </div>
            </div>
          </div>
          <template v-slot:footer>
            <b-button @click="zakazi(pregled.id)">Zakazi</b-button>
          </template>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      klinika: {
        id: "",
        naziv: ""
      },
      lekari: [],
      pregledi: [],
      zahtev: {
        lekar: {},
        idPacijenta: "",
        cena: ""
      },
      success: false
    };
  },
  methods: {
    podnesiZahtev(lekar) {
      this.success = false;

      this.zahtev.lekar = lekar;
      this.zahtev.cena = lekar.tipPregleda.cena;
      this.zahtev.idPacijenta = this.$store.state.user.id;

      axios
        .post("/pregled/podnesiZahtev", this.zahtev)
        .then(response => {
          this.success = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    zakazi(idPregleda) {
      this.success = false;

      axios
        .post(
          "pregled/zakaziPregled/" +
            idPregleda +
            "/" +
            this.$store.state.user.id
        )
        .then(response => {
          this.pregledi = response.data;
          this.success = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.klinika.id = this.$route.params.id;
    this.klinika.naziv = this.$route.params.naziv;

    axios
      .get("/klinika/postojeciLekariKlinike/" + this.klinika.id)
      .then(lekari => {
        this.lekari = lekari.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("pregled/predefinisaniPreglediKlinike/" + this.klinika.id)
      .then(response => {
        this.pregledi = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>