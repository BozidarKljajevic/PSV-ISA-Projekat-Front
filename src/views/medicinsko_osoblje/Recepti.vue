<template>
  
  <b-container class="d-flex justify-content-center" style="margin-top: 20px">
      <b-card style="width: 60%">
        <!--Header-->
        <div class="header pt-3 lighten-2">
          <div class="row d-flex justify-content-start">
            <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Recepti</h3>
          </div>
        </div>

        <div class="form-group" v-for="izvestaj in Izvestaji" :key="izvestaj.id">
        <div class="card-body mx-4 mt-4">
          <div class="row">
            <div class="col">
              <div class="md-form">
                  <ul id="example-1">
                    <li v-for="item in izvestaj.recept.lekovi" :key="item.sifra">
                        {{ item.naziv }}
                    </li>
                    </ul>
                <!--<label id="Form-ime" class="form-control">{{recept.lekovi[0].naziv}}</label>-->

              </div>
            </div>
            <div class="col">
              <div class="md-form pb-3">
                <label for="Form-ime">{{izvestaj.pacijent.ime}}</label>
                
              </div>
            </div>
          </div>
          <div class="row">
           <button
                  type="button"
                  class="btn btn-success btn-block mt-2 z-depth-2"
                  @click="overi(izvestaj.recept.id)"
                >Overi</button>
           
          </div> 
        </div>
      </div>
      </b-card>
    </b-container>

</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            Izvestaji: [],
            idRecepta: "",

        };
    },
    methods: {
        overi(rec){
            
            this.idRecepta=rec;
            console.log(this.idRecepta);
            axios
                .post(
                    "/recept/overi/" +
                    this.$store.state.user.id +
                    "/" +
                    this.idRecepta
                )
                .then(response => {
                  this.Izvestaji=response.data;
                })
                .catch(error => {
                console.log(error);
                });    
        }
    },
    mounted(){
        axios
        .get(
          "/medicinskaSestra/recepti/" +
            this.$store.state.user.id
        )
        .then(Izvestaji => {
          this.Izvestaji = Izvestaji.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
}


</script>

<style>

</style>