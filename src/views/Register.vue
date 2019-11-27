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
            <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Registracija</h3>
          </div>
        </div>

        <div class="form-group">
          <div class="card-body mx-4 mt-4">
            <div class="row">
              <div class="col">
                <div class="md-form">
                  <label>E-mail</label>
                  <input type="text" class="form-control" v-model="user.mail" />
                  <label>Sifra</label>
                  <input type="password" class="form-control" v-model="password" />
                  <label>Potvrdi Sifru</label>
                  <input type="password" class="form-control" v-model="checkPassword" />
                  <label>Ime</label>
                  <input type="text" class="form-control" v-model="user.ime" />
                  <label>Prezime</label>
                  <input type="text" class="form-control" v-model="user.prezime" />
                </div>
              </div>
              <div class="col">
                <div class="md-form">
                  <label>Broj Telefona</label>
                  <input type="text" class="form-control" v-model="user.brojTelefona" />
                  <label>Adresa</label>
                  <input type="text" class="form-control" v-model="user.adresa" />
                  <label>Grad</label>
                  <input type="text" class="form-control" v-model="user.grad" />
                  <label>Drzava</label>
                  <input type="text" class="form-control" v-model="user.drzava" />
                </div>
              </div>
            </div>

            <div class="text-center mb-4 mt-4">
              <button
                type="button"
                class="btn btn-success btn-block z-depth-2"
                @click="registerFun"
              >Registruj se</button>
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
      user: {
        mail: "",
        ime: "",
        prezime: "",
        brojTelefona: "",
        adresa: "",
        grad: "",
        drzava: ""
      },
      password: "",
      checkPassword: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    registerFun() {
      this.error = false;
      if (
        this.user.mail == "" ||
        this.user.ime == "" ||
        this.user.prezime == "" ||
        this.user.brojTelefona == "" ||
        this.user.adresa == "" ||
        this.user.grad == "" ||
        this.user.drzava == "" ||
        this.password == "" ||
        this.checkPassword == ""
      ) {
        this.errorMessage = "Molimo vas popunite sva polja";
        this.error = true;
        return;
      }

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.user.mail.trim()).toLowerCase())) {
        this.errorMessage = "Mail adresa nije u odgovarajucem formatu";
        this.error = true;
        return;
      }

      if (this.password !== this.checkPassword) {
        this.errorMessage = "Razlicite vrednosti za sifru";
        this.error = true;
        return;
      }

      var rex = /^\+38[0-9]\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.user.brojTelefona.trim()))) {
        this.errorMessage = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }

      this.user["sifra"] = this.password;

      axios
        .post("http://localhost:8080/prijava/register", this.user)
        .then(() => {
          
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

input {
  margin-bottom: 8%;
}
</style>