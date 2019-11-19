import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pacijent: {
      id: '123456789',
      mail: 'pacijent@gmail.com',
      ime: 'Damjan',
      prezime: 'Pantić',
      adresa: 'Danila Kiša 5',
      grad: 'Novi Sad',
      drzava: 'Srbija',
      brojTelefona: '+381/65-5504205',
      aktivan: false
    },
    klinika: {
      id: '',
      naziv: '',
      adresa: '',
      grad: '',
      drzava: '',
      brojTelefona: '',
      opis: '',
      ocena: 0
    },
    administratorKlinike: {
      id: '',
      mail: '',
      ime: '',
      prezime: '',
      adresa: '',
      grad: '',
      drzava: '',
      brojTelefona: '',
      idKlinike: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
