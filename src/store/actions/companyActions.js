import {
  NEW_COMPANY_FAILED,
  NEW_COMPANY_LOADING,
  NEW_COMPANY_SUCCESS,
  PERVIOUS_DATA_OF_COMPANIES,
  GET_ALL_COMPANIES_LOADING,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_COMPANIES_FAILED,
} from '../Types';
import database from '@react-native-firebase/database';

export const addNewCompany = (newCompany) => {
  return (dispatch) => {
    try {
      dispatch({type: NEW_COMPANY_LOADING});
      database().ref().child('companies').push(newCompany);
      dispatch({type: NEW_COMPANY_SUCCESS, payload: newCompany});
    } catch (error) {
      dispatch({type: NEW_COMPANY_FAILED});
    }
  };
};

export const allDataOfCompanies = () => {
  return (dispatch) => {
    try {
      dispatch({type: GET_ALL_COMPANIES_LOADING});
      database()
        .ref()
        .child('companies')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          const TemArr = [];
          for (let key in data) {
            TemArr.push({
              companyID: key,
              userId: data[key].userId,
              cname: data[key].cname,
              es: data[key].es,
              hrname: data[key].hrname,
              email: data[key].email,
              cnum: data[key].cnum,
            });
          }
          dispatch({type: GET_ALL_COMPANIES_SUCCESS, payload: TemArr});
        });
    } catch (error) {
      dispatch({type: GET_ALL_COMPANIES_FAILED});
    }
  };
};
