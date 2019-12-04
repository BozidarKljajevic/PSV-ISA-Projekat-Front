<template>
<div>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Lekovi</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group" v-for="lek in lekovi" :key="lek.sifra">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <label id="Form-ime" class="form-control">{{lek.naziv}}</label>
                
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-ime">Šifra</label>
                <label id="Form-ime" class="form-control">{{lek.sifra}}</label>
            
                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="IzbrisiClick1(lek.sifra)"
                  >Obriši</button>
                </div>
              </div>
            </div>
          </div>
          <!--Body-->
        </div>
      </div>
    </div>
    <!--/Form with header-->
    
  </div>

    <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Bolesti</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group" v-for="bolest in bolesti" :key="bolest.sifra">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Naziv</label>
                <label id="Form-ime" class="form-control">{{bolest.naziv}}</label>
                
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-ime">Šifra</label>
                <label id="Form-ime" class="form-control">{{bolest.sifra}}</label>
            
                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    @click="IzbrisiClick2(bolest.sifra)"
                  >Obriši</button>
                </div>
                <hr>
              </div>
            </div>
          </div>
          <!--Body-->
        </div>
      </div>
    </div>
    <!--/Form with header-->
    
  </div>

</div>
    

</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      lekovi: [],
      bolesti: [],
    };
  },
   methods: {
    IzbrisiClick1(id) {
      axios
      .delete("http://localhost:8080/lek/izbrisiLek/"+ id)
      .then(lekovi => {
        this.lekovi = lekovi.data;
      })
      .catch(error => {
        console.log(error);
      });

    },
    IzbrisiClick2(id) {
        alert(id)
      axios
      .delete("http://localhost:8080/bolesti/izbrisiBolest/"+ id)
      .then(bolesti => {
        this.bolesti = bolesti.data;
      })
      .catch(error => {
        console.log(error);
      });

    },
   },
  mounted() {
    axios
      .get("http://localhost:8080/lek/postojeciLek")
      .then(lekovi => {
        this.lekovi = lekovi.data;
        
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:8080/bolesti/postojeceBolesti")
      .then(bolesti => {
        this.bolesti = bolesti.data;
        
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>