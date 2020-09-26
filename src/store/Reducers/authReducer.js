import {
  CURRENT_USER_FAILED,
  CURRENT_USER_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CURRENT_USER_LOADING,
} from '../Types';

const initState = {
  laoding: false,
  type: 'student',
  currentUser: null,
  errorMessage: '',
  typeErr: false,
  logInUser: null,
  signUpUser: {},
  isAuthenticated: false,
};

const authReducer = (state = initState, action) => {
  console.log('action', action);
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpUser: action.payload,
        isAuthenticated: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        logInUser: action.payload,
        isAuthenticated: true,
      };
    case CURRENT_USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        type: action.userType,
        currentUser: action.currentUser,
        isAuthenticated: true,
      };
    case CURRENT_USER_FAILED:
      return {
        ...state,
        type: '',
        currentUser: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        type: '',
      };
    default:
      return state;
  }
};

export default authReducer;
