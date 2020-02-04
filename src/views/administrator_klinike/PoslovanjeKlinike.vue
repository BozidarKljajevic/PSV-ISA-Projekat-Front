<template>
<b-container class="bv-example-row">
  <b-row>
    <b-col>
        <div>
    <b-table class="mt-2 mb-2" striped hover :items="lekari" :fields="fields" caption-top >
          <template v-slot:table-caption><h3>lista lekara i njihove ocene </h3></template>
    </b-table>
  </div>

    </b-col>
    <b-col>
        <b-card bg-variant="primary" text-variant="white" header="Ocena klinike" class="text-center mt-4">
        <b-card-text><h3>{{this.ocenaK}} </h3></b-card-text>
        
      </b-card>
      <b-card bg-variant="primary" text-variant="white" header="Prihod klinike" class="text-center mt-4">
          <label for="Form-ime">prihod od</label>
                    <input
                      type="date"
                      id="Form-ime"
                      class="form-control"
                    v-model="datumOd"
                   
                    />
                     <label for="Form-ime">prihod Do</label>
                    <input
                      type="date"
                      id="Form-ime"
                      class="form-control"
                    v-model="datumDo"
                   
                    />
                     <button
                    type="button"
                    class="btn btn-danger btn-block  mt-2 z-depth-2"
                    @click="proveriStanje"
                  >Proveri stanje</button>
        <h5>Ukupan prihod u tom periodu: {{this.prihod}} </h5>
         <h5>Ukupan prihod klinike: {{this.ukupniPrihod}} </h5>
        
      </b-card>
    </b-col>
  </b-row>
  <b-row>
      <h3 class="mt-4"> Graficki prikaz kalendara i odrzanih pregleda na klinici </h3>
      <template>
  <vue-cal
    selected-date="2020-01-20"
    :time-from="6 * 60"
    :time-to="23 * 60"
    :disable-views="['year']"
    :events="events"
  ></vue-cal>
</template>
  </b-row>
</b-container>
    
</template>

<script>
import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
  export default {
      components: { VueCal },
    data:() => {
        
      return {
          events: [],
          ocenaK: "",
          datumOd: "",
          datumDo: "",
          prihod: "",
          ukupniPrihod: "",
        user: {
            ime: "",
            prezime: "",
            ocena: ""
        },
        fields: [
             {key: 'ime',
            sortable: true},
             {key: 'prezime',
            sortable: true},
             {key: 'ocena',
            sortable: true},
        ],
         lekari: [
            
         ],
         
      }
    },
 methods: {
   proveriStanje() {
       axios
      .get("/klinika/getPrihod/" + this.$store.state.user.id + "/" + this.datumOd + "/" + this.datumDo)
      .then(prihod => {
        this.prihod = prihod.data;
      })
      .catch(error => {
        console.log(error);
      });
   }
 },
    mounted() {
    axios
      .get("/lekar/postojeciLekariKlinike/" + this.$store.state.user.id)
      .then(lekari => {
        this.lekari = lekari.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("/klinika/getOcena/" + this.$store.state.user.id)
      .then(ocenaK => {
        this.ocenaK = ocenaK.data;
      })
      .catch(error => {
        console.log(error);
      });

     axios
      .get("/klinika/getPrihodUkupni/" + this.$store.state.user.id)
      .then(ukupniPrihod => {
        this.ukupniPrihod = ukupniPrihod.data;
      })
      .catch(error => {
        console.log(error);
      });

       axios
        .get("/lekar/obavezeKlinike/" + this.$store.state.user.id)
        .then(events => {
          this.events = events.data;
          console.log(events.data)
        })
        .catch(error => {
          console.log(error);
        });
  }
  }
</script>
<style>

</style>