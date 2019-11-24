import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import PacijentProfil from '../views/pacijent/Profil.vue'
import KlinikaProfil from '../views/klinika/Profil.vue'
import AdministratorKlinikeProfil from '../views/administrator_klinike/Profil.vue'
import DodajLekara from '../views/administrator_klinike/Dodaj_lekara.vue'
import MedicinskoOsobljeProfil from '../views/medicinsko_osoblje/Profil.vue'

import DodajAdministratoraKlinike from '../views/administrator_klinickog_centra/DodajAdministratoraKlinike.vue'
import DodajKliniku from '../views/administrator_klinickog_centra/DodajKliniku.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pacijentProfil',
    name: 'Profil Pacijenta',
    component: PacijentProfil
  },
  {
    path: '/klinikaProfil',
    name: 'Profil Klinike',
    component: KlinikaProfil
  },
  {
    path: '/administratorKlinikeProfil',
    name: 'Profil Administratora Klinike',
    component: AdministratorKlinikeProfil
  },
  {
    path: '/dodajAdministratoraKlinike',
    name: 'Dodaj AdministratoraKlinike',
    component: DodajAdministratoraKlinike
  },
  {
    path: '/dodajKliniku',
    name: 'Dodaj Kliniku',
    component: DodajKliniku
  },
  {
    path: '/DodajLekara',
    name: 'Dodaj Lekara',
    component: DodajLekara
  },
  {
    path: '/MedicinskoOsobljeProfil',
    name: 'Dodaj Lekara',
    component: MedicinskoOsobljeProfil
  },
  
]

const router = new VueRouter({
  routes
})

export default router
