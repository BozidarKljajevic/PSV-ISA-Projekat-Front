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

          <b-container v-if="error">
            <b-alert
              show
              variant="danger"
              class="d-flex justify-content-center mt-2"
            >{{errorMessage}}</b-alert>
          </b-container>

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
            @click="oceni(pregled)"
            :class="{oceni:pregled.zavrsen}"
          >
            <template v-slot:header>
              {{pregled.lekar.klinika.naziv}}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="otkaziPregled(pregled)"
                v-if="!pregled.zavrsen"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </template>
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
                  <label>Lekar</label>
                  <label class="form-control">{{pregled.lekar.ime}} {{pregled.lekar.prezime}}</label>
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
          header="Operacije"
          header-html="<h3>Operacije</h3>"
        >
          <b-card align="center">
            <h6>Sortiraj po</h6>
            <b-select v-model="sortirajOperacije">
              <option value="datum">Datumu</option>
              <option value="tipPregleda">Tipu Operacije</option>
            </b-select>
            <b-form-group class="mt-3 mb-0">
              <b-form-radio-group v-model="vrstaOperacije">
                <b-form-radio name="some-radios" value="zavrseno">Zavrsene</b-form-radio>
                <b-form-radio name="some-radios" value="zakazano">Zakazane</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-card>

          <b-card
            border-variant="danger"
            header-border-variant="danger"
            header-text-variant="danger"
            footer-border-variant="danger"
            :footer-text-variant="(operacija.zavrsen)? 'success':'warning'"
            align="center"
            class="mt-4"
            v-for="operacija in operacijeKonacni"
            :key="operacija.id"
            :header="operacija.lekari[0].klinika.naziv"
          >
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label>Operacija</label>
                  <label class="form-control">{{operacija.tipOperacije.naziv}}</label>
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label>Sala</label>
                  <label class="form-control">{{operacija.sala.naziv}}</label>
                </div>
              </div>
            </div>
            <label>Lekari</label>
            <div class="row" v-for="lekar in operacija.lekari" :key="lekar.id">
              <div class="col">
                <div class="md-form pb-3">
                  <label class="form-control">{{lekar.ime}} {{lekar.prezime}}</label>
                </div>
              </div>
            </div>
            <label class="form-control">{{operacija.datum}} - {{operacija.vreme}}</label>
            <template v-slot:footer>
              <span v-if="operacija.zavrsen">Zavrsen</span>
              <span v-else>Zakazan</span>
            </template>
          </b-card>
        </b-card>
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
              <option value="tipPregleda">Tipu</option>
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
                  <label>Lekar</label>
                  <label class="form-control">{{zahtev.lekar.ime}} {{zahtev.lekar.prezime}}</label>
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
    <b-modal id="oceni-modal" centered hide-footer title="Ocena klinike i lekara">
      <b-card border-variant="warning" header-bg-variant="transparent" align="center">
        <b-card-text>
          <div class="row mt-2">
            <div class="col">
              <label>{{ocenaData.lekar.klinika.naziv}}</label>
              <b-select v-model="ocenaKlinika">
                <option value="0">Niste Ocenili</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </b-select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <label>{{ocenaData.lekar.ime}} {{ocenaData.lekar.prezime}}</label>
              <b-select v-model="ocenaLekar">
                <option value="0">Niste Ocenili</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </b-select>
            </div>
          </div>
        </b-card-text>
        <template v-slot:footer>
          <b-button variant="success" @click="oceniKraj">Oceni</b-button>
        </template>
      </b-card>
    </b-modal>
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
      sortirajOperacije: "datum",
      sortirajZahtevi: "datum",
      vrstaPregleda: "zavrseno",
      vrstaOperacije: "zavrseno",
      vrstaZahteva: "pregled",
      ocenaData: {
        lekar: {
          id: "",
          ime: "",
          prezime: "",
          klinika: {
            id: "",
            naziv: ""
          }
        }
      },
      ocenaLekar: 0,
      ocenaKlinika: 0,
      error: false,
      errorMessage: ""
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
    compareOperacije(a, b) {
      if (this.sortirajOperacije === "tipPregleda") {
        if (a.tipOperacije.naziv < b.tipOperacije.naziv) {
          return -1;
        }
        if (a.tipOperacije.naziv > b.tipOperacije.naziv) {
          return 1;
        }
      } else if (this.sortirajOperacije === "datum") {
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
    },
    oceni(data) {
      if (data.zavrsen) {
        axios
          .get(
            "ocena/ocena/" +
              this.$store.state.user.id +
              "/" +
              data.lekar.id +
              "/" +
              data.lekar.klinika.id
          )
          .then(ocena => {
            this.ocenaData = data;
            this.ocenaLekar = ocena.data.ocenaLekar;
            this.ocenaKlinika = ocena.data.ocenaKlinike;
            this.$bvModal.show("oceni-modal");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    oceniKraj() {
      axios
        .post(
          "ocena/oceni/" +
            this.$store.state.user.id +
            "/" +
            this.ocenaData.lekar.id +
            "/" +
            this.ocenaLekar +
            "/" +
            this.ocenaData.lekar.klinika.id +
            "/" +
            this.ocenaKlinika
        )
        .then(() => {
          this.ocenaData = {
            lekar: {
              id: "",
              ime: "",
              prezime: "",
              klinika: {
                id: "",
                naziv: ""
              }
            }
          };
          this.$bvModal.hide("oceni-modal");
          this.ocenaLekar = 0;
          this.ocenaKlinika = 0;
        })
        .catch(error => {
          console.log(error);
        });
    },
    otkaziPregled(pregled) {
      this.error = false;
      this.errorMessage = "";

      axios
        .post(
          "pregled/otkaziPregledPacijent/" +
            pregled.id +
            "/" +
            this.$store.state.user.id
        )
        .then(response => {
          this.pregledi = response.data;
        })
        .catch(error => {
          console.log(error);
          this.error = true;
          this.errorMessage = error.response.data;
        });
    }
  },
  computed: {
    preglediKonacni() {
      var preglediTemp = [];
      var tipPregledaTemp;

      this.error = false;
      this.errorMessage = "";

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
    operacijeKonacni() {
      var operacijeTemp = [];
      var tipPregledaTemp;

      if (this.vrstaOperacije === "zavrseno") {
        tipPregledaTemp = true;
      } else {
        tipPregledaTemp = false;
      }

      this.operacije.sort(this.compareOperacije).forEach(operacija => {
        if (operacija.zavrsen === tipPregledaTemp) {
          operacijeTemp.push(operacija);
        }
      });

      return operacijeTemp;
    },
    zahteviKonacni() {
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

    axios
      .get("operacija/operacijePacijenta/" + this.$store.state.user.id)
      .then(response => {
        this.operacije = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.oceni:hover {
  border-width: thick;
}
</style>