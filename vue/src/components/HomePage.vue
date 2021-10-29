<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <select v-model="selectedLocation">
      <option v-for="location in locations" v-bind:key="location">
        {{ location }}
      </option>
    </select>
    <select v-model="selectedSkills">
      <option v-for="skill in skills" v-bind:key="skill">
        {{ skill }}
      </option>
    </select>
    <Skills :location="this.selectedLocation" :skill="this.selectedSkills" />
  </div>
</template>

<script>
import Skills from "./Skills";
export default {
  name: "HelloWorld",
  data() {
    return {
      selectedLocation: "all locations",
      locations: ["all locations", "Abuja", "N'Djamena", "Frankfurt am Main"],
      selectedSkills: "all Skills",
      skills: ["all Skills", "vaccination", "intubation", "radiology"],
    };
  },
  components: {
    Skills,
  },
  props: {
    msg: String,
  },
};
</script>
