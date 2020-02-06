<template>
<div>
<b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    
    <div class="card" style="width: 60%">
      
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Tipova Pregleda</h3>
        </div>
      </div>
      
    <b-container class="mt-4">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-outline-secondary btn-block z-depth-2"
              @click="prikaziPretragu"
            >{{pretraziBtnClickerd? "Ukloni":"Prikazi"}} formu za filtriranje</button>
          </div>
        </div>
      </b-container>

  <b-container class="mt-4" v-if="pretraziBtnClickerd">
        <div class="row">
          <div class="col-6">
            <h5>Naziv</h5>
            <b-form-group>
              <b-form-input type="text" v-model="pretraga.naziv"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-6">
            <h5>Oznaka</h5>
            <b-form-group>
              <b-form-input type="text" v-model="pretraga.oznaka"></b-form-input>
            </b-form-group>
          </div>
          
        </div>
      </b-container>


    <div class="form-group" v-for="tip in konacniTipovi" :key="tip.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <input id="Form-ime"  class="form-control" v-model="tip.naziv" :disabled="!(izmeni && selektovanTip == tip.id)">
                <label for="Form-ime">Oznaka</label>
                <input id="Form-ime" class="form-control" v-model="tip.oznaka" :disabled="!(izmeni && selektovanTip == tip.id)">

                <label for="Form-ime">Cena</label>
                <input id="Form-ime" class="form-control" v-model="tip.cena" :disabled="!(izmeni && selektovanTip == tip.id)">

                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="IzbrisiClick(tip.id)" 
                    
                  >Izbrisi</button>
                </div> 
               <div class="text-center mb-4 mt-4">
                 <template v-if="izmeni && selektovanTip == tip.id">
            <button type="button" class="btn btn-success btn-block z-depth-2" @click ="sacuvajPodatke(tip)" >Sačuvaj</button>
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="odustaniClick" >Odustani</button>
            </template>
            <template v-else>
            <button type="button" class="btn btn-danger btn-block z-depth-2" @click="izmeniClick(tip.id)" >Izmeni</button>
            </template>
            
          </div>
              </div>
            </div>
           
            </div>
          </div>
           </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        izmeni:false,
        selektovanTip: "",
        error: false,
        errormessage: "",
      TipoviPregleda: [],
 pretraziBtnClickerd: false,
 pretraga: {
        naziv: "",
        oznaka: ""
       
      },
      
    };
  },
   

 computed: {
    konacniTipovi() {
      var konacni = []
     if (this.pretraga.naziv === "" && this.pretraga.oznaka === "") {
         konacni= this.TipoviPregleda;
        return konacni;
      } else {
        this.TipoviPregleda.forEach(element => {
            if(element.naziv.includes(this.pretraga.naziv) && this.pretraga.oznaka === "" ) {
                konacni.push(element);
            }
            else  if(element.oznaka.includes(this.pretraga.oznaka) && this.pretraga.naziv === "" ) {
                konacni.push(element);
            }
             else  if(element.oznaka.includes(this.pretraga.oznaka) &&  element.naziv.includes(this.pretraga.naziv) ) {
                konacni.push(element);
            }
        });
        return konacni;
      }

    }
 },
   methods: {
  prikaziPretragu() {
      this.pretraziBtnClickerd = !this.pretraziBtnClickerd;
    },
    izmeniClick(id) {
      this.selektovanTip = id;
      this.izmeni = true
    },

    odustaniClick() {
      this.error = false;
      this.izmeni = false
     axios
      .get("/tipPregleda/TipoviKlinike/"+ this.$store.state.user.id )
      .then(TipoviPregleda => {
        this.TipoviPregleda = TipoviPregleda.data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    

    IzbrisiClick(id) {
      axios
      .post("/tipPregleda/izbrisiTipPregleda/"+ id + "/" + this.$store.state.user.id )
      .then(tipovi => {
        this.TipoviPregleda = tipovi.data;
      })
      .catch(error => {
        console.log(error);
        this.error=true;
         this.errormessage="Ne mozete obrisati tip koji koristi lekar te klinike";
      });

    },

     sacuvajPodatke(tip) {
      this.error = false;
      if (tip.naziv === "" || tip.oznaka === "" || tip.cena === ""){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    
      
    
      axios
      .post("/tipPregleda/izmeniPodatkeTipaPregleda" + "/" + this.$store.state.user.id , tip)
      .then(SaleKlinikee =>{
        this.user = SaleKlinikee.data;
        this.izmeni = false;
      })
      .catch(error => {
          console.log(error)
           this.error=true;
         this.errormessage="ne mozete menjati tip koji se koristi";
      });
    }

   },
  mounted() {
    axios
      .get("/tipPregleda/TipoviKlinike/"+ this.$store.state.user.id)
      .then(TipoviPregleda => {
        this.TipoviPregleda = TipoviPregleda.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>