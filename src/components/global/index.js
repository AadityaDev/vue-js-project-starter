import Vue from 'vue';

const req = require.context('./', true, /\.(vue)$/i);
req.keys().forEach((component) => {
  const name = component.split('.vue')[0].split('./')[1];
  Vue.component(name, req(component).default);
});
