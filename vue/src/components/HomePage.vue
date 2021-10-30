<template>
  <div class="container">
    <Navbar />
    <h1>{{ msg }}</h1>
    <div class="row mt-5">
      <div class="col-2">
        <label for="location">Location:</label>
        <select id="location" v-model="selectedLocation" class="form-select">
          <option v-for="location in uniqueLocations" v-bind:key="location">
            {{ location }}
          </option>
        </select>
      </div>
      <div class="col-2">
        <label for="skill">Skill:</label>
        <select id="skill" v-model="selectedSkills" class="form-select">
          <option v-for="skill in skills" v-bind:key="skill">
            {{ skill }}
          </option>
        </select>
      </div>
    </div>
    <Skills :location="this.selectedLocation" :skill="this.selectedSkills" />
  </div>
</template>

<script>
import Skills from "./Skills";
import Navbar from "./Navbar.vue";
import { db } from "./../db";

export default {
  name: "HelloWorld",
  data() {
    return {
      selectedLocation: "all locations",
      locations: ["all locations", "Abuja", "N'Djamena", "Frankfurt am Main"],
      selectedSkills: "all Skills",
      skills: ["all Skills", "vaccination", "intubation", "radiology"],
      workers: [],
    };
  },
  components: {
    Skills,
    Navbar,
  },
  props: {
    msg: String,
  },
  computed: {
    uniqueLocations: function () {
      let locations = ["all locations"];
      return [
        ...locations,
        ...new Set(this.workers.map((item) => item.location)),
      ];
    },
  },
  firestore: {
    workers: db.collection("workers"),
  },
};
</script>
