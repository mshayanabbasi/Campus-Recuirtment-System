import {
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAILED,
  LOGIN_VALIDATION_PASSWORD,
  LOGIN_VALIDATION_EMAIL,
  CURRENT_USER_SUCCESS,
} from '../Types';

const initState = {
  user: null,
  errorMessage: '',
  logInEmail: false,
  logInPass: false,
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
    case LOGIN_FAILED:
      if (action.payload.code === 'auth/invalid-email') {
        return {
          ...state,
          errorMessage: action.payload.message,
          logInEmail: true,
        };
      } else if (action.payload.code === 'auth/user-not-found') {
        return {
          ...state,
          errorMessage: action.payload.message,
          logInPass: true,
        };
      } else if (action.payload.code === 'auth/wrong-password') {
        return {
          ...state,
          errorMessage: action.payload.message,
          logInEmail: true,
        };
      } else {
        return state;
      }
    case LOGIN_VALIDATION_EMAIL:
      return {
        ...state,
        errorMessage: 'Please enter your email address',
        logInEmail: true,
      };
    case LOGIN_VALIDATION_PASSWORD:
      return {
        ...state,
        errorMessage: 'Please enter your password',
        logInPass: true,
      };
    case CURRENT_USER_SUCCESS:
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
