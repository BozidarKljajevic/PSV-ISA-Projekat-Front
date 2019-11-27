<template>
  <b-container class="mt-4" v-if="this.$store.state.user.uloga == ''">
    <router-link to="/register" tag="button" class="btn btn-success btn-block z-depth-2">Registracija</router-link>
    <router-link to="/login" tag="button" class="btn btn-danger btn-block z-depth-2">Prijava</router-link>
  </b-container>
  <b-container class="mt-4" v-else>
    {{this.$store.state.user.ime}},{{this.$store.state.user.prezime}},{{this.$store.state.user.uloga}}
    
    <b-modal ref="my-modal" id="odbij" hide-footer title="Promena lozinke">
      <label for="Form-ime">Lozinka</label>
      <input type="password" id="Form-lozinka" class="form-control" placeholder="Nova lozinka..." />
      <b-button class="mt-2" variant="danger">Promeni</b-button>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.user.uloga != "" && this.$store.state.user.uloga != "Pacijent") {
      this.$refs['my-modal'].show()
    }
  }
};
</script>
