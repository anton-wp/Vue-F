import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter";
import currencyFilter from "@/filters/currency.filter";
import tooltipDirective from "@/directives/tooltip.directive";
import messagePlugin from "@/utils/message.plugin";
import Paginate from "vuejs-paginate";
import Loader from "@/components/app/Loader";
import "./registerServiceWorker";

import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("localize", localizeFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyAgAbSBM74N3TKSuJ_a58QF34veM9jSGFU",
  authDomain: "vue-f-54434.firebaseapp.com",
  databaseURL: "https://vue-f-54434.firebaseio.com",
  projectId: "vue-f-54434",
  storageBucket: "vue-f-54434.appspot.com",
  messagingSenderId: "419737780039",
  appId: "1:419737780039:web:cb9f9981c21111461b5662",
  measurementId: "G-0JEVJD7SWE"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
