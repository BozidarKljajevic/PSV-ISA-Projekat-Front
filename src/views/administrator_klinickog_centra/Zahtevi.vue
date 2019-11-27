<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Zahtevi pacijenata</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group" v-for="pacijent in pacijenti" :key="pacijent.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Ime</label>
                <label id="Form-ime" class="form-control">{{pacijent.ime}}</label>
                <label for="Form-ime">Mail</label>
                <label id="Form-ime" class="form-control">{{pacijent.mail}}</label>

                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-success btn-block z-depth-2"
                    
                  >Prihvati</button>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-ime">Prezime</label>
                <label id="Form-ime" class="form-control">{{pacijent.prezime}}</label>
                <label for="Form-ime">Broj Telefona</label>
                <label id="Form-ime" class="form-control">{{pacijent.brojTelefona}}</label>
                <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    v-b-modal.odbij
                    @click="aktivan = pacijent.id"
                  >Odbij</button>
                </div>
              </div>
            </div>
          </div>
          <!--Body-->
        </div>
      </div>
    </div>
    <!--/Form with header-->
    <b-modal ref="my-modal" id="odbij" hide-footer title="Razlog odbijanja">
      <label for="Form-ime">Opis</label>
      <b-form-textarea id="textarea" placeholder="Opis..." rows="3"></b-form-textarea>
      <b-button class="mt-2" variant="danger" @click="posaljiClick">Pošalji</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pacijenti: [],
      aktivan: "",
    };
  },
   methods: {
    posaljiClick() {
      axios
        .delete(
          "http://localhost:8080/pacijent/ibrisiNeaktivnogPacijenta/"+this.aktivan,
          
        )
        .then(pacijenti => {
          this.pacijenti= pacijenti.data;
          this.$refs['my-modal'].hide()
          
        })
        .catch(error => {
          console.log(error);
        });
    },
   },
  mounted() {
    axios
      .get("http://localhost:8080/pacijent/postojeciNeaktivanPacijent")
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