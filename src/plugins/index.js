import Vue from 'vue';
import vf from 'vue-forage';
import VeeValidate from 'vee-validate';

const req = require.context('./', true, /\.(js|vue)$/i);
const filteredFiles = req.keys().filter(key => !key.includes('/index.js'));
filteredFiles.forEach((plugin) => {
  Vue.use(req(plugin).default);
});

Vue.use(vf);
Vue.use(VeeValidate, {
  delay: 100,
});
