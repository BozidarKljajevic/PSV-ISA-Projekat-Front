<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lista Pacijenata</h3>
        </div>
      </div>
      <!--Header-->


      <b-container v-if="errorFlag">
        <b-alert
          show
          variant="danger"
          class="d-flex justify-content-center mt-2"
        >Kod pretrage morate uneti ime prezime ili jmbg</b-alert>
      </b-container>

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

    <b-container class="mt-4">
        <div class="row">
          <div class="col">
            <button
              type="button"
              class="btn btn-outline-primary btn-block z-depth-2"
              @click="prikaziPretragu2"
            >{{pretraziBtnClickerd2? "Ukloni":"Prikazi"}} formu za pretragu</button>
          </div>
        </div>
      </b-container>

      <b-container class="mt-4" v-if="pretraziBtnClickerd">
        <div class="row">
          <div class="col-4">
            <h5>Ime</h5>
            <b-form-group>
              <b-form-input type="text" v-model="pretraga.ime"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-4">
            <h5>Prezime</h5>
            <b-form-group>
              <b-form-input type="text" v-model="pretraga.prezime"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-4">
            <h4>Grad</h4>
            <b-form-group>
              <b-form-input type="text" v-model="pretraga.jmbg"></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col">
           
          </div>
        </div>
      </b-container>

       <b-container v-if="pretraziBtnClickerd2" class="mt-4 mb-2">
         <b-row>
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Polja za pretragu pacijenata</h3>
         </b-row>
        <div class="row">
          <div class="col">
            <h5>Id</h5>
            <b-form-group>
              <b-form-input type="text" v-model="idPac"></b-form-input>
            </b-form-group>
           
          </div>
          <div class="col">
            <h5>Ime</h5>
            <b-form-group>
              <b-form-input type="text" v-model="ime"></b-form-input>
            </b-form-group>
          </div>
          <div class="col">
            <h5>Prezime</h5>
            <b-form-group>
              <b-form-input type="text" v-model="prz"></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="row">
           <button
              type="button"
              class="btn btn-secondary btn-block z-depth-2"
              @click="pretrazi()"
            >Pretrazi po gradu i drzavi</button>
        </div>
      </b-container>


<b-container>
         <div>
    <b-table class="mt-2 mb-2" striped hover :items="konacniPacijenti" select-mode="single" :fields="fields"   selectable caption-top >
          <template v-slot:table-caption><h3>lista pacijenata </h3>
          </template>
          <template v-slot:cell>
        <b-button size="sm"  class="mr-2">
          Profil pacijenta
        </b-button>
      </template>
    </b-table>
  </div>
</b-container>
  


    

      
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pacijenti: [],
      fields: [
        {key: 'id',
            sortable: true},
             {key: 'ime',
            sortable: true},
             {key: 'prezime',
            sortable: true},
             {key: 'grad',
            sortable: true},
            
        ],
         lekari: [
            
         ],
      sortirajPo:"ime",
      drzave: [],
      gradovi: [],
      idPac: "",
      selektovaniGrad: "",
      pretraziBtnClickerd: false,
       pretraziBtnClickerd2: false,
      tipoviPregleda: [],
      ime: "",
      prz: "",
      pretraga: {
        ime: "",
        prezime: "", // zbog izmene ovo je sad grad
        jmbg: "" //drzava
      },
      errorFlag: false
    };
  },
   methods: {
       compare(a, b) {
      if (a[this.sortirajPo] < b[sortirajPo]) {
        return 1;
      }
      if (a[this.sortirajPo] > b[sortirajPo]) {
        return -1;
      }
      return 0;
    }
  },
  computed: {
    sortiraniPacijenti() {
      if (this.sortirajPo != "") {
        return this.pacijenti.sort(this.compare);
      } else {
        return this.pacijenti;
      }
    }, 

konacniPacijenti() {
      console.log(this.pacijenti.sort(this.compare))
      var klinike = [];
      var pacijenti = [];
      var filtered = [];
      var combinated = [];
      var combinatedThree = [];
      var text;
      if (this.pretraga.ime === "" && this.pretraga.prezime === "" && this.pretraga.jmbg === "") {
        pacijenti = this.pacijenti.sort(this.compare);
        return pacijenti;
      } else {
        if (this.pretraga.ime !== "") {
        this.pacijenti.sort(this.compare).forEach(pac => {
          text = pac.ime.toLowerCase();
               if(text.match(this.pretraga.ime)) {
                   filtered.push(pac);
               }
        });

        if (this.pretraga.prezime !== "") {
        filtered.sort(this.compare).forEach(pac => {
          text = pac.prezime.toLowerCase();
               if(text.match(this.pretraga.prezime)) {
                    combinated.push(pac);
               }
        });
          if (this.pretraga.jmbg !== "") {
        combinated.forEach(pac => {
          text = pac.grad.toLowerCase();
               if(text.match(this.pretraga.jmbg)) {
                   combinatedThree.push(pac);
               }
        });
               return combinatedThree;
           }
           return combinated;
        }
        if (this.pretraga.jmbg !== "") {
        filtered.forEach(pac => {
          text = pac.grad.toLowerCase();
               if(text.match(this.pretraga.jmbg)) {
                   combinated.push(pac);
               }
        });
               return combinated;
           }
           
      return filtered;
      }
      

      if (this.pretraga.prezime !== "") {
        this.pacijenti.sort(this.compare).forEach(pac => {
          text = pac.prezime.toLowerCase();
               if(text.match(this.pretraga.prezime)) {
                   filtered.push(pac);
               }
        });

        if (this.pretraga.jmbg !== "") {
        filtered.forEach(pac => {
          text = pac.grad.toLowerCase();
               if(text.match(this.pretraga.jmbg)) {
                   combinated.push(pac);
               }
        });
        return combinated;
    }
    return filtered;
    }
     if (this.pretraga.jmbg !== "") {
        this.pacijenti.forEach(pac => {
          text = pac.grad.toLowerCase();
          
               if(text.match(this.pretraga.jmbg)) {
                   filtered.push(pac);
               }
        });
     } 
     return filtered;
    }
    
    }

   },

  

methods: {
  prikaziPretragu() {
      this.pretraziBtnClickerd = !this.pretraziBtnClickerd;
    },
    prikaziPretragu2() {
      this.pretraziBtnClickerd2 = !this.pretraziBtnClickerd2;
    },
    pretrazi() {
      axios
      .get("/pacijent/postojeciAktivanPacijent")
      .then(pacijenti => {
        this.pacijenti = pacijenti.data;
      var textId = ""; 
      var textIme = "";
      var textPrz = "";
      var pacijentiFilter = []
      this.pacijenti.forEach(element => {
        
        textIme = element.ime.toLowerCase();
        textPrz = element.prezime.toLowerCase();
        if((element.id == this.idPac || this.idPac === "")  && textIme.includes(this.ime) && textPrz.includes(this.prz)) {
            pacijentiFilter.push(element);
           
        }
      });
      this.pacijenti = pacijentiFilter;
        
      })
      .catch(error => {
        console.log(error);
      });
     
    }
   
},
   
  mounted() {
    axios
      .get("/pacijent/postojeciAktivanPacijent")
      .then(pacijenti => {
        this.pacijenti = pacijenti.data;
        
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>