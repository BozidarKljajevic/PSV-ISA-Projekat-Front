<template>
  <b-container class="mt-4" v-if="this.$store.state.user.uloga == ''">
    <router-link to="/register" tag="button" class="btn btn-success btn-block z-depth-2">Registracija</router-link>
    <router-link to="/login" tag="button" class="btn btn-danger btn-block z-depth-2">Prijava</router-link>
  </b-container>
  <b-container class="mt-4" v-else>
    {{this.$store.state.user.ime}},{{this.$store.state.user.prezime}},{{this.$store.state.user.uloga}}
  </b-container>
</template>

<script>
export default {
  
};
</script>
