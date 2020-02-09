<template>
  <b-container class="d-flex justify-content-center" style="margin-top: 20px">
    <b-card style="width: 60%">
      <div class="header pt-3 lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Karton</h3>
        </div>
      </div>

      <b-card
        border-variant="info"
        header-bg-variant="info"
        header-text-variant="white"
        :header="karton.pacijent.ime + ' ' + karton.pacijent.prezime"
        align="center"
        class="mt-4"
      >
        <b-card-text>
          <div class="row">
            <div class="col">
              <label>Datum rodjenja</label>
              <label class="form-control">{{karton.datumRodjenja}}</label>
            </div>
            <div class="col">
              <label>Pol</label>
              <label class="form-control">{{karton.pol}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Visina</label>
              <label class="form-control">{{karton.visina}}</label>
            </div>
            <div class="col">
              <label>Tezina</label>
              <label class="form-control">{{karton.tezina}}</label>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Krvna grupa</label>
              <label class="form-control">{{karton.krvnaGrupa}}</label>
            </div>
            <div class="col">
              <label>Dioptrija</label>
              <label class="form-control">{{karton.dioptrija}}</label>
            </div>
          </div>
        </b-card-text>
        <b-card-text class="mt-4" v-if="izvestaji.length > 0">
          <b-alert variant="info" show>Izvestaji</b-alert>
          <b-card
            border-variant="secondary"
            :header="izvestaj.lekar.ime+' '+izvestaj.lekar.prezime"
            header-border-variant="secondary"
            align="center"
            v-for="izvestaj in izvestaji"
            :key="izvestaj.id"
            class="mt-2"
          >
            <b-card-text>
              <div class="row">
                <div class="col">
                  <label>Bolest</label>
                    <b-form-select v-model="izvestaj.bolest" :disabled="!izmeni1">
                      <option v-for="bol in bolesti" :value="bol" :key="bol.sifra">{{bol.naziv}}</option>
                    </b-form-select>
                  <template v-if="izvestaj.lekar.id == $store.state.user.id">
                  <template v-if="!izmeni1">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="izmeniIzvestaj()"
                  >Izmeni Izvestaj</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-success btn-block z-depth-2"
                    @click="sacuvajIzvestaj(izvestaj)"
                  >Sačuvaj</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="odustaniIzvestaj(izvestaj.id)"
                  >Odustani</button>
                </template>
                </template>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <b-button variant="outline-secondary" @click="vidiRecept(izvestaj.recept)" v-if="izvestaj.recept.overen">Vidi recept</b-button>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </b-card-text>
      </b-card>
    </b-card>
    <b-modal id="recept" centered hide-footer :title="'Recept - overeno od strane: '+overenoOdStrane.ime+' '+overenoOdStrane.prezime">
      <b-card border-variant="success" header="Lekovi" align="center">
        <b-card-text>
          <label class="form-control" v-for="lek in lekovi" :key="lek.id">{{lek.naziv}}</label>
        </b-card-text>
      </b-card>
  </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      karton: {
        pacijent: {
          ime: "",
          prezime: ""
        }
      },
      izvestaji: [],
      lekovi:[],
      overenoOdStrane: {},
      izmeni1: false,
      bolesti: [],
    };
  },
  methods: {
    izmeniIzvestaj() {
        this.izmeni1 = true;
    },
    odustaniIzvestaj(odustaniIzvestajID){
      this.izmeni1 = false;
      axios
          .get("/izvestajpregleda/odustaniIzmeneIzvestaja/" + odustaniIzvestajID)
          .then(response => {
            this.izvestaji= response.data;;
          })
          .catch(error => {
            console.log(error);
          });
    },
    
    sacuvajIzvestaj(izvestaj){
      axios
          .post("/izvestajpregleda/sacuvajIzmeneIzvestaja", izvestaj)
          .then(response => {
            this.izvestaji= response.data;
            this.izmeni1 = false;
          })
          .catch(error => {
            console.log(error);
          });
    },

    vidiRecept(recept){
      this.$bvModal.show("recept");
      this.lekovi = recept.lekovi;
      this.overenoOdStrane = recept.sestra;
    }
  },
  mounted() {
    axios
      .get("/bolesti/postojeceBolesti")
      .then(bolesti => {
        this.bolesti = bolesti.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("karton/kartonPacijenta/" + this.$route.params.id)
      .then(karton => {
        this.karton = karton.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("karton/izvestajiKartonaPacijenta/" + this.$route.params.id)
      .then(izvestaji => {
        this.izvestaji = izvestaji.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>