import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import PacijentProfil from '../views/pacijent/Profil.vue'
import PacijentProfilLekar from '../views/medicinsko_osoblje/ProfilPacijentaLekar.vue'
import GodisnjiOdmor from '../views/medicinsko_osoblje/GodisnjiOdmor.vue'
import AktivacijaPacijenta from '../views/pacijent/AktivacijaPacijenta.vue'
import PotvrdaZahteva from '../views/pacijent/PotvrdaZahteva.vue'
import Karton from '../views/pacijent/Karton.vue'
import IstorijaPregledaOperacija from '../views/pacijent/IstorijaPregledaOperacija.vue'
import ListaKlinika from '../views/pacijent/ListaKlinika.vue'
import Klinika from '../views/pacijent/Klinika.vue'
import KlinikaProfil from '../views/klinika/Profil.vue'
import AdministratorKlinikeProfil from '../views/administrator_klinike/Profil.vue'
import ListaSvihLekara from '../views/klinika/ListaLekara.vue'
import ListaSestara from '../views/klinika/ListaSestara.vue'
import ListaSala from '../views/klinika/ListaSala.vue'

import ListaTipovaPregleda from '../views/klinika/ListaTipovaPregleda.vue'
import ListaSlobodnihTermina from '../views/klinika/ListaSlobodnihTermina.vue'
import DodajLekara from '../views/administrator_klinike/Dodaj_lekara.vue'
import DodajSestru from '../views/administrator_klinike/DodajSestru.vue'
import POslovanjeKlinike from '../views/administrator_klinike/PoslovanjeKlinike.vue'
import ZahteviZaPreglede from '../views/administrator_klinike/ZahteviZaPreglede.vue'
import DodajSalu from '../views/administrator_klinike/DodajSalu.vue'
import DodajTipPregleda from '../views/administrator_klinike/DodajTipPregleda.vue'
import DodajPredPregled from '../views/administrator_klinike/DodajPredPregled.vue'
import ZahteviGodisnjiLekar from '../views/administrator_klinike/ZahteviGodisnjiLekar.vue'
import ZahteviGodisnjiSestra from '../views/administrator_klinike/ZahteviGodisnjiSestra.vue'
import MedicinskoOsobljeProfil from '../views/medicinsko_osoblje/Profil.vue'
import ListaPacijenata from '../views/medicinsko_osoblje/ListaPacijenata.vue'
import ListaZahteva from '../views/medicinsko_osoblje/ListaZahteva.vue'
import SestraProfil from '../views/medicinsko_osoblje/ProfilSestre.vue'
import Klanedar from '../views/medicinsko_osoblje/Kalendar.vue'
import Recepti from '../views/medicinsko_osoblje/Recepti.vue'
import KalendarSestre from '../views/medicinsko_osoblje/KalendarSestre.vue'
import GodisnjiOdmorSestre from '../views/medicinsko_osoblje/GodisnjiOdmorSestre.vue'

import ZapocniPregled from '../views/medicinsko_osoblje/ZapocniPregled.vue'
import ZakaziPregled from '../views/medicinsko_osoblje/ZakaziPregled.vue'

import DodajAdministratoraKlinike from '../views/administrator_klinickog_centra/DodajAdministratoraKlinike.vue'
import DodajKliniku from '../views/administrator_klinickog_centra/DodajKliniku.vue'
import Zahtevi from '../views/administrator_klinickog_centra/Zahtevi.vue'
import Bolesti from '../views/administrator_klinickog_centra/Bolesti.vue'
import Lek from '../views/administrator_klinickog_centra/Lek.vue'
import Sifarnik from '../views/administrator_klinickog_centra/Sifarnik.vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import ZahteviZaOperaciju from '../views/administrator_klinike/ZahteviZaOperaciju.vue'

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
    path: '/zahteviGodisnjiLekar',
    name: 'Godisnji Lekar zahtev',
    component: ZahteviGodisnjiLekar
  },
  {
    path: '/zahteviGodisnjiSestra',
    name: 'Godisnji Sestra zahtev',
    component: ZahteviGodisnjiSestra
  },
  {
    path: '/ProfilPacijentaLekar/:id',
    name: 'Profil Pacijenta',
    component: PacijentProfilLekar
  },
  {
    path: '/godisnjiOdmor',
    name: 'Godisnji odmor',
    component: GodisnjiOdmor
  },
  {
    path: '/karton/:id',
    name: 'Karton',
    component: Karton
  },
  {
    path: '/istorijaPregledaOperacija',
    name: 'Istorija pregleda i operacija pacijenta',
    component: IstorijaPregledaOperacija
  },
  {
    path: '/kalendar',
    name: 'Kalendar',
    component: Klanedar
  },
  {
    path: '/klinika/:id/:naziv',
    name: 'Klinika',
    component: Klinika
  },
  {
    path: '/klinika/:id/:naziv/:datum/:tipPregleda/:nazivTipPregleda',
    name: 'Klinika Doijena Pretragom',
    component: Klinika
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
    path: '/DodajSalu',
    name: 'Dodaj Salu',
    component: DodajSalu
  },
  {
    path: '/DodajTipPregleda',
    name: 'Dodaj Tip',
    component: DodajTipPregleda
  },
  {
    path: '/dodajKliniku',
    name: 'Dodaj Kliniku',
    component: DodajKliniku
  },
  {
    path: '/login',
    name: 'Prijava',
    component: Login
  },
  {
    path: '/register',
    name: 'Registracija',
    component: Register
  }, {
    path: '/zahtevi',
    name: 'Zahtevi',
    component: Zahtevi
  }, {
    path: '/bolesti',
    name: 'Bolesti',
    component: Bolesti
  },
  {
    path: '/lek',
    name: 'Lek',
    component: Lek
  },
  {
    path: '/sifarnik',
    name: 'Sifarnik',
    component: Sifarnik
  },
  {
    path: '/DodajLekara',
    name: 'Dodaj Lekara',
    component: DodajLekara
  },
  {
    path: '/DodajPredPregled',
    name: 'Dodaj Predefinisan pregled',
    component: DodajPredPregled
  },
  {
    path: '/PoslovanjeKlinike',
    name: 'Poslovanje Klinike',
    component: POslovanjeKlinike
  },
  {
    path: '/ZahteviZaPreglede',
    name: 'Zahtevi za preglede',
    component: ZahteviZaPreglede
  },
  {
    path: '/DodajSestru',
    name: 'Dodaj Sestru',
    component: DodajSestru
  },
  {
    path: '/SestraProfil',
    name: 'Dodaj Sestru',
    component: SestraProfil
  },
  {
    path: '/SestraProfil/:id',
    name: 'Dodaj Sestru',
    component: SestraProfil
  },
  {
    path: '/MedicinskoOsobljeProfil',
    name: 'Dodaj Medicinsko Osoblje',
    component: MedicinskoOsobljeProfil
  },
  {
    path: '/MedicinskoOsobljeProfil/:id',
    name: 'Dodaj Medicinsko Osoblje',
    component: MedicinskoOsobljeProfil
  },
  {
    path: '/ZapocniPregled/:id',
    name: 'Zapocni Pregled',
    component: ZapocniPregled
  },
  {
    path: '/ZakaziPregled/:id',
    name: 'Zakazi Pregled',
    component: ZakaziPregled
  },
  {
    path: '/ListaSvihLekara',
    name: 'Lista Lekara',
    component: ListaSvihLekara
  },
  {
    path: '/ListaZahteva',
    name: 'Lista Zahteva',
    component: ListaZahteva
  },
  {
    path: '/ListaSestara',
    name: 'Lista Sestrara',
    component: ListaSestara
  },
  {
    path: '/aktivacijaPacijenta/:code',
    name: 'Aktivacija pacijenta',
    component: AktivacijaPacijenta
  },
  {
    path: '/potvrdaZahteva/:code',
    name: 'Potvrdjivanje ili odbijanje zahteva za pregled',
    component: PotvrdaZahteva
  },
  {
    path: '/listaKlinika',
    name: 'Lista Klinika pacijenta',
    component: ListaKlinika
  },
  {
    path: '/ListaSala',
    name: 'Lista Sala',
    component: ListaSala
  },
  {
    path: '/ListaTipovaPregleda',
    name: 'Lista Tipova Pregleda',
    component: ListaTipovaPregleda
  },
  {
    path: '/ListaSlobodnihTermina',
    name: 'Lista Slobodnih Termina',
    component: ListaSlobodnihTermina
  },
  {
    path: '/listaPacijenata',
    name: 'Lista Pacijenta',
    component: ListaPacijenata
  },
  {
    path: '/recepti',
    name: 'Recepti',
    component: Recepti
  },
  {
    path: '/kalendarSestre',
    name: 'Kalendar Sestre',
    component: KalendarSestre
  },
  {
    path: '/godisnjiOdmorSestre',
    name: 'Godisnji OdmorSestre',
    component: GodisnjiOdmorSestre
  },
  {
    path: '/zahteviZaOperacijU',
    name: 'Zahtevi Za OperacijU',
    component: ZahteviZaOperaciju
  },

]

const router = new VueRouter({
  routes
})

export default router
