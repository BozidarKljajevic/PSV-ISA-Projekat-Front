<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <b-container class="card" style="width: 60%">
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h1 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Klinike</h1>
        </div>
      </div>

      <b-container v-if="errorFlag">
        <b-alert
          show
          variant="danger"
          class="d-flex justify-content-center mt-2"
        >Kod pretrage morate uneti datum pregleda kao i tip pregleda</b-alert>
      </b-container>

      <b-container class="mt-4">
        <h4>Sortiraj po</h4>
        <b-select v-model="sortirajPo">
          <!--<option value>Vremenu Nastanka</option>-->
          <option value="naziv">Naziv</option>
          <option value="ocena">Ocena</option>
        </b-select>
      </b-container>

      <b-container class="mt-4">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-outline-secondary btn-block z-depth-2"
              @click="prikaziPretragu"
            >{{pretraziBtnClickerd? "Ukloni":"Prikazi"}} formu za pretragu</button>
          </div>
        </div>
      </b-container>

      <b-container class="mt-4" v-if="pretraziBtnClickerd">
        <div class="row">
          <div class="col-4">
            <h5>Datum*</h5>
            <b-form-group>
              <b-form-input type="date" v-model="pretraga.datumPregleda"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-4">
            <h5>Tip pregleda*</h5>
            <b-select v-model="pretraga.tipPregleda">
              <option
                v-for="tipPregleda in tipoviPregleda"
                :key="tipPregleda.id"
                :value="tipPregleda.id"
              >{{tipPregleda.naziv}}</option>
            </b-select>
          </div>
          <div class="col-4">
            <h4>Ocena</h4>
            <b-select v-model="pretraga.ocenaKlinike">
              <option value>-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </b-select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-secondary btn-block z-depth-2"
              @click="pretrazi"
            >Pretrazi</button>
          </div>
        </div>
      </b-container>

      <b-container class="mt-4 mb-2">
        <div class="row">
          <div class="col">
            <h5>Drzava</h5>
            <b-select v-model="selektovanaDrzava">
              <option value>-</option>
              <option v-for="drzava in drzave" :key="drzava" :value="drzava">{{drzava}}</option>
            </b-select>
          </div>
          <div class="col">
            <h5>Grad</h5>
            <b-select v-model="selektovaniGrad">
              <option value>-</option>
              <option v-for="grad in gradovi" :key="grad" :value="grad">{{grad}}</option>
            </b-select>
          </div>
        </div>
      </b-container>

      <b-card
        border-variant="danger"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center"
        class="mt-4"
        v-for="klinika in konacneKlinike"
        :header="klinika.naziv"
        :key="klinika.id"
        @click="otvoriKliniku(klinika)"
      >
        <div class="row">
          <div class="col">
            <div class="md-form">
              <label>Adresa</label>
              <label class="form-control">{{klinika.adresa}}</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form pb-3">
              <label>Ocena</label>
              <label class="form-control">{{klinika.ocena}}</label>
            </div>
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      klinike: [],
      sortirajPo: "naziv",
      drzave: [],
      gradovi: [],
      selektovanaDrzava: "",
      selektovaniGrad: "",
      pretraziBtnClickerd: false,
      tipoviPregleda: [],
      pretraga: {
        datumPregleda: "",
        tipPregleda: "",
        ocenaKlinike: ""
      },
      errorFlag: false
    };
  },
  methods: {
    compare(a, b) {
      if (this.sortirajPo === "naziv") {
        if (a[this.sortirajPo] < b[this.sortirajPo]) {
          return -1;
        }
        if (a[this.sortirajPo] > b[this.sortirajPo]) {
          return 1;
        }
      } else {
        if (a[this.sortirajPo] < b[this.sortirajPo]) {
          return 1;
        }
        if (a[this.sortirajPo] > b[this.sortirajPo]) {
          return -1;
        }
      }
      return 0;
    },
    otvoriKliniku(klinika) {
      if (this.pretraga.datumPregleda == "" && this.pretraga.tipPregleda == "") {
        this.$router.push("/klinika/" + klinika.id + "/" + klinika.naziv);
      }else{
        this.$router.push("/klinika/" + klinika.id + "/" + klinika.naziv + "/" + this.pretraga.datumPregleda + "/"+ this.pretraga.tipPregleda);
      }
    },
    prikaziPretragu() {
      if (!this.pretraziBtnClickerd) {
        axios
          .get("/tipPregleda/sviTipoviDistinct")
          .then(tipoviPregleda => {
            this.tipoviPregleda = tipoviPregleda.data;
            this.pretraziBtnClickerd = !this.pretraziBtnClickerd;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.pretraziBtnClickerd = !this.pretraziBtnClickerd;
        this.pretraga.datumPregleda = "";
        this.pretraga.tipPregleda = "";
        this.errorFlag = false;
      }
    },
    pretrazi() {
      this.errorFlag = false;

      if (
        this.pretraga.datumPregleda === "" ||
        this.pretraga.tipPregleda === ""
      ) {
        this.errorFlag = true;
        return;
      }

      axios
        .post(
          "/klinika/pretraziKlinike/" +
            this.pretraga.datumPregleda +
            "/" +
            this.pretraga.tipPregleda
        )
        .then(klinike => {
          if (this.pretraga.ocenaKlinike != "") {
            this.klinike = [];
            klinike.data.forEach(klinika => {
              if (parseInt(klinika.ocena, 10) == this.pretraga.ocenaKlinike) {
                this.klinike.push(klinika);
              }
            });
          } else {
            this.klinike = klinike.data;
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    konacneKlinike() {
      var klinike = [];

      if (this.selektovanaDrzava === "" && this.selektovaniGrad === "") {
        klinike = this.klinike.sort(this.compare);
      } else {
        this.klinike.sort(this.compare).forEach(klinika => {
          if (this.selektovanaDrzava === klinika.drzava) {
            if (
              this.selektovaniGrad === "" ||
              this.selektovaniGrad === klinika.grad
            ) {
              klinike.push(klinika);
            }
          } else if (this.selektovanaDrzava === "") {
            if (this.selektovaniGrad === klinika.grad) {
              klinike.push(klinika);
            }
          }
        });
      }

      return klinike;
    }
  },
  watch: {
    selektovanaDrzava: function pribaviGradove(novaDrzava) {
      this.selektovaniGrad = "";

      if (!novaDrzava) {
        novaDrzava = "none";
      }

      axios
        .get("/klinika/gradoviKlinika/" + novaDrzava)
        .then(gradovi => {
          this.gradovi = gradovi.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/klinika/sveKlinike")
      .then(klinike => {
        this.klinike = klinike.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/klinika/drzaveKlinika")
      .then(drzave => {
        this.drzave = drzave.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/klinika/gradoviKlinika/" + "none")
      .then(gradovi => {
        this.gradovi = gradovi.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.card:hover {
  border-width: thick;
}
</style>