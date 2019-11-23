const cordova = {
  deviceready: false,
  on: (eventName, cb) => {
    document.addEventListener(eventName, cb, false);
  },
};

document.addEventListener('deviceready', () => {
  cordova.deviceready = true;
}, false);

export default (Vue) => {
  Object.defineProperties(Vue.prototype, {
    $cordova: {
      get() {
        return cordova;
      },
    },
  });
};
