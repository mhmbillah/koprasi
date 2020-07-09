import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#f37021",
        secondary: "#0095da",
        error: "#EF3B42"
      }
    }
  }
});
