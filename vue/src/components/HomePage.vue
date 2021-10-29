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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
