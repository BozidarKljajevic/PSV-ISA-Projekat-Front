<template>
  <div>
    <div class="row">
      <div class="col">
        <b-container v-if="error">
          <b-alert show variant="danger" class="d-flex justify-content-center">{{errormessage}}</b-alert>
        </b-container>
        <div class="container d-flex justify-content-center" style="margin-top: 20px">
          <div class="card" style="width: 80%">
            <div class="header pt-1 grey lighten-2">
              <div class="row d-flex justify-content-start">
                <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Sala</h3>
              </div>
            </div>

  <b-container>
         

          <button
                  type="button"
                  class="btn btn-outline-primary mt-4 btn-block z-depth-2"
                 @click="btnSlobodnaSala"
                >Ukoliko nema sala otvori za prvi sledeci slobodan termin za neku sala i izabranog lekara</button>
          
         <h6 class="mt-4" v-if="prikaziSlobodno">Prvi sledeci slobodni termin za koji postoji sala: {{slobodna}}</h6>
                      
        </b-container>

            <b-container class="mt-4" v-if="pretraziKalendarBtnClickerd">
              <div class="row">
                <button
                  type="button"
                  class="btn btn-outline-secondary mt-4 btn-block z-depth-2"
                  @click="ukloniKalendar"
                >Ukloni kalendar</button>
                <vue-cal
                  :selected-date="dat"
                  :time-from="6 * 60"
                  :time-to="23 * 60"
                  :disable-views="['years']"
                  :events="events"
                ></vue-cal>
              </div>
            </b-container>
            <b-container class="mt-4">
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-block z-depth-2"
                    @click="prikaziPretragu"
                  >{{pretraziBtnClickerd? "Ukloni":"Prikazi"}} polja za koje je pretrazena sala</button>
                </div>
              </div>
            </b-container>

            <b-container class="mt-4" v-if="pretraziBtnClickerd">
              <div class="row">
                <div class="col">
                  <h4>Datum</h4>
                  <b-form-group>
                    <b-form-input type="date" v-model="dat"></b-form-input>
                  </b-form-group>
                </div>
                <div class="col">
                  <h4>Vreme</h4>
                  <b-form-group>
                    <b-form-input type="text" v-model="vr"></b-form-input>
                  </b-form-group>
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

            <b-container class="mt-4">
              <div class="row">
                <div class="col">
                  <h4>Naziv Sale</h4>
                  <b-select v-model="naz">
                    <option v-for="s in SaleKlinike" :key="s.id" :value="s.naziv">{{s.naziv}}</option>
                  </b-select>
                </div>

                <div class="col">
                  <h4>Broj sale</h4>
                  <b-select v-model="br">
                    <option v-for="s in SaleKlinike" :key="s.id" :value="s.broj">{{s.broj}}</option>
                  </b-select>
                </div>
              </div>
            </b-container>

            <div class="form-group" v-for="sala in pretraziPoSalamaiBroju" :key="sala.id">
              <div class="card-body mx-8 mt-6">
                <div class="row">
                  <div class="col">
                    <div class="md-form">
                      <label for="Form-ime">Naziv</label>
                      <input
                        id="Form-ime"
                        class="form-control"
                        v-model="sala.naziv"
                        :disabled="!izmeni"
                      />
                      <label for="Form-ime">Broj</label>
                      <input
                        id="Form-ime"
                        class="form-control"
                        v-model="sala.broj"
                        :disabled="!izmeni"
                      />

                      <button
                        type="button"
                        class="btn btn-outline-secondary mt-4 btn-block z-depth-2"
                        @click="prikaziKalendar(sala.id)"
                      >Prikazi kalendar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <b-container class="mt-4">
          <div class="col-6 mb-4" v-for="zahtev in zahteviComputed" :key="zahtev.id">
            <b-card bg-variant="danger" text-variant="white" header="Operacija" class="text-center">
              <div class="row">
                <div class="col">
                  <div class="md-form">
                    <label>Tip Operacije</label>
                    <label class="form-control">{{zahtev.tipPregleda.naziv}}</label>
                    <label>Datum</label>
                    <input
                      class="form-control text-center"
                      :disabled="!izmeni"
                      v-model="zahtev.datum"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="md-form pb-3">
                    <label>Klinika</label>
                    <label class="form-control">{{zahtev.lekar.klinika.naziv}}</label>
                    <label>Vreme</label>
                    <input
                      class="form-control text-center"
                      :disabled="!izmeni"
                      v-model="zahtev.vreme"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="md-form pb-3">
                    <!--<label class="typo__label">Lekar</label>-->
                    <!--<multiselect v-model="SelektovaniLekari[0]" placeholder="Search" label="ime" track-by="ime" :options="LekariKlinike" :multiple="false"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>-->
                    <!---pre class="language-json"><code>{{ SelektovaniLekari  }}</code></pre--->

                    <!--<label class="typo__label">Lekar</label>-->
                    <!--<multiselect v-model="SelektovaniLekari[1]" placeholder="Search" label="ime" track-by="ime" :options="LekariKlinike" :multiple="false"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>-->
                    <!---pre class="language-json"><code>{{ SelektovaniLekari  }}</code></pre--->

                    <!-- <label class="typo__label">Lekar</label>-->
                    <!--<multiselect v-model="SelektovaniLekari[2]" placeholder="Search" label="ime" track-by="ime" :options="LekariKlinike" :multiple="false"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>-->
                    <!---pre class="language-json"><code>{{ SelektovaniLekari  }}</code></pre--->

                    <label>Cena</label>
                    <label class="form-control">{{zahtev.cena}}</label>
                  </div>
                </div>
              </div>

              <div>
                <label for="Form-klinika">Dodaj salu</label>
                <b-form-select v-model="selektovanaSala">
                  <option v-for="sale in SaleKlinike" :value="sale.id" :key="sale.id">{{sale.naziv}}</option>
                </b-form-select>
              </div>

              <div>
                <label for="Form-klinika">Dodaj lekar</label>
                <b-form-select v-model="zahtev.lekar.id">
                  <option
                    v-for="lekar in lekari1"
                    :value="lekar.id"
                    :key="lekar.id"
                    :disabled="!izmeni"
                  >{{lekar.ime}}</option>
                </b-form-select>
              </div>

              <div>
                <label for="Form-klinika">Dodaj lekar</label>
                <b-form-select v-model="selektovaniLekar1">
                  <option
                    v-for="lekar in lekari2"
                    :value="lekar.id"
                    :key="lekar.id"
                    :disabled="!izmeni"
                  >{{lekar.ime}}</option>
                </b-form-select>
              </div>

              <div>
                <label for="Form-klinika">Dodaj lekar</label>
                <b-form-select v-model="selektovaniLekar2">
                  <option
                    v-for="lekar in lekari3"
                    :value="lekar.id"
                    :key="lekar.id"
                    :disabled="!izmeni"
                  >{{lekar.ime}}</option>
                </b-form-select>
              </div>
              <template v-if="!izmeni">
                <button
                  type="button"
                  class="btn btn-success btn-block mt-2 z-depth-2"
                  @click="aktivirajPregled(zahtev.id)"
                >pretrazi salu za izabran zahtev</button>
                <div v-if="kliknuto">
                  <button
                    type="button"
                    class="btn btn-info btn-block z-depth-2"
                    @click="izmeniClick"
                  >Izmeni</button>
                  <button
                    type="button"
                    class="btn btn-success btn-block mt-2 z-depth-2"
                    @click="rezervisiSalu(zahtev)"
                  >Zakazi operaciju</button>
                </div>
              </template>
              <template v-else>
                <button
                  type="button"
                  class="btn btn-success mt-4 btn-block z-depth-2"
                  @click="sacuvajPodatke(zahtev)"
                >Sačuvaj i pretrazi</button>
              </template>
            </b-card>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import Multiselect from "vue-multiselect";

export default {
  components: { VueCal, Multiselect },
  data() {
    return {
      izmeni: false,
      error: "",
      errormessage: "",
      SaleKlinike: [],
      zahtevi: [],
      events: [],
      selektovanaSala: "",
      selektovanaSalaa: "",
      dat: "",
      naz: "",
      br: "",
      vr: "",
      idOperacije: "",
      idSale: "",
      LekariKlinike: [],
      selektovaniLekar1: "",
       prikaziSlobodno: false,
      selektovaniLekar2: "",
      SelektovaniLekari: [],
      kliknuto: false,
      izmeni: false,

      pretraziBtnClickerd: false,
      pretraziKalendarBtnClickerd: false,
    };
  },
  computed: {
    lekari1(){
      var lekari = []
      this.LekariKlinike.forEach(lekar => {
        if (lekar.id != this.selektovaniLekar1 && lekar.id != this.selektovaniLekar2) {
          lekari.push(lekar);
        }
      });
      return lekari;
    },
    lekari2(){
      var lekari = []
      this.LekariKlinike.forEach(lekar => {
        if (lekar.id != this.selektovaniLekar2) {
          lekari.push(lekar);
        }
      });
      return lekari;
    },
    lekari3(){
      var lekari = []
      this.LekariKlinike.forEach(lekar => {
        if (lekar.id != this.selektovaniLekar1) {
          lekari.push(lekar);
        }
      });
      return lekari;
    },
    pretraziPoSalamaiBroju() {
      var sale = [];

      if (this.naz !== "" && this.br === "") {
        this.SaleKlinike.forEach(s => {
          if (s.naziv === this.naz) {
            sale.push(s);
          }
        });
        return sale;
      } else if (this.naz === "" && this.br !== "") {
        this.SaleKlinike.forEach(s => {
          if (s.broj === this.br) {
            sale.push(s);
          }
        });
        return sale;
      } else if (this.naz !== "" && this.br !== "") {
        this.SaleKlinike.forEach(s => {
          if (s.naziv === this.naz && s.broj === this.br) {
            sale.push(s);
          }
        });
        return sale;
      } else {
        return this.SaleKlinike;
      }
    },

    zahteviComputed() {
      // this.idPregleda = idP;

      var zahtevv = [];
      if (this.kliknuto === true) {
        this.zahtevi.forEach(z => {
          if (z.id === this.idOperacije) {
            zahtevv.push(z);
          }
        });
        return zahtevv;
      } else {
        return this.zahtevi;
      }
    }
  },
  methods: {
     btnSlobodnaSala() {
      if(this.SaleKlinike == 0)
        this.prikaziSlobodno = !this.prikaziSlobodno; 
    },
    aktivirajPregled(idP) {
      this.idOperacije = idP;

      this.kliknuto = true;
      this.zahtevi.forEach(z => {
        if (z.id === this.idOperacije) {
          var splitText = [];
          splitText = z.datum.split("/");
          this.dat = splitText[2] + "-" + splitText[1] + "-" + splitText[0];
          // this.dat = z.datum;
          this.vr = z.vreme;
        }
      });

      axios
        .get(
          "/salaKLinike/SaleKlinikeOperacije/" +
            this.$store.state.user.id +
            "/" +
            this.idOperacije
        )
        .then(SaleKlinike => {
          this.SaleKlinike = SaleKlinike.data;
          this.selektovanaSala = "";
        })
        .catch(error => {
          console.log(error);
        });


       axios
        .get("/salaKLinike/slobodniTermin/" + 
             this.idOperacije)
        .then(response => {
         
          this.slobodna = response.data;
        })
        .catch(error => {
          console.log(error);
        }); 

      axios
        .get(
          "/lekar/moguciLekariZaOperaciju/" +
            this.$store.state.user.id +
            "/" +
            this.idOperacije
        )
        .then(response => {
          console.log(response.data);
          this.LekariKlinike = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    izmeniClick() {
      this.izmeni = true;
    },
    prikaziPretragu() {
      this.pretraziBtnClickerd = !this.pretraziBtnClickerd;
    },
    ukloniKalendar() {
      this.pretraziKalendarBtnClickerd = false;
    },
    prikaziKalendar(idS) {
      this.pretraziKalendarBtnClickerd = true;
      this.idSale = idS;
      if (this.dat === "-" || this.dat === "") {
        this.dat = "2020-01-20";
      }

      axios
        .get("/salaKLinike/kalendar/" + this.idSale)
        .then(events => {
          this.events = events.data;
          console.log(events.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    sacuvajPodatke(zahtev) {
      this.idOperacije = zahtev.id;

      if (zahtev.vreme === "" || zahtev.datum === "") {
        this.error = true;
        this.errormessage = "Molimo Vas popunite sva polja";
        return;
      }

      var r = /^[0-9]{2}:[0]{2}$/;
     var d = /^[0-9]{2}:30$/;
      if (!r.test(String(zahtev.vreme.trim())) && !d.test(String(zahtev.vreme.trim()))) {
        this.errormessage = "Radno vreme mora u formatu 00:00";
        this.error = true;
        return;
      }

      var r = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
      if (!r.test(String(zahtev.datum.trim()))) {
        this.errormessage = "Datum mora u formatu dd/mm/yyyy";
        this.error = true;
        return;
      }

      axios
        .post("/zahtevi/izmeniZahtev", zahtev)
        .then(zahtevi => {
          this.izmeni = false;
        })
        .catch(error => {
          console.log(error);
        });

      axios
        .get(
          "/salaKLinike/SaleKlinikeOperacije/" +
            this.$store.state.user.id +
            "/" +
            this.idOperacije
        )
        .then(SaleKlinike => {
          console.log(SaleKlinike.data);
          this.SaleKlinike = SaleKlinike.data;
        })
        .catch(error => {
          console.log(error);
        });

        var flag = false;

      axios
        .get(
          "/lekar/moguciLekariZaOperaciju/" +
            this.$store.state.user.id +
            "/" +
            this.idOperacije
        )
        .then(response => {
          console.log(response.data);
          this.LekariKlinike = response.data;
          this.LekariKlinike.forEach(lekar => {
              if(lekar.id === zahtev.lekar.id) {
                flag = true;
                return;
              }
            });
            if(flag === false) {
           // alert(this.lekari.length)
            
           if(this.LekariKlinike.length == 0)
                {
                 
                   this.errormessage = "nemate lekara";
                   this.error = true;
                   return

                }
                else {
            zahtev.lekar  = this.LekariKlinike[0];
                }
          }
        })
        .catch(error => {
          console.log(error);
        });

    },

    pretrazi() {
      if (this.dat === "-" || this.vr === "-" || this.idOperacije === "-") {
        this.error = true;
        this.errormessage = "Niste aktivirali pregled ili uneli datum i vreme";
        return;
      }

      if (this.dat === "" || this.vr === "" || this.idOperacije === "") {
        this.error = true;
        this.errormessage = "Niste aktivirali pregled ili uneli datum i vreme";
        return;
      }

      if (this.dat === "") {
        this.dat = "-";
      }

      if (this.vr === "") {
        this.vr = "-";
      }

      this.error = false;
      axios
        .get(
          "/salaKLinike/SaleKlinike/" +
            this.$store.state.user.id +
            "/" +
            this.dat +
            "/" +
            this.vr +
            "/" +
            this.idOperacije
        )
        .then(SaleKlinike => {
          this.SaleKlinike = SaleKlinike.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    /*  izmeniClick() {
      this.izmeni = true;
    }, */

    rezervisiSalu(zahtev) {
      if (this.selektovanaSala === "") {
        this.error = true;
        this.errormessage = "Niste izabrali mogucu salu";
        return;
      }

      if(this.LekariKlinike.length == 0)
                {
                 
                   this.errormessage = "nemate lekara";
                   this.error = true;
                   return

                }
      var flag = false;
     this.LekariKlinike.forEach(lekar => {
              if(lekar.id === zahtev.lekar.id) {
                flag = true;
                return;
              }

          });
         
          if(flag === false) {
           
            zahtev.lekar  = this.LekariKlinike[0];
          }

      if (this.selektovaniLekar1 == "") {
        this.selektovaniLekar1 = -1;
      }
      if (this.selektovaniLekar2 == "") {
        this.selektovaniLekar2 = -1;
      }
      axios
        .post(
          "/zahtevi/rezervisi/" +
            this.selektovanaSala +
            "/" +
            this.selektovaniLekar1 +
            "/" +
            this.selektovaniLekar2,
          zahtev
        )
        .then(response => {
          this.kliknuto = false;
          this.zahtevi = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/zahtevi/zahteviZaOperacije/" + this.$store.state.user.id)
      .then(response => {
        console.log(response.data);
        this.zahtevi = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    if (this.dat === "") {
      this.dat = "-";
    }

    if (this.vr === "") {
      this.vr = "-";
    }
    if (this.idOperacije === "") {
      this.idOperacije = "-";
    }

    axios
      .get(
        "/salaKLinike/SaleKlinike/" +
          this.$store.state.user.id +
          "/" +
          this.dat +
          "/" +
          this.vr +
          "/" +
          this.idOperacije
      )
      .then(SaleKlinike => {
        this.SaleKlinike = SaleKlinike.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/lekar/postojeciLekariKlinike/" + this.$store.state.user.id)
      .then(LekariKlinike => {
        this.LekariKlinike = LekariKlinike.data;
        console.log(this.LekariKlinike);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>