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
            <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Prijava</h3>
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
                  <input type="password" class="form-control" v-model="user.sifra" />
                </div>
              </div>
            </div>

            <div class="text-center mb-4 mt-4">
              <button
                type="button"
                class="btn btn-success btn-block z-depth-2"
                @click="loginFun"
              >Prijavi se</button>
            </div>
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {
        mail: "",
        sifra: ""
      },
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    loginFun() {
      this.error = false;
      if (this.user.mail == "" || this.user.sifra == "") {
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

      axios
        .post("/auth/login", this.user)
        .then(response => {
          this.user.mail = "";
          this.user.sifra = "";
          this.error = false;
          localStorage.setItem("jwt", response.data.accessToken);
          this.$store.state.user = VueJwtDecode.decode(
            localStorage.getItem("jwt")
          );
          
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
          this.errorMessage = "Mail ili Sifra nisu tacni";
          this.error = true;
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