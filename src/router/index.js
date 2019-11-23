import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

const Home = () => import('../views/auth-pages/Home.vue');

const Login = () => import('../views/auth-pages/Login.vue');

Vue.use(VueRouter);

const routes = [
  /* Root Page */
  {
    path: '/',
    name: 'RootPage',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => Login,
    meta: {
      redirectIfLoggedIn: true,
    },
  },
];

// const router = new VueRouter({
//   routes,
// });

// export default router;

export default function createRouter(store) {
  const router = new VueRouter({
    fallback: false,
    scrollBehavior(to, from, savedPosition) {
      if (from.meta.saveScrollPos) {
        store.dispatch('setViewScrollPos', {
          name: from.name,
          coordinates: {
            x: window.scrollX,
            y: window.scrollY,
          },
        });
      }
      if (savedPosition) {
        return savedPosition;
      }
      return { x: 0, y: 0 };
    },
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        next({
          name: 'Auth.LoginPage',
        });
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
      if (store.getters.isLoggedIn) {
        next({
          name: 'Dashboard.Tasks',
        });
      } else {
        next();
      }
    } else {
      next();
    }

    try {
      // const pageParamsToTrack = {
      //   from: {
      //     path: from.fullPath,
      //     name: from.name,
      //     params: from.params,
      //     query: from.query,
      //     location: from.path,
      //   },
      //   to: {
      //     path: to.fullPath,
      //     location: to.path,
      //     name: to.name,
      //     params: to.params,
      //     query: to.query,
      //   },
      //   // title: document.title,
      //   // host: document.location.host,
      //   // url: document.location.href,
      //   // hash: document.location.hash || null,
      // };

      // const data = {
      //   type: 'ScreenView',
      //   properties: pageParamsToTrack,
      // };

      // analytics.track(data);
    } catch (e) {
      console.warn(`Error sending 'PageView' event at '${window.location.href}' with error: `, e); // eslint-disable-line
    }
  });

  router.afterEach(() => {
    // store.dispatch('clearViewScrollPos', to.name);
    if (store.state.router.next) store.dispatch('clearNextRoute');
  });

  return router;
}
