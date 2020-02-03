import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

import Auth from "../../api/auth";

export const loginUser = creds => {
  return dispatch => {
    dispatch(beginApiCall());
    return Auth.login(creds.user, creds.password)
      .then(user => {
        console.log(user);
        localStorage.setItem("id_token", user.id_token);
        localStorage.setItem("access_token", user.access_token);
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch(beginApiCall());
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    Auth.logout()
      .then(() => dispatch(logoutSuccess()))
      .catch(error => {
        console.log(error);
        dispatch(logoutFailure());
      });
  };
};

const loginSuccess = user => {
  const {
    refreshToken,
    uid,
    displayName,
    photoURL,
    phoneNumber,
    isAnonymous,
    metadata
  } = user;

  return {
    type: types.LOGIN_SUCCESS,
    isAuthenticated: true,
    currentUser: {
      refreshToken,
      uid,
      displayName,
      photoURL,
      phoneNumber,
      isAnonymous,
      metadata
    }
  };
};

const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
    isAuthenticated: false,
    currentUser: {}
  };
};

const logoutFailure = () => {
  return {
    type: types.LOGOUT_FAILURE,
    isAuthenticated: false,
    currentUser: {}
  };
};

export const setCurrentUser = user => {
  return {
    type: types.SET_CURRENT_USER,
    currentUser: user
  };
};

export const registerNewUser = (name, phone, email, password) => {
  return dispatch => {
    dispatch(beginApiCall());
    return Auth.register(email, password)
      .then(user => {
        localStorage.setItem("id_token", user.user.refreshToken);
        const {
          refreshToken,
          uid,
          displayName,
          photoURL,
          phoneNumber,
          isAnonymous,
          metadata
        } = user.user;
        dispatch(
          registerSuccess({
            refreshToken,
            uid,
            displayName,
            photoURL,
            phoneNumber,
            isAnonymous,
            metadata
          })
        );
        Auth.updateProfile(name, phone).catch(error => {
          dispatch(apiCallError(error));
          throw error;
        });
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const updateProfile = (name, phoneNumber) => {
  return dispatch => {
    dispatch(beginApiCall());
    return Auth.updateProfile(name, phoneNumber)
      .then(user => {
        dispatch(updateRegisterSuccess(name, phoneNumber));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

const registerSuccess = user => {
  return {
    type: types.REGISTER_SUCCESS,
    isAuthenticated: true,
    currentUser: user
  };
};

const updateRegisterSuccess = (name, phoneNumber) => {
  return {
    type: types.UPDATE_REGISTER_SUCCESS,
    name,
    phoneNumber
  };
};

export const sendEmailConfirmation = email => {
  return dispatch => {
    dispatch(beginApiCall());
    return Auth.sendEmailConfirmation(email)
      .then(user => {
        dispatch(registerSuccess(user));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};
