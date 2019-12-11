<template>
  <b-container class="mt-4" v-if="this.$store.state.user.role.authority == ''">
    <router-link
      to="/register"
      tag="button"
      class="btn btn-success btn-block z-depth-2"
    >Registracija</router-link>
    <router-link to="/login" tag="button" class="btn btn-danger btn-block z-depth-2">Prijava</router-link>
  </b-container>
  <b-container class="mt-4" v-else>
    {{this.$store.state.user.ime}},{{this.$store.state.user.prezime}},{{this.$store.state.user.uloga}}
    <b-modal ref="my-modal" id="odbij" hide-footer title="Promena lozinke">
      <label for="Form-ime">Lozinka</label>
      <input
        type="password"
        id="Form-lozinka"
        class="form-control"
        placeholder="Nova lozinka..."
        v-model="lozinka.sifra"
      />
      <b-button class="mt-2" variant="danger" @click="promeniLozinku">Promeni</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      lozinka: {
        sifra: ""
      },
      putanja: ""
    };
  },
  methods: {
    promeniLozinku() {

      if (this.$store.state.user.role.authority == 'ADMINCENTRA') {
        this.putanja = "adminCentra"
      }else if(this.$store.state.user.role.authority == 'ADMIN'){ 
        this.putanja = "adminKlinike"
      }else if(this.$store.state.user.role.authority == 'LEKAR'){ 
        this.putanja = "lekar"
      }else if(this.$store.state.user.role.authority == 'MEDICINSKASESTRA'){ 
        this.putanja = "medicinskaSestra"
      }
      else if (this.$store.state.user.role.authority == 'PACIJENT') {
        
      }

      axios
        .post(
          "/"+ this.putanja +"/izmeniGenerickuSifru/" + this.$store.state.user.id,
          this.lozinka
        )
        .then(() => {
          localStorage.removeItem("jwt");
          this.$store.state.user = {
            role: {
              authority: ""
            }
          };
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    if (
      this.$store.state.user.role.authority != "" &&
      this.$store.state.user.role.authority != "PACIJENT"
    ) {
      if (this.$store.state.user.enabled == false) {
        this.$refs["my-modal"].show();
      }
    }
  }
};
</script>
