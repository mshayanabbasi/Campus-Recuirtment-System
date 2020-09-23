import {
  NEW_COMPANY,
  PERVIOUS_DATA_OF_COMPANIES,
  UPDATE_COMPANY,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

export const addNewCompany = (newCompany) => {
  return (dispatch) => {
    firebase.database().ref().child('companies').push(newCompany);
    dispatch({type: NEW_COMPANY});
  };
};

export const UpdateCurrentCompany = (data, editID) => {
  return (dispatch) => {
    firebase.database().ref().child(`companies/${editID}`).update(data);
    dispatch({type: UPDATE_COMPANY});
  };
};

export const PrevDataOfCompanies = () => {
  return (dispatch) => {
    firebase
      .database()
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
            block: data[key].block,
          });
        }
        dispatch({type: PERVIOUS_DATA_OF_COMPANIES, dataC: TemArr});
      });
  };
};



ex;
