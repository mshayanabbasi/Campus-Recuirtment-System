import {NEW_VACANCIES, PERVIOUS_DATA_OF_VACANCIES} from '../Types';

const initialState = {
  allVacancies: [],
  prevDataOfVacancies: false,
};

const VacanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_VACANCIES:
      return {
        ...state,
        allVacancies: action.dataP,
        prevDataOfVacancies: true,
      };
    case NEW_VACANCIES:
      return state;
    default:
      return state;
  }
};

export default VacanyReducer;
