import accountsActionModule from './account-action';

const initializeState = () => ({
  accessToken: null,
  user: {},
  profile: {},
  preferences: {},
});

export default ({ $http, $vf }) => ({
  state: {
    ...initializeState(),
  },
  mutations: {
    setLoggedInState(state, payload) {
      state.accessToken = payload.accessToken ? payload.accessToken : null;
      state.user = payload.user ? { ...payload.user } : {};
    },
    setLoggedOutState(state) {
      Object.assign(state, initializeState());
    },
    setProfileState(state, payload) {
      state.profile = Object.keys(payload).length ? payload : {};
    },
    updateSessionFromLocalDbInStore(state, payload) {
      state.accessToken = payload.accessToken || null;
      state.user = payload.user || {};
    },
  },
  actions: accountsActionModule({ $http, $vf }),
  getters: {
    isLoggedIn: state => !!state.accessToken,
    user: (state) => {
      const user = { ...state.user };
      return user;
    },
    profile: (state) => {
      const profile = { ...state.profile };
      return profile;
    },
    preferences: state => state.preferences,
  },
});
