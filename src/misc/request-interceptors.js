async function setAuthHeaders({ store, $http }) {
  const accessToken = store.state.accounts.accessToken;
  if (accessToken) {
    $http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete $http.defaults.headers.common.Authorization;
  }
}

export default async ({ store, $http }) => {
  // Initialize the function first time
  await setAuthHeaders({ store, $http });

  // Add a request interceptor
  $http.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      setAuthHeaders({ store, $http });
      store.dispatch('setRequestStatus', {
        inProgress: true,
        status: 'IN_PROGRESS',
        key: config.requestName || '',
      });
      return config;
    },
    error => Promise.reject(error), // Do something with request error
  );

  // Add a response interceptor
  $http.interceptors.response.use(
    (response) => {
      // Do something with response data
      if (response.config.requestName !== 'newRelic') store.dispatch('clearRequestStatus');
      return response;
    },
    (error) => {
      if (error.response.config.requestName === 'newRelic') return Promise.reject(error);
      // Do something with response error
      try {
        if (error.response.status === 401) {
          store.dispatch('addToastNotifications', {
            text: 'Oops! You got logged out. Login again.',
            timer: 4000,
            type: 'error',
          });

          // Logout the user
          store.dispatch('logout', store.state.route.fullPath);
        } else if (error.response.status === 403) {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.message) || error.message || 'Invalid username or password',
            timer: 4000,
            type: 'error',
          });
        } else {
          store.dispatch('addToastNotifications', {
            text: (error.response && error.response.data && error.response.data.message) || error.message,
            timer: 4000,
            type: 'error',
          });
        }
      } catch (e) {
        console.warn(e.message); // eslint-disable-line
      }

      store.dispatch('clearRequestStatus');
      return Promise.reject(error);
    },
  );
};
