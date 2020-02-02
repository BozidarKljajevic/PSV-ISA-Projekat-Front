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
          <div class="row">
            <div class="col">
              <h5>Datum</h5>
              <b-form-group>
                <b-form-input type="date" v-model="pretraga.datum"></b-form-input>
              </b-form-group>
            </div>
            <div class="col">
              <h5>Tip Pregleda</h5>
              <b-select v-model="pretraga.tipPregleda">
                <option value>-</option>
                <option
                  v-for="tipPregleda in tipoviPregleda"
                  :value="tipPregleda.id"
                  :key="tipPregleda.id"
                >{{tipPregleda.naziv}}</option>
              </b-select>
            </div>
          </div>
        </b-container>

        <b-container class="mt-4">
          <div class="row">
            <div class="col">
              <h6>Ime</h6>
              <input type="text" class="form-control" v-model="pretraga.imeLekara" />
            </div>
            <div class="col">
              <h6>Prezime</h6>
              <input type="text" class="form-control" v-model="pretraga.prezimeLekara" />
            </div>
            <div class="col">
              <h6>Ocena</h6>
              <b-select v-model="pretraga.ocenaLekara">
                <option value>-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </b-select>
            </div>
          </div>
        </b-container>

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

        <b-container v-if="error">
          <b-alert show variant="danger" class="d-flex justify-content-center mt-2">{{errorMessage}}</b-alert>
        </b-container>

        <b-card
          border-variant="danger"
          header-border-variant="danger"
          header-text-variant="danger"
          align="center"
          class="mt-4"
          v-for="lekar in konacniLekari"
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
          <div class="row">
            <div class="col" v-if="izabraniLekar === lekar.id">
              <h6>Slobodni termini</h6>
              <b-select v-model="izabraniVremePregleda">
                <option v-for="termin in slobodniTermini" :key="termin">{{termin}}</option>
              </b-select>
            </div>
          </div>
          <template v-slot:footer>
            <b-button
              v-if="izabraniLekar !== lekar.id"
              variant="outline-secondary"
              @click="slobodniTerminiLekara(lekar)"
            >Prikazi slobodne termine</b-button>
            <b-button
              v-else
              variant="success"
              @click="podnesiZahtev(lekar)"
            >Podnesi Zahtev Za Pregled</b-button>
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
        datum: "",
        vreme: "",
        trajanjePregleda: 0.5,
        cena: ""
      },
      izabraniVremePregleda: "",
      success: false,
      pretraga: {
        datum: "",
        tipPregleda: "",
        imeLekara: "",
        prezimeLekara: "",
        ocenaLekara: ""
      },
      tipoviPregleda: [],
      slobodniTermini: [],
      izabraniLekar: "",
      error: false,
      errorMessage: ""
    };
  },
  watch: {
    "pretraga.datum": function slobodniLekariDatum(newDatum) {
      this.izabraniLekar = "";
      this.error = false;
      var datum = this.pretraga.datum;
      if (this.pretraga.datum == "") {
        datum = "NONE";
      }

      var tipPregleda = this.pretraga.tipPregleda;
      if (this.pretraga.tipPregleda == "") {
        tipPregleda = -1;
      }

      axios
        .get(
          "/klinika/slobodniLekari/" +
            datum +
            "/" +
            tipPregleda +
            "/" +
            this.klinika.id
        )
        .then(lekari => {
          this.lekari = lekari.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    "pretraga.tipPregleda": function slobodniLekariTipPregleda(newDatum) {
      this.izabraniLekar = "";
      var datum = this.pretraga.datum;
      if (this.pretraga.datum == "") {
        datum = "NONE";
      }

      var tipPregleda = this.pretraga.tipPregleda;
      if (this.pretraga.tipPregleda == "") {
        tipPregleda = -1;
      }

      axios
        .get(
          "/klinika/slobodniLekari/" +
            datum +
            "/" +
            tipPregleda +
            "/" +
            this.klinika.id
        )
        .then(lekari => {
          this.lekari = lekari.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    konacniLekari() {
      var lekari = [];

      this.lekari.forEach(lekar => {
        if (
          lekar.ime
            .toLowerCase()
            .includes(this.pretraga.imeLekara.toLowerCase()) &&
          lekar.prezime
            .toLowerCase()
            .includes(this.pretraga.prezimeLekara.toLowerCase()) &&
          (parseInt(lekar.ocena, 10) == this.pretraga.ocenaLekara ||
            this.pretraga.ocenaLekara === "")
        ) {
          lekari.push(lekar);
        }
      });

      //lekari = this.lekari;

      return lekari;
    }
  },
  methods: {
    podnesiZahtev(lekar) {
      this.success = false;
      this.error = false;

      this.zahtev.lekar = lekar;
      this.zahtev.cena = lekar.tipPregleda.cena;
      this.zahtev.idPacijenta = this.$store.state.user.id;

      if (this.izabraniVremePregleda == "") {
        this.error = true;
        this.errorMessage =
          "Morate izabrati vreme za koje zelite da podnesete zahtv";
        return;
      }

      this.zahtev.vreme = this.izabraniVremePregleda.split("-")[0];

      if (this.pretraga.datum == "") {
        this.error = true;
        this.errorMessage =
          "Morate izabrati datum za koji zelite da prikazete slobodne termine";
        return;
      }

      var datum = this.pretraga.datum.split("-");
      this.zahtev.datum = datum[2] + "/" + datum[1] + "/" + datum[0];

      axios
        .post("/pregled/podnesiZahtev", this.zahtev)
        .then(response => {
          this.success = true;
          this.izabraniVremePregleda = "";
          this.izabraniLekar = "";

          this.pretraga.datum = "";
          this.pretraga.tipPregleda = "";
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
    },
    slobodniTerminiLekara(lekar) {
      this.error = false;

      if (this.pretraga.datum == "") {
        this.error = true;
        this.errorMessage =
          "Morate izabrati datum za koji zelite da prikazete slobodne termine";
        return;
      }

      this.izabraniVremePregleda = "";
      this.izabraniLekar = lekar.id;

      axios
        .get("/lekar/slobodniTermini/" + lekar.id + "/" + this.pretraga.datum)
        .then(slobodniTermini => {
          this.slobodniTermini = slobodniTermini.data;
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
      .get("/tipPregleda/tipoviPregledaKlinike/" + this.klinika.id)
      .then(tipoviPregleda => {
        this.tipoviPregleda = tipoviPregleda.data;
        this.tipoviPregleda.forEach(tipPregleda => {
          if (tipPregleda.id === this.$route.params.tipPregleda || tipPregleda.naziv ===  this.$route.params.nazivTipPregleda) {
            this.pretraga.tipPregleda = tipPregleda.id;
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

    if (
      this.$route.params.datum == undefined &&
      this.$route.params.tipPregleda == undefined
    ) {
      axios
        .get("/klinika/postojeciLekariKlinike/" + this.klinika.id)
        .then(lekari => {
          this.lekari = lekari.data;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.pretraga.tipPregleda = this.$route.params.tipPregleda;
      this.pretraga.datum = this.$route.params.datum;
    }

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