<template>
  <div>
    <div class="row mt-5">
      <h4>Summary for {{ location }} and {{ skill }}:</h4>
    </div>
    <div class="row">
      <div class="col">
        Vaccine workers

        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            v-bind:style="
              'width: ' +
              Math.round((totalVaccine / workers.length) * 100) +
              '%'
            "
          >
            {{ totalVaccine }}
          </div>
        </div>
      </div>
      <div class="col">
        Intubation workers
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            v-bind:style="
              'width: ' +
              Math.round((totalIntubation / workers.length) * 100) +
              '%'
            "
          >
            {{ totalIntubation }}
          </div>
        </div>
      </div>
      <div class="col">
        Radiology workers
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            v-bind:style="
              'width: ' +
              Math.round((totalRadiology / workers.length) * 100) +
              '%'
            "
          >
            {{ totalRadiology }}
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <h4>Worker overview</h4>
      <table class="table" v-if="filteredWorkers.length > 0">
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
      <h3 class="text-danger" v-else>
        No helper in {{ location }} for {{ skill }}
      </h3>
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
      return total;
    },
    totalIntubation: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        if (!isNaN(worker.intubation)) total += +worker.intubation;
      });
      return total;
    },
    totalRadiology: function () {
      let total = 0;
      this.workers.forEach((worker) => {
        if (!isNaN(worker.radiology)) total += +worker.radiology;
      });
      return total;
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
