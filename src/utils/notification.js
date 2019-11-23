const showErrorMessage = (store, message) => {
  store.dispatch('addToastNotifications', {
    text: message,
    timer: 4000,
    type: 'error',
  });
};

const showSuccessMessage = (store, message) => {
  store.dispatch('addToastNotifications', {
    text: message,
    timer: 4000,
    type: 'success',
  });
};
module.exports = { showErrorMessage, showSuccessMessage };
