import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { Auth0Plugin } from "./auth";
import Vuelidate from 'vuelidate'

import { domain, clientId } from "./auth_config.json";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

// Authentication plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl 
      ? appState.targetUrl 
      : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
