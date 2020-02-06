<template>
  <div>
    <div>
      <b-row>
        <b-col>
      <div class="container d-flex justify-content-center" style="margin-top: 20px">
        <div class="card" style="width: 100%">
          <div class="header pt-3 grey lighten-2">
            <div class="row d-flex justify-content-start">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Pregled pacijenta</h3>
            </div>
          </div>
          <div class="form-group">
            <div class="card-body mx-4 mt-4">
              <div class="row">
                <div class="col">
                  <div class="md-form">
                    <label for="Form-ime">Ime</label>
                    <input
                      type="text"
                      id="Form-ime"
                      class="form-control"
                      disabled
                      v-model="user.ime"
                    />

                    <label for="Form-klinika">Bolest</label>
                    <b-form-select v-model="zahtev.bolest">
                      <option v-for="bol in bolesti" :value="bol" :key="bol.sifra">{{bol.naziv}}</option>
                    </b-form-select>

                    <button
                      type="button"
                      class="btn btn-danger btn-block mt-5 z-depth-2"
                      @click="zavrsiPregled"
                    >Zavrsi pregled</button>
                  </div>
                </div>

                <div class="col">
                  <div class="md-form pb-3">
                    <label for="Form-prezime">Prezime</label>
                    <input
                      type="text"
                      id="Form-prezime"
                      class="form-control"
                      disabled
                      v-model="user.prezime"
                    />

                    <div>
                      <label class="typo__label">Lekovi</label>
                      <multiselect
                        v-model="zahtev.lekovi"
                        :options="lekovi"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        placeholder=" Izaberi"
                        label="naziv"
                        track-by="naziv"
                        :preselect-first="true"
                      >
                        <template slot="selection" slot-scope="{ values, search, isOpen }">
                          <span
                            class="multiselect__single"
                            v-if="values.length &amp;&amp; !isOpen"
                          >{{ values.length }} izabran/a</span>
                        </template>
                      </multiselect>
                      <!--<pre class="language-json"><code>{{ value  }}</code></pre>-->
                    </div>


                    
                    <router-link
                      :to="'/ZakaziPregled/'+this.$route.params.id"
                      tag="button"
                      class="btn btn-success mt-2 btn-block z-depth-2"
                    >Zakazi dodatno</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </b-col>
      <b-col>
        
        <b-container class="d-flex justify-content-center" style="margin-top: 20px">
    <b-card style="width: 100%">
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
              <input
                      type="text"
                      id="Form-datum"
                      class="form-control"
                      v-model="karton.datumRodjenja"
                      disabled
                    />
            </div>
            <div class="col">
              <label>Pol</label>
              <input
                      type="text"
                      id="Form-pol"
                      class="form-control"
                      v-model="karton.pol"
                      disabled
                    />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Visina</label>
              <input
                      type="text"
                      id="Form-pol"
                      class="form-control"
                      v-model="karton.visina"
                      :disabled="!izmeni"
                    />
            </div>
            <div class="col">
              <label>Tezina</label>
              <input
                      type="text"
                      id="Form-pol"
                      class="form-control"
                      v-model="karton.tezina"
                      :disabled="!izmeni"
                    />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label>Krvna grupa</label>
              <input
                      type="text"
                      id="Form-pol"
                      class="form-control"
                      v-model="karton.krvnaGrupa"
                      :disabled="!izmeni"
                    />
            </div>
            <div class="col">
              <label>Dioptrija</label>
              <input
                      type="text"
                      id="Form-pol"
                      class="form-control"
                      v-model="karton.dioptrija"
                      :disabled="!izmeni"
                    />
            </div>
          </div>
          <div class="text-center mb-4 mt-4">
                <template v-if="!izmeni">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="izmeniClick"
                  >Izmeni</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-success btn-block z-depth-2"
                    @click="sacuvajClick"
                  >Sačuvaj</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="odustaniClick"
                  >Odustani</button>
                </template>
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
          <label class="form-control" v-for="lek in lekovi1" :key="lek.id">{{lek.naziv}}</label>
        </b-card-text>
      </b-card>
  </b-modal>
    
  </b-container>

      </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect
  },
  data() {
    return {
      izmeni: false,
      izmeni1: false,
      user: {},
      lekovi: [],
      bolesti: [],
      zahtev: {
        pacijent: {},
        lekar: {},
        bolest: {},
        lekovi: []
      },
      karton: {
        pacijent: {
          ime: "",
          prezime: ""
        }
      },
      izvestaji: [],
      lekovi1:[],
      overenoOdStrane: {},
    };
  },

  mounted() {
    axios
      .get("/pacijent/preuzmiPac/" + this.$route.params.id)
      .then(pacijent => {
        this.user = pacijent.data;
        this.zahtev.pacijent = pacijent.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/lekar/lekarPregleda/" + this.$route.params.id)
      .then(lekar => {
        this.zahtev.lekar = lekar.data;
        console.log(this.zahtev);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/lek/postojeciLek")
      .then(lekovi => {
        this.lekovi = lekovi.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/bolesti/postojeceBolesti")
      .then(bolesti => {
        this.bolesti = bolesti.data;
      })
      .catch(error => {
        console.log(error);
      });
      axios
      .get("karton/kartonPacijenta/" + this.$route.params.pacijent)
      .then(karton => {
        this.karton = karton.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("karton/izvestajiKartonaPacijenta/" + this.$route.params.pacijent)
      .then(izvestaji => {
        this.izvestaji = izvestaji.data;
      })
      .catch(error => {
        console.log(error);
      });
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

    izmeniClick() {
      this.izmeni = true;
      console.log('Ulogovan je '+this.$store.state.user.id);
    },
    odustaniClick(){
      this.izmeni = false;
      axios
          .get("/karton/postojeciKarton/" + this.karton.id)
          .then(response => {
            this.karton = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    sacuvajClick() {
      axios
          .post("/karton/sacuvajIzmeneKartona", this.karton)
          .then(response => {
            this.karton = response.data;
            this.izmeni = false;
          })
          .catch(error => {
            console.log(error);
          });
    },

    zavrsiPregled() {

      console.log(this.zahtev);
      console.log('Ulogovan je '+this.$store.state.user.id);
      axios
        .post("/izvestajpregleda/zavrsi/" + this.$route.params.id, this.zahtev)
        .then(response => {
          this.user={};
          this.zahtev.pacijent={};
          this.zahtev.bolest={};
          this.zahtev.lekovi=[];
          this.izvestaji=response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    vidiRecept(recept){
      this.$bvModal.show("recept");
      this.lekovi1 = recept.lekovi;
      this.overenoOdStrane = recept.sestra;
    }
  }
};
</script>

<style>

</style>