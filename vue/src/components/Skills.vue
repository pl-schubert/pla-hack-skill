<template>
  <div>
    <div v-for="worker in workers" v-bind:key="worker">
      {{ worker.name }}
      {{ worker.vaccine }}
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
  },

  // computed: {
  //   totalVaccinated: () => {
  //     let total = 0;
  //     this.workers.forEach((worker) => {
  //       total += workers.vaccine;
  //     });
  //     return total;
  //   },
  // },

  watch: {
    location: {
      immediate: true,
      handler() {
        this.$bind("workers", workers.where("location", "==", this.location));
      },
    },
  },
};
</script>

<style>
</style>