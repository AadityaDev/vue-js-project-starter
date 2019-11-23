import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import '@/plugins';
import '@/filters';
import '@/components/global';

import './registerServiceWorker';
import createRouter from './router';
import store from './store';

import requestInterceptors from './misc/request-interceptors';

Vue.config.productionTip = false;

/*
 sync the router with the vuex store.
 this registers `store.state.route`
*/
const router = createRouter(store);
sync(store, router);

// configure your local storage
Vue.prototype.$vf.config({
  name: 'sps-pwa-db',
});

store.dispatch('getSessionFromLocalDb').then(() => {
  /*
   Intercept all axios requests
   and update its state in store
  */
  requestInterceptors({
    router,
    store,
    $http: Vue.prototype.$http,
  });

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});