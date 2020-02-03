<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <b-container class="card" style="width: 60%">
      <b-container v-if="success">
        <b-alert
          show="2"
          variant="success"
          class="d-flex justify-content-center mt-2"
        >Uspesno ste potvrdili zahtev za pregled</b-alert>
      </b-container>

      <b-container v-if="error">
        <b-alert
          show="2"
          variant="danger"
          class="d-flex justify-content-center mt-2"
        >Uspesno ste odbbili zahtev za pregled</b-alert>
      </b-container>

      <b-card
        border-variant="secondary"
        header-border-variant="secondary"
        header-text-variant="secondary"
        align="center"
        class="mt-4"
        header="Potvrda zahteva"
        v-if="uslov"
      >
        <div class="row">
          <div class="col">
            <label class="form-control">{{zahtev.lekar.klinika.naziv}}</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Lekar</label>
            <label class="form-control">{{zahtev.lekar.ime}} {{zahtev.lekar.prezime}}</label>
          </div>
          <div class="col">
            <label>Tip pregleda</label>
            <label class="form-control">{{zahtev.tipPregleda.naziv}}</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Datum</label>
            <label class="form-control">{{zahtev.datum}}</label>
          </div>
          <div class="col">
            <label>Vreme</label>
            <label class="form-control">{{zahtev.vreme}}</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Trajanje pregleda</label>
            <label class="form-control">{{(zahtev.trajanjePregleda)*60}} min</label>
          </div>
          <div class="col">
            <label>Sala</label>
            <label class="form-control">{{zahtev.sala.naziv}}</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Adresa</label>
            <label class="form-control">{{zahtev.lekar.klinika.adresa}}</label>
          </div>
        </div>
        <template v-slot:footer>
          <div class="row" v-if="success === false && error === false">
            <div class="col-6">
              <b-button variant="success" @click="potvrdiZahtev">Zakazi</b-button>
            </div>
            <div class="col-6">
              <b-button variant="danger" @click="odbijZahtev">Odbij</b-button>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-12">
              <b-button variant="success" @click="zakazaniPregledi">Moji zakazani pregledi</b-button>
            </div>
          </div>
        </template>
      </b-card>
      <b-card border-variant="danger" header-border-variant="danger" v-else>
        <h1 style="color: red">{{errorMessage}}</h1>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      zahtev: {},
      uslov: false,
      errorMessage: "",
      success: false,
      error: false
    };
  },
  methods: {
    potvrdiZahtev() {
      this.error = false;
      this.success = false;

      axios
        .post("/zahtevi/potvrdiZahtev", this.zahtev)
        .then(() => {
          this.success = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    odbijZahtev() {
      this.error = false;
      this.success = false;

      axios
        .post("/zahtevi/odbijZahtev", this.zahtev)
        .then(() => {
          this.error = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    zakazaniPregledi(){
      this.$router.push("/istorijaPregledaOperacija");
    }
  },
  mounted() {
    this.uslov = false;

    axios
      .get("/zahtevi/zahtev/" + this.$route.params.code)
      .then(zahtev => {
        if (zahtev.data.idPacijenta !== this.$store.state.user.id) {
          this.errorMessage =
            "Nalog nije validan za zahtev koji zelite da validirate! Molimo Vas da se ulogujte na odgovarajuci nalog";
          return;
        } else {
          this.zahtev = zahtev.data;
          this.uslov = true;
        }
      })
      .catch(error => {
        console.log(error);
      });

    if (!this.uslov) {
      this.errorMessage = "Morate se ulogovati kako bi validirali zahtev";
    }
  }
};
</script>

<style>
</style>