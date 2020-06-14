import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.config.productionTip = false;

require("@/api-mock");
Vue.use(VueToast);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
