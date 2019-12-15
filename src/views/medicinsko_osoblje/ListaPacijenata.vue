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
       <b-container class="mt-4">
        <h4>Sortiraj po</h4>
        <b-select v-model="sortirajPo">
          <option value="">Vremenu Nastanka</option>
          <option value="ime">Imenu</option>
        </b-select>
      </b-container>

      <div class="form-group" v-for="pacijent in sortiraniPacijenti" :key="pacijent.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Ime</label>
                <label id="Form-ime" class="form-control">{{pacijent.ime}}</label>
                <label for="Form-ime">Mail</label>
                <label id="Form-ime" class="form-control">{{pacijent.mail}}</label>

                
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-ime">Prezime</label>
                <label id="Form-ime" class="form-control">{{pacijent.prezime}}</label>
                <label for="Form-ime">Broj Telefona</label>
                <label id="Form-ime" class="form-control">{{pacijent.brojTelefona}}</label>
                
              </div>
            </div>
          </div>
          <!--Body-->
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
      pacijenti: [],
      sortirajPo: "",
    };
  },
   methods: {
       compare(a, b) {
      if (a[this.sortirajPo] < b[this.sortirajPo]) {
        return -1;
      }
      if (a[this.sortirajPo] > b[this.sortirajPo]) {
        return 1;
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