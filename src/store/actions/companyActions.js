import {
  NEW_COMPANY,
  PERVIOUS_DATA_OF_COMPANIES,
  UPDATE_COMPANY,
} from '../Types';
import database from '@react-native-firebase/database';

export const addNewCompany = (newCompany) => {
  return (dispatch) => {
    database().ref().child('companies').push(newCompany);
    console.log(newCompany);
    dispatch({type: NEW_COMPANY, payload: newCompany});
  };
};

// export const UpdateCurrentCompany = (data, editID) => {
//   return (dispatch) => {
//     database().ref().child(`companies/${editID}`).update(data);
//     dispatch({type: UPDATE_COMPANY});
//   };
// };

export const PrevDataOfCompanies = () => {
  return (dispatch) => {
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
        dispatch({type: PERVIOUS_DATA_OF_COMPANIES, payload: TemArr});
      });
  };
};
