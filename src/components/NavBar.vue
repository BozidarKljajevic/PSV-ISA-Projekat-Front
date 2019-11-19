<template>
  <b-navbar toggleable="lg" type="dark" variant="danger">
    <b-navbar-brand href="#">Klinicki centar</b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Pacijent" right>
        <b-dropdown-item>Profil</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Administrator klinike" right>
        <b-dropdown-item>Profil</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Klinika" right>
        <b-dropdown-item>Profil</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown text="Admin KC" right>
        <b-dropdown-item>Dodaj Kliniku</b-dropdown-item>
        <div class="dropdown-divider"></div>
        <b-dropdown-item>Dodaj Administratora</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style>
</style>