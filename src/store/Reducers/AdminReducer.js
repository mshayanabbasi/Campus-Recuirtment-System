import {
  BLOCK_COMPANY,
  BLOCK_LIST,
  BLOCK_STUDENT,
  COMPANIES_UPDATION_REQUESTS,
  REQUEST_OF_COMPANY_ACCEPT,
  REQUEST_OF_COMPANY_REJECT,
  REQUEST_OF_STUDENT_ACCEPT,
  REQUEST_OF_STUDENT_REJECT,
  STUDENTS_UPDATION_REQUESTS,
  UN_BLOCK_COMPANY,
  UN_BLOCK_STUDENT,
  USER_IS_BLOCKED,
  USER_IS_NOT_BLOCKED,
} from '../Types';
const initState = {
  blockList: [],
  userIsBlocked: false,
  Srequests: [],
  Crequests: [],
  blockedUser: null,
};

const AdminReducer = (state = initState, action) => {
  switch (action.type) {
    case BLOCK_LIST:
      return {
        ...state,
        blockList: action.blockData,
      };
    case BLOCK_STUDENT:
      return {
        ...state,
      };
    case UN_BLOCK_STUDENT:
      return state;
    case BLOCK_COMPANY:
      return {
        ...state,
      };
    case UN_BLOCK_COMPANY:
      return state;
    case USER_IS_BLOCKED:
      return {
        ...state,
        userIsBlocked: true,
        blockedUser: action.blockedUser,
      };
    case USER_IS_NOT_BLOCKED:
      return {
        ...state,
        userIsBlocked: false,
        blockedUser: null,
      };
    case STUDENTS_UPDATION_REQUESTS:
      return {
        ...state,
        Srequests: action.SupdationRequestsData,
      };
    case COMPANIES_UPDATION_REQUESTS:
      return {
        ...state,
        Crequests: action.CupdationRequestsData,
      };
    case REQUEST_OF_STUDENT_ACCEPT:
      return state;
    case REQUEST_OF_COMPANY_ACCEPT:
      return state;
    case REQUEST_OF_STUDENT_REJECT:
      return state;
    case REQUEST_OF_COMPANY_REJECT:
      return state;
    default:
      return state;
  }
};

export default AdminReducer;
