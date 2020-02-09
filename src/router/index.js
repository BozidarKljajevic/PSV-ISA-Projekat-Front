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
import ListaOperacija from '../views/medicinsko_osoblje/ListaOperacija.vue'
import SestraProfil from '../views/medicinsko_osoblje/ProfilSestre.vue'
import KartonPacijenta from '../views/medicinsko_osoblje/KartonPacijenta.vue'
import Klanedar from '../views/medicinsko_osoblje/Kalendar.vue'
import Recepti from '../views/medicinsko_osoblje/Recepti.vue'
import KalendarSestre from '../views/medicinsko_osoblje/KalendarSestre.vue'
import GodisnjiOdmorSestre from '../views/medicinsko_osoblje/GodisnjiOdmorSestre.vue'
import ListaPacijenataKodSestre from '../views/medicinsko_osoblje/ListaPacijenataKodSestre.vue'

import ZapocniPregled from '../views/medicinsko_osoblje/ZapocniPregled.vue'
import ZakaziPregled from '../views/medicinsko_osoblje/ZakaziPregled.vue'

import DodajAdministratoraKlinike from '../views/administrator_klinickog_centra/DodajAdministratoraKlinike.vue'
import DodajAdministratoraCentra from '../views/administrator_klinickog_centra/DodajAdministratoraCentra.vue'
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
    component: Home,
    meta: {
      requiresAuth: true
    } 
  },
  {
    path: '/pacijentProfil',
    name: 'Profil Pacijenta',
    component: PacijentProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/zahteviGodisnjiLekar',
    name: 'Godisnji Lekar zahtev',
    component: ZahteviGodisnjiLekar,
    meta: {
      requiresAuth: false
    }
    
  },
  {
    path: '/zahteviGodisnjiSestra',
    name: 'Godisnji Sestra zahtev',
    component: ZahteviGodisnjiSestra,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ProfilPacijentaLekar/:id',
    name: 'Profil Pacijenta',
    component: PacijentProfilLekar,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/godisnjiOdmor',
    name: 'Godisnji odmor',
    component: GodisnjiOdmor,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/karton/:id',
    name: 'Karton',
    component: Karton,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/istorijaPregledaOperacija',
    name: 'Istorija pregleda i operacija pacijenta',
    component: IstorijaPregledaOperacija,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/kalendar',
    name: 'Kalendar',
    component: Klanedar,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/klinika/:id/:naziv',
    name: 'Klinika',
    component: Klinika,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/klinika/:id/:naziv/:datum/:tipPregleda/:nazivTipPregleda',
    name: 'Klinika Doijena Pretragom',
    component: Klinika,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/klinikaProfil',
    name: 'Profil Klinike',
    component: KlinikaProfil,
    meta: {
      requiresAuth: false
    }
  },
  
  {
    path: '/administratorKlinikeProfil',
    name: 'Profil Administratora Klinike',
    component: AdministratorKlinikeProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dodajAdministratoraKlinike',
    name: 'Dodaj AdministratoraKlinike',
    component: DodajAdministratoraKlinike,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dodajAdministratoraCentra',
    name: 'Dodaj AdministratoraCentra',
    component: DodajAdministratoraCentra,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/DodajSalu',
    name: 'Dodaj Salu',
    component: DodajSalu,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/DodajTipPregleda',
    name: 'Dodaj Tip',
    component: DodajTipPregleda,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dodajKliniku',
    name: 'Dodaj Kliniku',
    component: DodajKliniku,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Prijava',
    component: Login,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Registracija',
    component: Register,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/zahtevi',
    name: 'Zahtevi',
    component: Zahtevi,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/bolesti',
    name: 'Bolesti',
    component: Bolesti,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/lek',
    name: 'Lek',
    component: Lek,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/sifarnik',
    name: 'Sifarnik',
    component: Sifarnik,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/DodajLekara',
    name: 'Dodaj Lekara',
    component: DodajLekara,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/DodajPredPregled',
    name: 'Dodaj Predefinisan pregled',
    component: DodajPredPregled,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/PoslovanjeKlinike',
    name: 'Poslovanje Klinike',
    component: POslovanjeKlinike,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ZahteviZaPreglede',
    name: 'Zahtevi za preglede',
    component: ZahteviZaPreglede,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/DodajSestru',
    name: 'Dodaj Sestru',
    component: DodajSestru,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/SestraProfil',
    name: 'Dodaj Sestru',
    component: SestraProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/KartonPacijenta/:id',
    name: 'Karton Pacijenta',
    component: KartonPacijenta,
    meta: {
      requiresAuth: false
    } 
  },
  {
    path: '/SestraProfil/:id',
    name: 'Dodaj Sestru',
    component: SestraProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/MedicinskoOsobljeProfil',
    name: 'Dodaj Medicinsko Osoblje',
    component: MedicinskoOsobljeProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/MedicinskoOsobljeProfil/:id',
    name: 'Dodaj Medicinsko Osoblje',
    component: MedicinskoOsobljeProfil,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ZapocniPregled/:id/:pacijent',
    name: 'Zapocni Pregled',
    component: ZapocniPregled,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ZakaziPregled/:id',
    name: 'Zakazi Pregled',
    component: ZakaziPregled,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaSvihLekara',
    name: 'Lista Lekara',
    component: ListaSvihLekara,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaZahteva',
    name: 'Lista Zahteva',
    component: ListaZahteva,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaOperacija',
    name: 'Lista operacija',
    component: ListaOperacija,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaSestara',
    name: 'Lista Sestrara',
    component: ListaSestara,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/aktivacijaPacijenta/:code',
    name: 'Aktivacija pacijenta',
    component: AktivacijaPacijenta,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/potvrdaZahteva/:code',
    name: 'Potvrdjivanje ili odbijanje zahteva za pregled',
    component: PotvrdaZahteva,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/listaKlinika',
    name: 'Lista Klinika pacijenta',
    component: ListaKlinika,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaSala',
    name: 'Lista Sala',
    component: ListaSala,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaTipovaPregleda',
    name: 'Lista Tipova Pregleda',
    component: ListaTipovaPregleda,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/ListaSlobodnihTermina',
    name: 'Lista Slobodnih Termina',
    component: ListaSlobodnihTermina,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/listaPacijenata',
    name: 'Lista Pacijenta',
    component: ListaPacijenata,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/listaPacijenataKodSestre',
    name: 'Lista Pacijenta Kod Sestre',
    component: ListaPacijenataKodSestre
  },
  {
    path: '/recepti',
    name: 'Recepti',
    component: Recepti,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/kalendarSestre',
    name: 'Kalendar Sestre',
    component: KalendarSestre,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/godisnjiOdmorSestre',
    name: 'Godisnji OdmorSestre',
    component: GodisnjiOdmorSestre,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/zahteviZaOperacijU',
    name: 'Zahtevi Za OperacijU',
    component: ZahteviZaOperaciju,
    meta: {
      requiresAuth: false
    }
  },

]




const router = new VueRouter({
  
  routes
})


router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    next();
    return;
  }
  
  if(localStorage.getItem('jwt'))
  {
    next();
    return;
  }
   
  next("/")
  
})


export default router
