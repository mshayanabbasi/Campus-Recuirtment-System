import {
  DELETE_VACANCY,
  NEW_VACANCIES,
  PERVIOUS_DATA_OF_VACANCIES,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

export const addNewVacancy = (newVacany) => {
  return (dispatch) => {
    firebase.database().ref().child('vacancies').push(newVacany);
    dispatch({type: NEW_VACANCIES, newVacany});
  };
};

export const deleteVacany = (did) => {
  return (dispatch) => {
    firebase.database().ref().child(`vacancies/${did}`).remove();
    dispatch({type: DELETE_VACANCY});
  };
};

export const prevDataOfVacancies = () => {
  return (dispatch) => {
    firebase
      .database()
      .ref()
      .child('vacancies')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const TemArr = [];
        for (let key in data) {
          TemArr.push({
            postId: key,
            userId: data[key].userId,
            jobname: data[key].jobname,
            jobdescription: data[key].jobdescription,
            salary: data[key].salary,
            ec: data[key].ec,
            cname: data[key].cname,
            block: data[key].block,
          });
        }
        dispatch({type: PERVIOUS_DATA_OF_VACANCIES, dataP: TemArr});
      });
  };
};
