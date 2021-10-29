<template>
  <div>
    <div class="row mt-5">
      <h4>Summary for {{ location }} and {{ skill }}:</h4>
    </div>
    <div class="row">
      <h4>Total helpers: {{ workers.length }}</h4>
    </div>
    <div class="row">
      <div class="col">
      Vaccine workers
        <div class="progress">
          <div
            v-bin:class="'progress-bar w-'+totalVaccine"
            role="progressbar"
          ></div>
        </div>
      </div>
      <div class="col">
        Intubation workers
        <div class="progress">
          <div
            v-bind:class="'progress-bar w-'+totalIntubation"
            role="progressbar"
          ></div>
        </div>
      </div>
      <div class="col">
        Radiology workers
        <div class="progress">
          <div
            v-bind:class="'progress-bar w-'+totalRadiology"
            role="progressbar"
          ></div>
        </div>

      </div>
    </div>
    <div class="row mt-5">
    <h4>Worker overview</h4>
    <table class="table">
      <tr>
        <th>Helper Name</th>
        <th v-if="skill == 'all Skills' || skill == 'vaccination'">
          Ready to vaccinate
        </th>
        <th v-if="skill == 'all Skills' || skill == 'intubation'">
          Ready to set intubation
        </th>
        <th v-if="skill == 'all Skills' || skill == 'radiology'">
          Ready to do radiology
        </th>
        <th>Phone Number</th>
      </tr>
      <tr v-for="worker in filteredWorkers" v-bind:key="worker.name">
        <td>{{ worker.name }}</td>
        <td v-if="skill == 'all Skills' || skill == 'vaccination'">
          {{ worker.vaccine == 1 ? "yes" : "no" }}
        </td>
        <td v-if="skill == 'all Skills' || skill == 'intubation'">
          {{ worker.intubation == 1 ? "yes" : "no" }}
        </td>
        <td v-if="skill == 'all Skills' || skill == 'radiology'">
          {{ worker.radiology == 1 ? "yes" : "no" }}
        </td>
        <td>{{ worker.phone }}</td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
import { db } from "./../db";
const workers = db.collection("workers");

export default {
  data() {
    return {
      workers: [],
      selectedLocation: location,
    };
  },
  props: {
    location: String,
    skill: String,
  },

  computed: {
    totalVaccine: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        if (!isNaN(worker.vaccine)) total += +worker.vaccine;
      });
      return (total/workers.length)*100;
    },
    totalIntubation: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        if (!isNaN(worker.intubation)) total += +worker.intubation;
      });
      return (total/workers.length)*100;
    },
    totalRadiology: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        if (!isNaN(worker.radiology)) total += +worker.radiology;
      });
      return (total/workers.length)*100;
    },
    filteredWorkers() {
      switch (this.skill) {
        case "all Skills":
          return this.workers;
        case "vaccination":
          return this.workers.filter((worker) => worker.vaccine == 1);
        case "intubation":
          return this.workers.filter((worker) => worker.intubation == 1);
        case "radiology":
          return this.workers.filter((worker) => worker.radiology == 1);
        default:
          return this.workers;
      }
    },
  },

  watch: {
    location: {
      immediate: true,
      handler() {
        let filtered = workers;
        if (this.location != "all locations") {
          filtered = filtered.where("location", "==", this.location);
        }
        this.$bind("workers", filtered);
      },
    },
  },
};
</script>

<style></style>
