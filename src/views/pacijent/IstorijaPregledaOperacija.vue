<template>
  <b-container>
    <div class="row mt-3">
      <div class="col">
        <b-card
          border-variant="secondary"
          header-border-variant="secondary"
          header-text-variant="secondary"
          align="center"
          header="Pregledi"
          header-html="<h3>Pregledi</h3>"
        >
          <b-card align="center">
            <h6>Sortiraj po</h6>
            <b-select v-model="sortirajPregledi">
              <option value="datum">Datumu</option>
              <option value="tipPregleda">Tipu Pregleda</option>
            </b-select>
            <b-form-group class="mt-3 mb-0">
              <b-form-radio-group v-model="vrstaPregleda">
                <b-form-radio name="some-radios" value="zavrseno">Zavreni</b-form-radio>
                <b-form-radio name="some-radios" value="zakazano">Zakazani</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-card>

          <b-card
            border-variant="danger"
            header-border-variant="danger"
            header-text-variant="danger"
            footer-border-variant="danger"
            :footer-text-variant="(pregled.zavrsen)? 'success':'warning'"
            align="center"
            class="mt-4"
            v-for="pregled in preglediKonacni"
            :key="pregled.id"
            :header="pregled.lekar.klinika.naziv"
          >
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label>Pregled</label>
                  <label class="form-control">{{pregled.tipPregleda.naziv}}</label>
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label>Sala</label>
                  <label class="form-control">{{pregled.sala.naziv}}</label>
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label>Doktor</label>
                  <label class="form-control">{{pregled.lekar.ime}}</label>
                </div>
              </div>
              <label class="form-control">{{pregled.datum}} - {{pregled.vreme}}</label>
              <div class="row"></div>
            </div>
            <template v-slot:footer>
              <span v-if="pregled.zavrsen">Zavrsen</span>
              <span v-else>Zakazan</span>
            </template>
          </b-card>
        </b-card>
      </div>
      <div class="col">
        <b-card
          border-variant="secondary"
          header-border-variant="secondary"
          header-text-variant="secondary"
          align="center"
          header="Zakazane Operacije"
          header-html="<h3>Zakazane Operacije</h3>"
        ></b-card>
      </div>
    </div>
    <div class="row mt-4 mb-3">
      <div class="col">
        <b-card
          border-variant="secondary"
          header-border-variant="secondary"
          header-text-variant="secondary"
          align="center"
          header="Zahtevi"
          header-html="<h3>Zahtevi</h3>"
        >
          <b-card align="center">
            <h6>Sortiraj po</h6>
            <b-select v-model="sortirajZahtevi">
              <option value="datum">Datumu</option>
              <option value="tipPregleda">Tipu Pregleda</option>
            </b-select>
            <b-form-group class="mt-3 mb-0">
              <b-form-radio-group v-model="vrstaZahteva">
                <b-form-radio name="some-radios" value="pregled">Pregled</b-form-radio>
                <b-form-radio name="some-radios" value="operacija">Operacija</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-card>
          <b-card
            border-variant="danger"
            header-border-variant="danger"
            header-text-variant="danger"
            footer-border-variant="danger"
            :footer-text-variant="(zahtev.izbor)? 'success':'warning'"
            align="center"
            class="mt-4"
            v-for="zahtev in zahteviKonacni"
            :key="zahtev.id"
            :header="zahtev.lekar.klinika.naziv"
          >
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label>Tip</label>
                  <label class="form-control">{{zahtev.tipPregleda.naziv}}</label>
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label>Datum</label>
                  <label class="form-control">{{zahtev.datum}} - {{zahtev.vreme}}</label>
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label>Doktor</label>
                  <label class="form-control">{{zahtev.lekar.ime}}</label>
                </div>
              </div>
            </div>
            <template v-slot:footer>
              <span v-if="zahtev.izbor">Pregled</span>
              <span v-else>Operacija</span>
            </template>
          </b-card>
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
      pregledi: [],
      operacije: [],
      zahtevi: [],
      sortirajPregledi: "datum",
      sortirajZahtevi: "datum",
      vrstaPregleda: "zavrseno",
      vrstaZahteva: "pregled"
    };
  },
  methods: {
    comparePregledi(a, b) {
      if (this.sortirajPregledi === "tipPregleda") {
        if (a.tipPregleda.naziv < b.tipPregleda.naziv) {
          return -1;
        }
        if (a.tipPregleda.naziv > b.tipPregleda.naziv) {
          return 1;
        }
      } else if (this.sortirajPregledi === "datum") {
        var datumA = a.datum.split("/");
        var datumB = b.datum.split("/");

        datumA = datumA[1] + "/" + datumA[0] + "/" + datumA[2];
        datumB = datumB[1] + "/" + datumB[0] + "/" + datumB[2];

        datumA = new Date(datumA);
        datumB = new Date(datumB);

        if (datumA < datumB) {
          return -1;
        }
        if (datumA > datumB) {
          return 1;
        }
      }

      return 0;
    },
    compareZahtevi(a, b) {
      if (this.sortirajZahtevi === "tipPregleda") {
        if (a.tipPregleda.naziv < b.tipPregleda.naziv) {
          return -1;
        }
        if (a.tipPregleda.naziv > b.tipPregleda.naziv) {
          return 1;
        }
      } else if (this.sortirajZahtevi === "datum") {
        var datumA = a.datum.split("/");
        var datumB = b.datum.split("/");

        datumA = datumA[1] + "/" + datumA[0] + "/" + datumA[2];
        datumB = datumB[1] + "/" + datumB[0] + "/" + datumB[2];

        datumA = new Date(datumA);
        datumB = new Date(datumB);

        if (datumA < datumB) {
          return -1;
        }
        if (datumA > datumB) {
          return 1;
        }
      }

      return 0;
    }
  },
  computed: {
    preglediKonacni() {
      var preglediTemp = [];
      var tipPregledaTemp;

      if (this.vrstaPregleda === "zavrseno") {
        tipPregledaTemp = true;
      } else {
        tipPregledaTemp = false;
      }

      this.pregledi.sort(this.comparePregledi).forEach(pregled => {
        if (pregled.zavrsen === tipPregledaTemp) {
          preglediTemp.push(pregled);
        }
      });

      return preglediTemp;
    },
    zahteviKonacni(){
      var zahteviTemp = [];
      var tipPregledaTemp;

      if (this.vrstaZahteva === "pregled") {
        tipPregledaTemp = true;
      } else {
        tipPregledaTemp = false;
      }

      this.zahtevi.sort(this.compareZahtevi).forEach(zahtev => {
        if (zahtev.izbor === tipPregledaTemp) {
          zahteviTemp.push(zahtev);
        }
      });

      return zahteviTemp;
    }
  },
  mounted() {
    axios
      .get("pregled/zakzaniPregledi/" + this.$store.state.user.id)
      .then(response => {
        this.pregledi = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("zahtevi/zahteviPacijenta/" + this.$store.state.user.id)
      .then(response => {
        this.zahtevi = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>