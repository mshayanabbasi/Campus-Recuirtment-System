import {GET_ALL_COMPANIES_SUCCESS, NEW_COMPANY_SUCCESS} from '../Types';

const initState = {
  allCompanies: [],
  company: null,
};

const CompanyReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        allCompanies: action.payload,
      };
    case NEW_COMPANY_SUCCESS:
      return {
        ...state,
        company: action.payload,
      };
    default:
      return state;
  }
};

export default CompanyReducer;
