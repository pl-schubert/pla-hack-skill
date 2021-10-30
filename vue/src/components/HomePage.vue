<template>
  <div class="container">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">MSF Skillz</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
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
