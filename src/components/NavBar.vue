<template>
  <b-navbar toggleable="lg" type="dark" variant="danger">
    <router-link to="/" tag="b-navbar-brand">Klinicki centar</router-link>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown
        text="Pacijent"
        right
        v-if="this.$store.state.user.role.authority == 'PACIJENT'"
      >
        <router-link to="/pacijentProfil" tag="b-dropdown-item">Profil</router-link>
        <router-link to="/listaKlinika" tag="b-dropdown-item">Klinike</router-link>
        <router-link to="/karton" tag="b-dropdown-item">Moj Karton</router-link>
        <b-dropdown-item @click="odjavaFun">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Administrator klinike"
        right
        v-if="this.$store.state.user.role.authority == 'ADMIN'"
      >
        <router-link to="/administratorKlinikeProfil" tag="b-dropdown-item">Profil</router-link>
        <router-link to="/DodajLekara" tag="b-dropdown-item">Dodaj lekara</router-link>
        <router-link to="/DodajSestru" tag="b-dropdown-item">Dodaj Sestru</router-link>
        <router-link to="/DodajSalu" tag="b-dropdown-item">Dodaj Salu</router-link>
        <router-link to="/DodajTipPregleda" tag="b-dropdown-item">Dodaj Tip Pregleda</router-link>
        <router-link to="/DodajPredPregled" tag="b-dropdown-item">Dodaj Predefinisane termine</router-link>
        <b-dropdown-item @click="odjavaFun">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Klinika"
        right
        v-if="this.$store.state.user.role.authority == 'ADMIN'"
      >
        <router-link to="/klinikaProfil" tag="b-dropdown-item">Profil Klinike</router-link>
        <router-link to="/ListaSvihLekara" tag="b-dropdown-item">Lista Lekara</router-link>
        <router-link to="/ListaSestara" tag="b-dropdown-item">Lista Sestara</router-link>
        <router-link to="/ListaSala" tag="b-dropdown-item">Lista Sala</router-link>
        <router-link to="/ListaTipovaPregleda" tag="b-dropdown-item">Lista Tipova pregleda</router-link>
        <b-dropdown-item>Slobodni termini</b-dropdown-item>
        <b-dropdown-item>Cenovnik</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Admin KC"
        right
        v-if="this.$store.state.user.role.authority == 'ADMINCENTRA'"
      >
        <router-link to="/dodajKliniku" tag="b-dropdown-item">Dodaj Kliniku</router-link>
        <div class="dropdown-divider"></div>
        <router-link
          to="/dodajAdministratoraKlinike"
          tag="b-dropdown-item"
        >Dodaj Administratora Klinike</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/zahtevi" tag="b-dropdown-item">Zahtevi</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/bolesti" tag="b-dropdown-item">Bolest</router-link>
        <router-link to="/lek" tag="b-dropdown-item">Lek</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/sifarnik" tag="b-dropdown-item">Šifarnik</router-link>
        <b-dropdown-item @click="odjavaFun">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown
        text="Medicinsko osoblje"
        right
        v-if="this.$store.state.user.role.authority == 'LEKAR'"
      >
        <router-link to="/MedicinskoOsobljeProfil" tag="b-dropdown-item">Profil</router-link>
        <div class="dropdown-divider"></div>
        <router-link to="/listaPacijenata" tag="b-dropdown-item">Lista Pacijenata</router-link>
        <div class="dropdown-divider"></div>
         <b-dropdown-item @click="odjavaFun">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown
        text="Medicinsko osoblje"
        right
        v-if="this.$store.state.user.role.authority == 'MEDICINSKASESTRA'"
      >
        <router-link to="/SestraProfil" tag="b-dropdown-item">Profil Sestre</router-link>
         <b-dropdown-item @click="odjavaFun">Odjava</b-dropdown-item>
      </b-nav-item-dropdown>

    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    odjavaFun() {
      localStorage.removeItem("jwt");
      this.$store.state.user = {
        role: {
          authority: ''
        }
      };
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>