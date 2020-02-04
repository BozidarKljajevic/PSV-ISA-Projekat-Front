<template>
<div>
<b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>
     <b-container v-if="success">
          <b-alert
            show="2"
            variant="success"
            class="d-flex justify-content-center mt-2"
          >Uspesno ste poslali zahtev za pregled</b-alert>
        </b-container>
  <div>
    <div>
     
      <div class="container d-flex justify-content-center" style="margin-top: 20px">
        <div class="card" style="width: 60%">
          <div class="header pt-3 grey lighten-2">
            <div class="row d-flex justify-content-start">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Pregled pacijenta </h3>
            </div>
          </div>
        <div class="form-group">
            <div class="card-body mx-4 mt-4">
              <div class="row">
                <div class="col">
                  <div class="md-form">
                    

                    <label for="Form-ime">datum</label>
                    <input
                      type="date"
                      id="Form-ime"
                      class="form-control"
                    v-model="user.datum"
                     @change="getVreme()"
                    />

                 
                  <!--<label for="Form-prezime">vreme</label>
                    <input
                      type="text"
                      id="Form-prezime"
                      class="form-control"
                       v-model="user.vreme"
                      
                      
                    /> -->
                    <label for="Form-prezime">vreme</label>
                    <b-select v-model="user.vreme">
                <option v-for="termin in slobodniTermini" :key="termin">{{termin}}</option>
              </b-select>

                     <label for="Form-prezime">Trajanje</label>
                    <input
                      type="text"
                      id="Form-prezime"
                      class="form-control"
                       v-model="user.trajanjePregleda"
                        @change="getVreme()"
                      
                      
                    />

                    <label for="Form-prezime">Izbor</label>
                    <b-form-select v-model="selectedUser">
                    <option
                      v-for="option in optionsUser"
                      :value="{ id: option.id, text: option.name }"
                      :key="option.text"
                    >{{option.name}}</option>
                  </b-form-select>
               
                  <button
                    type="button"
                    class="btn btn-danger btn-block  mt-2 z-depth-2"
                    @click="zakazi"
                  >Zakazi pregled</button>
                
                  
                  
              

                </div>
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
      user: {
        datum: "",
        vreme: "",
        trajanjePregleda: "",
        izbor: ""
      },
      selectedUser: "",
      optionsUser: [{id: 1, name: 'pregled'},
      {id: 2, name: 'operacija'}],
      error: false,
       slobodniTermini: [],
      errormessage: "",
       success: false
    };
  },

    methods: {

      getVreme() {
        if(this.user.trajanjePregleda == "") {
          this.error = true;
          this.errormessage = "unesite i trajanje da bi mogli da dobijete moguca vremena za pregled"
         return;
        } else {
           this.error = false;
        }
         axios
        .get("/lekar/dostupniTermini/" + this.user.trajanjePregleda + "/" + this.user.datum + "/" + this.$store.state.user.id )
        .then(leka => {
          this.slobodniTermini = leka.data;
        })
        .catch(error => {
          this.error = true;
          this.errormessage = "unesite i trajanje da bi mogli da dobijete moguca vremena za pregled"
          console.log(error);
        });

      },


    zakazi() {

      console.log(this.selectedUser);
      if(this.selectedUser.text === "pregled") {
        this.user.izbor = true;
      } else {
        this.user.izbor = false;
      }
    this.error = false;
     if (this.user.datum === "" || this.user.vreme === "" ){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }

       var r = /^[0-9]+[.][0,5]$/;
      if (!r.test(String(this.user.trajanjePregleda.trim()))) {
        this.errormessage = "trajanje mora biti u formatu npr 0.5 ili 1.0 odnosi se na sate";
        this.error = true;
        return;
      }


     /*   var r = /^[0-9]{2}:[0-9]{2}$/;
      if (!r.test(String(this.user.vreme.trim()))) {
        this.errormessage = "vreme mora u formatu 00:00";
        this.error = true;
        return;
      }

      var r = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
      if (!r.test(String(this.user.datum.trim()))) {
        this.errormessage = "Datum mora u formatu dd/mm/yyyy";
        this.error = true;
        return;
      } */
 this.success = false;
    axios
        .post("/pregled/podnesiZahtevLekar/" + this.$route.params.id, this.user)
        .then(response => {
          this.success = true;
          this.user.datum = "";
          this.user.vreme = "";
          this.user.trajanjePregleda = "";
          this.selectedUser = "";
        })
        .catch(error => {
          this.errormessage = "Nedozvoljavajuci datum ili vreme za tog lekara";
          this.error = true;
          console.log(error);
        });


    }

    
    },



 mounted() {
   
  }



      
}

</script>

<style>

</style>