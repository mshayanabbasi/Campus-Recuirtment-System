import {
  DELETE_VACANCY,
  ERROR_POST_COMPANY,
  NEW_VACANCIES,
  PERVIOUS_DATA_OF_VACANCIES,
  REMOVE_ERROR_MESSAGES_POST_COMPANY,
} from '../Types';

const initialState = {
  allVacancies: [],
  errorFlag: false,
  errorMessage: '',
  vacancy: null,
};

const VacanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_VACANCIES:
      return {
        ...state,
        allVacancies: action.payload,
      };
    case NEW_VACANCIES:
      return {
        ...state,
        vacancy: action.payload,
      };
    case DELETE_VACANCY:
      return state;
    case REMOVE_ERROR_MESSAGES_POST_COMPANY:
      return {
        ...state,
        errorFlag: false,
        errorMessage: '',
      };
    case ERROR_POST_COMPANY:
      return {
        ...state,
        errorFlag: true,
        errorMessage: action.errorMessagePC,
      };
    default:
      return state;
  }
};

export default VacanyReducer;
