<template>
  <b-navbar toggleable="lg" type="dark" variant="danger">
    <b-navbar-brand href="#">Klinicki centar</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Pacijent" right>
        <router-link to="/pacijentProfil" tag="b-dropdown-item">Profil</router-link>
        <b-dropdown-item>Moj Karton</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Administrator klinike" right>
        <router-link to="/administratorKlinikeProfil" tag="b-dropdown-item">Profil</router-link>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Klinika" right>
        <router-link to="/klinikaProfil" tag="b-dropdown-item">Profil</router-link>
        <b-dropdown-item>Lista Lekara</b-dropdown-item>
        <b-dropdown-item>Lista Sala</b-dropdown-item>
        <b-dropdown-item>Slobodni termini</b-dropdown-item>
        <b-dropdown-item>Cenovnik</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Admin KC" right>
        <router-link to="/dodajKliniku" tag="b-dropdown-item">Dodaj Kliniku</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/dodajAdministratoraKlinike" tag="b-dropdown-item">Dodaj Administratora Klinike</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/zahtevi" tag="b-dropdown-item">Zahtevi</router-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style>
</style>