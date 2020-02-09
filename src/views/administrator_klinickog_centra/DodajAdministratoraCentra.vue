<template>
<div>
  <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>

  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodavanje administratora klinike</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Ime</label>
                <input type="text" id="Form-ime" class="form-control" v-model="user.ime" />

                <label for="Form-phone">Prezime</label>
                <input type="text" id="Form-prezime" class="form-control" v-model="user.prezime" />

                <label for="Form-email">Mail</label>
                <input type="text" id="Form-email" class="form-control" v-model="user.mail" />

                <label for="Form-adresa">Adresa</label>
                <input type="text" id="Form-adresa" class="form-control" v-model="user.adresa" />
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Grad</label>
                <input type="text" id="Form-grad" class="form-control" v-model="user.grad" />

                <label for="Form-država">Država</label>
                <input type="text" id="Form-država" class="form-control" v-model="user.drzava" />

                <label for="Form-br">Broj telefona</label>
                <input type="text" id="Form-br" class="form-control" v-model="user.brojTelefona" />

                
              </div>
            </div>
          </div>
          <!--Body-->

          <div class="text-center mb-4">
            <button
              type="button"
              class="btn btn-danger btn-block z-depth-2"
              @click="dodajAdmina"
            >Dodaj administratora</button>
          </div>
        </div>
      </div>
    </div>
    <!--/Form with header-->
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        ime: "",
        prezime: "",
        mail: "",
        adresa: "",
        grad: "",
        drzava: "",
        brojTelefona: "",
      },
      error: false,
      errormessage: "",
    };
  },
  methods: {
    dodajAdmina() {
      
      
      if (this.user.ime === "" || this.user.prezime === "" || this.user.mail==="" || this.user.adresa==="" || this.user.grad===""
       || this.user.drzava==="" || this.user.brojTelefona===""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
       var rex = /^\+381\/6[0-9]-?[0-9]+(-[0-9]+)?$/;
      if (!rex.test(String(this.user.brojTelefona.trim()))) {
        this.errormessage = "Broj telefona treba da bude oblika +381/65-504205";
        this.error = true;
        return;
      }
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(this.user.mail.trim()).toLowerCase())) {
        this.errormessage = "Mail adresa nije u odgovarajucem formatu";
        this.error = true;
        return;
      }
      axios
        .post(
          "/adminCentra/dodajAdminaCentra",
          this.user
        )
        .then(user => {
          this.user.ime = "";
          this.user.prezime = "";
          this.user.mail = "";
          this.user.adresa = "";
          this.user.grad = "";
          this.user.drzava = "";
          this.user.brojTelefona = "";
          this.error=false;
        })
        .catch(error => {
          alert("Administator sa ovo mail adresom vec postoji")
          console.log(error);
        });
    }
  },
  mounted() {
    
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}
</style>