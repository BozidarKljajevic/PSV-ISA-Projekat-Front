<template>
<div>
  <b-container v-if="error">
      <b-alert show variant="danger" class="d-flex justify-content-center"> {{errormessage}}</b-alert>
    </b-container>

  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <div class="card" style="width: 60%">
      <!--Header-->
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Dodavanje Predefinisanih pregleda</h3>
        </div>
      </div>
      <!--Header-->

      <div class="form-group">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                <label for="Form-ime">Datum</label>
                <input type="text" id="Form-ime" class="form-control" v-model="user.datum" />
                <label for="Form-ime">trajanje</label>
                <input type="text" id="Form-ime" class="form-control" v-model="user.trajanjePregleda" />
                <label for="Form-klinika">Sale</label>
                  <b-form-select v-model="selektovanaSala">
                    <option
                      v-for="sa in sale"
                      :value="sa.id"
                      :key="sa.id"
                    >{{sa.naziv}}</option>
                  </b-form-select>
                  
              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-grad">Vreme</label>
                <input type="text" id="Form-grad" class="form-control"  v-model="user.vreme" />
                <label for="Form-klinika">Tipovi</label>
                  <b-form-select v-model="selektovaniTip" @change="getLekari()">
                    <option
                      v-for="tipp in tipovi"
                      :value="tipp.id"
                      :key="tipp.id"
                    >{{tipp.naziv}}</option>
                  </b-form-select>

                 <label for="Form-klinika">Lekari</label>
                  <b-form-select v-model="selektovaniLekar" >
                    <option
                      v-for="le in lekari"
                      :value="le.id"
                      :key="le.id"
                    >{{le.ime}}</option>
                  </b-form-select>
            
              
              </div>
            </div>
          </div>
          <!--Body-->

          <div class="text-center mb-4">
            <button
              type="button"
              class="btn btn-danger btn-block z-depth-2"
              @click="dodajSalu"
            >Dodaj termin</button>
          </div>
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
      user: {
        datum: "",
        vreme: "",
        trajanjePregleda: "",
        cena: "",
        tipPregleda: {},
        lekar: {},
        sala: {}
      },
      tipovi: [],
      sale: [],
      lekari: [],
      selektovaniTip: "",
      selektovanaSala: "",
      selektovaniLekar: "",
      error: false,
      errormessage: "",
    };
  },
  methods: {

      getLekari() {
          
      axios
        .get("/tipPregleda/TipoviLekara/" + this.selektovaniTip)
        .then(leka => {
          this.lekari = leka.data;
        })
        .catch(error => {
          console.log(error);
        });
    },


    dodajSalu() {
      /*this.klinike.forEach(klinika => {
        if (klinika.id === this.selektovanaKlinika) {
          this.user.klinika = klinika;
        }
      }); */
      if (this.user.datum === "" || this.user.vreme === "" || this.user.trajanjePregleda === "" || this.user.selektovanaSala === "" || this.user.selektovaniLekar === "" ){
         this.error=true;
         this.errormessage="Molimo Vas popunite sva polja";
         return;
       }
    


     var r = /^[0-9]{2}:[0]{2}$/;
     var d = /^[0-9]{2}:30$/;
      if (!r.test(String(this.user.vreme.trim())) && !d.test(String(this.user.vreme.trim()))) {
        this.errormessage = "Radno vreme mora u formatu 00:00";
        this.error = true;
        return;
      }
      
    /*  var r = /^[0-9]{2}:[0-9]{2}$/;
      if (!r.test(String(this.user.vreme.trim()))) {
        this.errormessage = "vreme mora u formatu 00:00";
        this.error = true;
        return;
      } */

       var r = /^[0-9]+[.][0,5]$/;
      if (!r.test(String(this.user.trajanjePregleda.trim()))) {
        this.errormessage = "trajanje mora biti u formatu npr 0.5 ili 1.0 odnosi se na sate";
        this.error = true;
        return;
      }

      var r = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/;
      if (!r.test(String(this.user.datum.trim()))) {
        this.errormessage = "Datum mora u formatu dd/mm/yyyy";
        this.error = true;
        return;
      }
      

     this.tipovi.forEach(tipPregleda => {
        if (tipPregleda.id === this.selektovaniTip) {
          this.user.tipPregleda = tipPregleda;
        }
      });

      this.lekari.forEach(lekar => {
        if (lekar.id === this.selektovaniLekar) {
          this.user.lekar = lekar;
        }
      });

      this.sale.forEach(sala => {
        if (sala.id === this.selektovanaSala) {
          this.user.sala = sala;
        }
      });

      axios
        .post(
          "/pregled/dodajPregled",
          this.user
        )
        .then(user => {
          this.user.naziv = "";
          this.user.vreme = "";
          this.user.cena = "";
          this.user.broj = "";
          this.user.datum = "";
          this.user.trajanjePregleda = "";
          this.selektovaniTip = "";
          this.selektovanaSala = "";
          this.selektovaniLekar = "";
          this.error=false;
        })
        .catch(error => {
          
          this.errormessage = "Termin ne odgovara, promenite lekara ili vreme";
          this.error = true;
          console.log(error);
        });
    }
  },
  mounted() {
    axios
      .get("/tipPregleda/TipoviKlinike/" + this.$store.state.user.id)
      .then(tipovi => {
        this.tipovi = tipovi.data;
      })
      .catch(error => {
        console.log(error);
      });

      axios
      .get("/salaKLinike/SaleKlinike/" + this.$store.state.user.id)
      .then(sale => {
        this.sale = sale.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.header {
  background-color: lightgray;
}
</style>