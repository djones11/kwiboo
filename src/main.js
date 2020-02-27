import Vue from "vue";
import App from "./App.vue";
import VueMq from "vue-mq";
import store from "./store/store.js";

Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: {
    mob: 500,
    tablet: 900,
    desktop: Infinity
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
