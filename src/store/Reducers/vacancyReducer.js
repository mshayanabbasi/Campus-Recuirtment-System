import {
  APPLY_NOW_VACANCY_SUCCESS,
  APPLY_VACANCY_DATA_SUCCESS,
  GET_ALL_VACANCIES_SUCCESS,
  NEW_VACANCIES,
  NEW_VACANCIES_SUCCESS,
} from '../Types';

const initialState = {
  allVacancies: [],
  vacancy: null,
  applyJob: null,
  candidates: [],
};

const VacanyReducer = (state = initialState, action) => {
  console.log('Vacancy Reducer', action);
  switch (action.type) {
    case GET_ALL_VACANCIES_SUCCESS:
      return {
        ...state,
        allVacancies: action.payload,
      };
    case NEW_VACANCIES_SUCCESS:
      return {
        ...state,
        vacancy: action.payload,
      };
    case APPLY_NOW_VACANCY_SUCCESS:
      return {
        ...state,
        applyJob: action.payload,
      };
    case APPLY_VACANCY_DATA_SUCCESS:
      return {
        ...state,
        candidates: action.payload,
      };
    default:
      return state;
  }
};

export default VacanyReducer;
