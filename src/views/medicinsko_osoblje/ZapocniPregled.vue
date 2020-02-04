<template>
  <div>
    <div>
      <div class="container d-flex justify-content-center" style="margin-top: 20px">
        <div class="card" style="width: 60%">
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
                          >{{ values.length }} izabran/o</span>
                        </template>
                      </multiselect>
                      <!--<pre class="language-json"><code>{{ value  }}</code></pre>-->
                    </div>

                    <button
                      type="button"
                      class="btn btn-danger btn-block mt-2 z-depth-2"
                    >Prosledi recept</button>

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
      user: {},
      lekovi: [],
      bolesti: [],
      zahtev: {
        pacijent: {},
        lekar: {},
        bolest: {},
        lekovi: []
      }
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
  },

  methods: {
    zavrsiPregled() {

      console.log(this.zahtev);

      axios
        .post("/izvestajpregleda/zavrsi/" + this.$route.params.id, this.zahtev)
        .then(response => {})
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>

</style>