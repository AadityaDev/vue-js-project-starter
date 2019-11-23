import Vue from 'vue';
import Vuex from 'vuex';
import accountsModule from './account/account-store';
// import deviceModule from './device-store/device-store';
import notificationsModule from './notification-store/notifications-store';
import requestModule from './request-store/request-store';
import routerModule from './router-store/router-store';

Vue.use(Vuex);

const injectionObj = {
  $http: Vue.prototype.$http,
  $vf: Vue.prototype.$vf,
};

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  strict: true,
  modules: {
    accounts: accountsModule(injectionObj),
    // device: deviceModule(),
    notifications: notificationsModule(),
    request: requestModule(),
    router: routerModule(),
  },
});
