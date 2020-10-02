import {
  CURRENT_USER_FAILED,
  CURRENT_USER_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CURRENT_USER_LOADING,
} from '../Types';

const initState = {
  user: null,
};

const authReducer = (state = initState, action) => {
  console.log('action', action);
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload, 
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
