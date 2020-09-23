import {NEW_COMPANY, PERVIOUS_DATA_OF_COMPANIES} from '../Types';

const initState = {
  allCompanies: [],
  prevDataOfCompanies: false,
};

const CompanyReducer = (state = initState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_COMPANIES:
      return {
        ...state,
        allCompanies: action.dataC,
        prevDataOfCompanies: true,
      };
    case NEW_COMPANY:
      return state;
    default:
      return state;
  }
};

export default CompanyReducer;
    