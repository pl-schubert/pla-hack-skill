import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import VueRouter from "vue-router";
import HomePage from "./components/HomePage.vue"
import MapPage from "./components/Map.vue"

Vue.use(VueRouter);
Vue.use(firestorePlugin);

Vue.config.productionTip = false
const router = new VueRouter({
  routes: [
    { path: '/', component: MapPage,
    },
    { path: '/fallback', component: HomePage,
    }
  ]
})

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBakx83PHYnV6xDbZYb4a_Qn6WF2bPny8Y',
    libraries: 'places', 
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
