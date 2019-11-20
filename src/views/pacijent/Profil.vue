<template>
  <div>
    <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center">{{errorMessage}}</b-alert>
    </b-container>
    <b-container class="d-flex justify-content-center" style="margin-top: 20px">
      <b-card style="width: 60%">
        <!--Header-->
        <div class="header pt-3 lighten-2">
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
                    disabled
                    v-model="user.mail"
                  />

                  <label for="Form-ime">Ime</label>
                  <input
                    type="text"
                    id="Form-ime"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.ime"
                  />

                  <label for="Form-phone">Adresa</label>
                  <input
                    type="text"
                    id="Form-phone"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.adresa"
                  />

                  <label for="Form-email4">Država</label>
                  <input
                    type="text"
                    id="Form-email4"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.drzava"
                  />
                </div>
              </div>
              <div class="col">
                <div class="md-form pb-3">
                  <label for="Form-pass4">ID Zdravstvenog Osiguranika</label>
                  <input
                    type="text"
                    id="Form-pass4"
                    class="form-control"
                    disabled
                    v-model="user.id"
                  />

                  <label for="Form-prezime">Prezime</label>
                  <input
                    type="text"
                    id="Form-prezime"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.prezime"
                  />

                  <label for="Form-city">Grad</label>
                  <input
                    type="text"
                    id="Form-city"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.grad"
                  />

                  <label for="Form-sa">Broj Telefona</label>
                  <input
                    type="text"
                    id="Form-sa"
                    class="form-control"
                    :disabled="!izmeni"
                    v-model="user.brojTelefona"
                  />
                </div>
              </div>
            </div>

            <div class="text-center mb-4 mt-4">
              <template v-if="!izmeni">
                <button
                  type="button"
                  class="btn btn-danger btn-block z-depth-2"
                  @click="izmeniFun"
                >Izmeni</button>
              </template>
              <template v-else>
                <button
                  type="button"
                  class="btn btn-success btn-block z-depth-2"
                  @click="sacuvajFun"
                >Sacuvaj</button>
                <button
                  type="button"
                  class="btn btn-danger btn-block z-depth-2"
                  @click="odustaniFun"
                >Odustani</button>
              </template>
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
      izmeni: false,
      user: {},
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    izmeniFun() {
      this.izmeni = true;
    },
    odustaniFun() {
      this.error = false;
      this.errorMessage = "";
      this.izmeni = false;
      axios
        .get("http://localhost:8080/pacijent/postojeciPacijent")
        .then(pacijent => {
          this.user = pacijent.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    sacuvajFun() {
      this.error = false;
      this.errorMessage = "";

      if (
        this.user.ime == "" ||
        this.user.prezime == "" ||
        this.user.adresa == "" ||
        this.user.grad == "" ||
        this.user.drzava == "" ||
        this.user.brojTelefona == ""
      ) {
        this.errorMessage = "Molimo Vas popunite sva polja!";
        this.error = true;
        return;
      }

      var rex = /^\+381\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.user.brojTelefona.trim()))) {
        this.errorMessage = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }

      axios
        .put(
          "http://localhost:8080/pacijent/promeniPodatkePacijenta",
          this.user
        )
        .then(pacijent => {
          this.user = pacijent.data;
          this.izmeni = false;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("http://localhost:8080/pacijent/postojeciPacijent")
      .then(pacijent => {
        this.user = pacijent.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}

input {
  margin-bottom: 8%;
}
</style>