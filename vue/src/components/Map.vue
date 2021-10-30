<template>
  <div>
    <Navbar />

    <div class="container">
      <GmapMap
        :center="{ lat: 30, lng: 10 }"
        :zoom="3"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in uniqueLocations[0]"
          :position="
            google && new google.maps.LatLng(m.coords._lat, m.coords._long)
          "
          :clickable="true"
          :draggable="true"
          @click="setLocation(m.location)"
        />
      </GmapMap>
      <div class="col-2">
        <label for="skill">Skill:</label>
        <select id="skill" v-model="selectedSkills" class="form-select">
          <option v-for="skill in skills" v-bind:key="skill">
            {{ skill }}
          </option>
        </select>
      </div>

      <Skills :location="this.selectedLocation" :skill="this.selectedSkills" />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import { db } from "./../db";
import { gmapApi } from "vue2-google-maps";
import Skills from "./Skills.vue";
export default {
  components: {
    Navbar,
    Skills,
  },
  computed: {
    google: gmapApi,
    uniqueLocations: function () {
      const key = "location";
      return [
        [...new Map(this.workers.map((item) => [item[key], item])).values()],
      ];
    },
  },
  data() {
    return {
      workers: [],
      selectedLocation: "all locations",
      selectedSkills: "all Skills",
      skills: ["all Skills", "vaccination", "intubation", "radiology"],
    };
  },
  methods: {
    setLocation: function (location) {
      this.selectedLocation = location;
    },
  },

  firestore: {
    workers: db.collection("workers"),
  },
};
</script>

<style>
</style>