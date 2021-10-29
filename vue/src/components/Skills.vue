<template>
  <div>
    <h2>Summary for {{ location }} and {{ skill }}:</h2>
    <h4>Total helpers: {{ workers.length }}</h4>
    <h4 v-if="skill == 'all Skills' || skill == 'vaccination'">
      Ready to vaccinate: {{ totalVaccine }}
    </h4>
    <h4 v-if="skill == 'all Skills' || skill == 'intubation'">
      Ready to set intubation: {{ totalIntubation }}
    </h4>
    <h4 v-if="skill == 'all Skills' || skill == 'radiology'">
      Ready to set intubation: {{ totalRadiology }}
    </h4>

    <h2>Contact Details:</h2>
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
        <th>E-Mail</th>
      </tr>
      <tr v-for="worker in workers" v-bind:key="worker.name">
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
        <td>{{ worker.phonenumber }}</td>
      </tr>
    </table>
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
        total += +worker.vaccine;
      });
      return total;
    },
    totalIntubation: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        total += +worker.intubation;
      });
      return total;
    },
    totalRadiology: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        total += +worker.radiology;
      });
      return total;
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

<style>
</style>