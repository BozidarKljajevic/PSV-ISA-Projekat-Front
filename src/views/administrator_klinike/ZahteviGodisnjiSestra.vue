<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Zahtevi Lekara za godisnji</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group" v-for="zahtev in zahtevi" :key="zahtev.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Datum od</label>
                <label id="Form-ime" class="form-control">{{zahtev.datumOd}}</label>
                <label id="Form-ime" class="form-control">{{zahtev.sestra.ime}}</label>
                
               <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-success btn-block z-depth-2"
                    @click="potvrda(zahtev.id)" 
                  >Prihvati</button> 
                </div>
                
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
               <label for="Form-ime">Datum do</label>
                <label id="Form-ime" class="form-control">{{zahtev.datumDo}}</label>
                 <label id="Form-ime" class="form-control">{{zahtev.sestra.prezime}}</label>
                
                 <div class="text-center mb-4">
                  <button
                    type="button"
                    class="btn btn-danger btn-block z-depth-2"
                    v-b-modal.odbij
                    @click="aktivan = zahtev.id"
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
      <label for="Form-ime" >Opis</label>
      <b-form-textarea id="textarea" placeholder="Opis..." rows="3" v-model="odgovor.poruka"></b-form-textarea>
      <b-button class="mt-2" variant="danger" @click="posaljiClick">Pošalji</b-button>
    </b-modal> 
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      zahtevi: [],
      aktivan: "",
      odgovor: {
        poruka: ""
      }
    };
  },
  methods: {
    potvrda(id) {
      axios
        .post("/godisnji/aktivirajGodisnjiSestra/" + id +
          "/" + this.$store.state.user.id )
        .then(zahtevi => {
          this.zahtevi = zahtevi.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    posaljiClick() {
      axios
        .post("/godisnji/izbrisiOdbijenZahtevZaGodisnjiSestra/" + this.aktivan +
          "/" + this.$store.state.user.id, this.odgovor)
        .then(zahtevi => {
          this.zahtevi = zahtevi.data;
          this.$refs["my-modal"].hide();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/godisnji/sviGodisnjiZahteviSestra/" + this.$store.state.user.id)
      .then(zahtevi => {
        this.zahtevi = zahtevi.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>