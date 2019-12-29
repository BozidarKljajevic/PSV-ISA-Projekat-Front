<template>
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
                    

                    <label for="Form-ime">Ime</label>
                    <input
                      type="text"
                      id="Form-ime"
                      class="form-control"
                      disabled
                      v-model="user.ime"
                    />

                    <label for="Form-klinika">Lekovi</label>
                  <b-form-select >
                    <option
                      v-for="lek in lekovi"
                      :key="lek.sifra"
                    >{{lek.naziv}}</option>
                  </b-form-select>
            
                 <label for="Form-klinika">Bolesti</label>
                  <b-form-select >
                    <option
                      v-for="bol in bolesti"
                      
                      :key="bol.sifra"
                    >{{bol.naziv}}</option>
                  </b-form-select>
                    
               
                  <button
                    type="button"
                    class="btn btn-danger btn-block  mt-2 z-depth-2"
                   
                  >Zavrsi pregled</button>
                
                  
                  
              

                </div>
                </div>

                    <div class="col">
                  <div class="md-form pb-3">
                   

                    <label for="Form-prezime">Prezime</label>
                    <input
                      type="text"
                      id="Form-prezime"
                      class="form-control"
                      disabled
                      v-model="user.prezime"
                      
                    />

                    <label for="Form-city">Opis</label>
                    <input
                      type="text"
                      id="Form-city"
                      class="form-control"
                      
                    />

                    <label for="Form-city">Dijagnoza</label>
                    <input
                      type="text"
                      id="Form-city"
                      class="form-control"
                      
                    />
                    
                   <router-link :to="'/ZakaziPregled/'+this.$route.params.id" tag="button" class="btn btn-success mt-2 btn-block z-depth-2">Zakazi Pregled</router-link>

                    
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
      user: {},
      lekovi: [],
      bolesti: []
    };
  },

 mounted() {
    axios
      .get("/pacijent/preuzmiPac/" + this.$route.params.id)
      .then(pacijent => {
        this.user = pacijent.data;
      })
      .catch(error => {
        console.log(error);
      });


       axios
      .get("/lek/postojeciLek")
      .then(lekovi => {
        this.lekovi = lekovi.data;
        
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/bolesti/postojeceBolesti")
      .then(bolesti => {
        this.bolesti = bolesti.data;
        
      })
      .catch(error => {
        console.log(error);
      });

  }



      
}

</script>

<style>

</style>