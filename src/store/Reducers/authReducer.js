import {
  CURRENT_USER_ERROR,
  LOGOUT,
  CURRENT_USER,
  SIGNUP_SUCCESS,
  LOGIN_SUCCESS,
} from '../Types';

const initState = {
  type: '',
  currentUser: null,
  errorMessage: '',
  typeErr: false,
  logInUser: {},
  signUpUser: {},
};

const authReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpUser: action.signUpUser,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        logInUser: action.logInUser,
      };
    case CURRENT_USER:
      return {
        ...state,
        type: action.userType,
        currentUser: action.currentUser,
      };
    case CURRENT_USER_ERROR:
      return {
        ...state,
        type: '',
        currentUser: null,
      };
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default authReducer;
