import * as types from "../actions/actionTypes";
import initialState from "../initialState";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, ...action };
    case types.LOGIN_FAILURE:
      return { ...state, ...action };
    case types.LOGOUT_SUCCESS:
      return { ...state, ...action };
    case types.REGISTER_SUCCESS:
      return { ...state, ...action };
    case types.UPDATE_REGISTER_SUCCESS:
      return { ...state, ...state.currentUser, name: action.name };
    case types.SET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
}
