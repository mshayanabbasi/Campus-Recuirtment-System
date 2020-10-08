import {NEW_COMPANY, PERVIOUS_DATA_OF_COMPANIES} from '../Types';

const initState = {
  allCompanies: [],
  prevDataOfCompanies: false,
  company: null,
};

const CompanyReducer = (state = initState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_COMPANIES:
      return {
        ...state,
        prevDataOfCompanies: true,
        allCompanies: action.payload,
      };
    case NEW_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    default:
      return state;
  }
};

export default CompanyReducer;
