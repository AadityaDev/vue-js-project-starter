export default ({ $http, $vf }) => ({

  getProfile(context) {
    return $http.get('/api/v1/account/profile', { requestName: 'getProfile' })
      .then((res) => {
        const response = res.data;
        context.commit('setProfileState', response);
        return response;
      });
  },

  login(context, payload) {
    return $http.post('/api/v1/login', payload, { requestName: 'login' })
      .then((res) => {
        console.log(`result is: ${res}`);
      });
  },

  logout(context, redirectUrl) {
    delete $http.defaults.headers.common.Authorization;
    $vf.clear();
    localStorage.clear();
    context.commit('setNextRouteState', {
      next: `/login${redirectUrl ? `?redirect=${redirectUrl}` : ''}`,
    });
    context.commit('setLoggedOutState');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  },

  async getSessionFromLocalDb(context) {
    const [accessToken, user] = await Promise.all([$vf.getItem('accessToken'), $vf.getItem('user')]);
    const obj = {
      accessToken,
      user,
    };
    context.commit('updateSessionFromLocalDbInStore', obj);
    return obj;
  },

});
