<template>
  <main class="app-root-wrapper">
    <!-- dads -->
    <!-- <router-view to='/home'></router-view> -->
    <device-view :class="deviceClass" />
    <div v-if="updateExists" class="fixed z-20 inset-0 full-width my-5">
      <p class="py-3 w-4/5 text-center bg-gray-800 rounded text-white text-sm flex justify-center align-center mx-auto">
        New version of the SPS is available
        <button id="refresh-button" class="uppercase ml-1 font-bold text-blue-500" @click="refreshApp">
          <i class="fa fa-refresh" />Update
        </button>
      </p>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import {
  isIOS,
  isAndroid,
  isSafari,
  isMobileOnly,
} from 'mobile-device-detect';
import { Script } from 'vm';
// import { isMobileOnly } from 'mobile-device-detect';

const getAppVersion = () => {
  const url = `/package.json?c=${Date.now()}`;
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  };

  return fetch(url, { headers }).then(response => response.json());
};

export default {
  name: 'App',
  components: {
    DeviceView: () =>
    // if (isMobileOnly) {
       import('./Mobile.vue')
    // }
    // return import('@/views/error.vue');
    ,
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  computed: {
    deviceClass() {
      let classStr = ' ';
      classStr += isMobileOnly ? ' mobile-wrapper ' : ' desktop-wrapper';
      classStr += isSafari ? ' safari ' : '';
      classStr += isIOS ? ' ios' : '';
      classStr += isAndroid ? ' android' : '';
      // classStr += this.$route.name !== 'Dashboard.Article.Detail' ? ' ios-safe-padding-top' : '';
      return classStr;
    },
  },
  mounted() {
    const handleScreenFocus = () => {
      if (isIOS && document.visibilityState === 'visible') {
        const currentVersion = global.localStorage.getItem('appVersion');
        getAppVersion()
          .then((data) => {
            if (data.version !== currentVersion) {
              global.localStorage.setItem('appVersion', data.version);
              this.showRefreshUI({});
            }
          });
      }
    };

    document.addEventListener('visibilitychange', handleScreenFocus);
    // ---
    // Custom code to let user update the app
    // when a new service worker is available
    // ---
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return;
        this.refreshing = true;
        // Here the actual reload of the page occurs
        window.location.reload(true);
      });
    }

    // this.$cordova.on('deviceready', () => {
    //   this.cordovaInit();
    // });
  },
  methods: {
    ...mapActions([]),
    hideMessage() {
      this.showMessage = false;
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp() {
      window.location.reload(true);
      this.updateExists = false;
      if (!this.registration || !this.registration.waiting) return;
      // send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage('skipWaiting');
    },
    cordovaInit() {

    },
  },
};

</script>

<style src="@/styles/tailwind.css" />
<style src="@fortawesome/fontawesome-free/css/all.css" />
