<template>
  <div class="container d-flex justify-content-center" style="margin-top: 20px">
    <!--Form with header-->
    <b-container class="card" style="width: 60%">
      <div class="header pt-3 grey lighten-2">
        <div class="row d-flex justify-content-start">
          <h1 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Klinike</h1>
        </div>
      </div>

      <b-container class="mt-4">
        <h4>Sortiraj po</h4>
        <b-select v-model="sortirajPo">
          <option value>Vremenu Nastanka</option>
          <option value="naziv">Naziv</option>
          <option value="ocena">Ocena</option>
        </b-select>
      </b-container>

      <b-card
        border-variant="danger"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center"
        class="mt-4"
        v-for="klinika in sortiraneKlinike"
        :header="klinika.naziv"
        :key="klinika.id"
        @click="otvoriKliniku(klinika)"
      >
        <div class="row">
          <div class="col">
            <div class="md-form">
              <label>Opis</label>
              <label class="form-control">{{klinika.opis}}</label>
            </div>
          </div>
          <div class="col">
            <div class="md-form pb-3">
              <label>Ocena</label>
              <label class="form-control">{{klinika.ocena}}</label>
            </div>
          </div>
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      klinike: [],
      sortirajPo: ""
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
    },
    otvoriKliniku(klinika) {
      this.$router.push("/klinika/"+klinika.id+"/"+klinika.naziv);
    }
  },
  computed: {
    sortiraneKlinike() {
      if (this.sortirajPo != "") {
        return this.klinike.sort(this.compare);
      } else {
        return this.klinike;
      }
    }
  },
  mounted() {
    axios
      .get("/klinika/sveKlinike")
      .then(klinike => {
        this.klinike = klinike.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.card:hover {
  border-width: thick
}
</style>