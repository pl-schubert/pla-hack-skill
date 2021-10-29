<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <select v-model="selectedLocation">
      <option v-for="location in locations" v-bind:key="location">
        {{ location }}
      </option>
    </select>
    <h3>You selected location: {{ this.selectedLocation }}</h3>
    <Skills :location="this.selectedLocation" />
  </div>
</template>

<script>
import Skills from "./Skills";
export default {
  name: "HelloWorld",
  data() {
    return {
      selectedLocation: "Tschad",
      locations: ["Frankfurt am Main", "Tschad"],
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
