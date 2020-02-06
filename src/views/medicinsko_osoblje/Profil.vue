<template>
  <div>
    <div>
      <b-container v-if="error">
        <b-alert show variant="danger" class="d-flex justify-content-center">{{message}}</b-alert>
      </b-container>

      <div class="container d-flex justify-content-center" style="margin-top: 20px">
        <div class="card" style="width: 60%">
          <div class="header pt-3 grey lighten-2">
            <div class="row d-flex justify-content-start">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Profil</h3>
            </div>
          </div>

          <div class="form-group">
            <div class="card-body mx-4 mt-4">
              <div class="row">
                <div class="col">
                  <div class="md-form">
                    <label for="Form-username">E-mail</label>
                    <input
                      type="text"
                      id="Form-username"
                      class="form-control"
                      v-model="user.mail"
                      disabled
                    />

                    <label for="Form-ime">Ime</label>
                    <input
                      type="text"
                      id="Form-ime"
                      class="form-control"
                      v-model="user.ime"
                      :disabled="!izmeni"
                    />

                    <label for="Form-phone">Telefon</label>
                    <input
                      type="text"
                      id="Form-phone"
                      class="form-control"
                      v-model="user.brojTelefona"
                      :disabled="!izmeni"
                    />

                    <label for="Form-email4">Adresa</label>
                    <input
                      type="text"
                      id="Form-email4"
                      class="form-control"
                      v-model="user.adresa"
                      :disabled="!izmeni"
                    />

                    <!--  <label for="Form-email4">Naziv klinike</label>
                    <input type="text" id="Form-email4" class="form-control" v-model="user.idKlinike.naziv" disabled >-->
                    <div v-if="this.$store.state.user.role.authority == 'ADMIN'">
                      <label for="Form-radno">Radno vremo od:</label>
                      <input
                        type="text"
                        id="Form-email4"
                        class="form-control"
                        v-model="user.radnoOd"
                        :disabled="!izmeni"
                      />
                    </div>
                    <div v-else>
                      <label for="Form-radno">Radno vremo od:</label>
                      <input
                        type="text"
                        id="Form-email4"
                        class="form-control"
                        v-model="user.radnoOd"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="md-form pb-3">
                    <label for="Form-city">ID medicinskog osoblja</label>
                    <input
                      type="text"
                      id="Form-city"
                      class="form-control"
                      v-model="user.id"
                      disabled
                    />

                    <label for="Form-prezime">Prezime</label>
                    <input
                      type="text"
                      id="Form-prezime"
                      class="form-control"
                      v-model="user.prezime"
                      :disabled="!izmeni"
                    />

                    <label for="Form-city">Grad</label>
                    <input
                      type="text"
                      id="Form-city"
                      class="form-control"
                      v-model="user.grad"
                      :disabled="!izmeni"
                    />

                    <label for="Form-city">Drzava</label>
                    <input
                      type="text"
                      id="Form-city"
                      class="form-control"
                      v-model="user.drzava"
                      :disabled="!izmeni"
                    />

                    <div v-if="this.$store.state.user.role.authority == 'ADMIN'">
                      <label for="Form-radno">Radno vremo do:</label>
                      <input
                        type="text"
                        id="Form-email4"
                        class="form-control"
                        v-model="user.radnoDo"
                        :disabled="!izmeni"
                      />
                    </div>
                    <div v-else>
                      <label for="Form-radno">Radno vremo do:</label>
                      <input
                        type="text"
                        id="Form-email4"
                        class="form-control"
                        v-model="user.radnoDo"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center mb-4 mt-4" v-if="this.$store.state.user.role.authority == 'LEKAR'">
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
                    @click="sacuvajPodatke"
                  >Sačuvaj</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="odustaniClick"
                  >Odustani</button>
                </template>
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
export default {
  data() {
    return {
      izmeni: false,
      user: {
        idKlinike: {}
      },
      error: false,
      message: "",
      id: ""
    };
  },
  methods: {
    izmeniClick() {
      this.izmeni = true;
    },

    odustaniClick() {
      this.error = false;
      this.izmeni = false;
      if (this.$route.params.id == undefined) {
        this.id = this.$store.state.user.id;

        axios
          .get("/lekar/postojeciLekar/" + this.id)
          .then(medicinskoOsoblje => {
            this.user = medicinskoOsoblje.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.id = this.$route.params.id;
        axios
          .get("/lekar/postojeciLekarAdmin/" + this.id)
          .then(medicinskoOsoblje => {
            this.user = medicinskoOsoblje.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    sacuvajPodatke() {
      this.error = false;
      if (
        this.user.ime === "" ||
        this.user.prezime === "" ||
        this.user.adresa === "" ||
        this.user.grad === "" ||
        this.user.drzava === "" ||
        this.user.brojTelefona === ""
      ) {
        this.message = "Molimo vas popunite sva polja";
        this.error = true;
        return;
      }

      var rex = /^\+381\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.user.brojTelefona.trim()))) {
        this.message = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }

      var r = /^[0-9]{2}:[0-9]{2}$/;
      if (!r.test(String(this.user.radnoDo.trim()))) {
        this.errormessage = "Radno vreme mora u formatu 00:00";
        this.error = true;
        return;
      }

      var rexx = /^[0-9]{2}:[0-9]{2}$/;
      if (!rexx.test(String(this.user.radnoOd.trim()))) {
        this.errormessage = "Radno vreme mora u formatu 00:00";
        this.error = true;
        return;
      }
      if (this.$store.state.user.role.authority == "LEKAR") {
        axios
          .post("/lekar/izmeniLekara", this.user)
          .then(medicinskoOsoblje => {
            this.user = medicinskoOsoblje.data;
            this.izmeni = false;
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.$store.state.user.role.authority == "ADMIN") {
        axios
          .post("/lekar/izmeniLekaraAdmin", this.user)
          .then(medicinskoOsoblje => {
            this.user = medicinskoOsoblje.data;
            this.izmeni = false;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },

  mounted() {
    if (this.$route.params.id == undefined) {
      this.id = this.$store.state.user.id;

      axios
        .get("/lekar/postojeciLekar/" + this.id)
        .then(medicinskoOsoblje => {
          this.user = medicinskoOsoblje.data;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.id = this.$route.params.id;
      axios
        .get("/lekar/postojeciLekarAdmin/" + this.id)
        .then(medicinskoOsoblje => {
          this.user = medicinskoOsoblje.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}
</style>