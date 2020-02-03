export default {
  auth: {
    isAuthenticated: localStorage.getItem("id_token") ? true : false,
    currentUser: {}
  },
  apiCallsInProgress: 0
};
