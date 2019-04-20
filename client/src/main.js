// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import "./../node_modules/bulma/css/bulma.css";
import Snotify from "vue-snotify";
import "vue-snotify/styles/material.css";
import VueTheMask from "vue-the-mask";

Vue.use(VueTheMask);

Vue.use(Snotify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
