import {
  APPLY_NOW_VACANCY_FAILED,
  APPLY_NOW_VACANCY_LOADING,
  APPLY_NOW_VACANCY_SUCCESS,
  APPLY_VACANCY_DATA_LOADING,
  APPLY_VACANCY_DATA_SUCCESS,
  DELETE_VACANCY,
  ERROR_POST_COMPANY,
  NEW_VACANCIES,
  PERVIOUS_DATA_OF_VACANCIES,
  REMOVE_ERROR_MESSAGES_POST_COMPANY,
} from '../Types';
import database from '@react-native-firebase/database';

export const addNewVacancy = (newVacany) => {
  return (dispatch) => {
    database().ref().child('vacancies').push(newVacany);
    console.log(newVacany);
    dispatch({type: NEW_VACANCIES, payload: newVacany});
  };
};

// export const deleteVacany = (did) => {
//   return (dispatch) => {
//     database().ref().child(`vacancies/${did}`).remove();
//     dispatch({type: DELETE_VACANCY});
//   };
// };

export const prevDataOfVacancies = () => {
  return (dispatch) => {
    database()
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
            companyID: data[key].companyID,
          });
        }
        dispatch({type: PERVIOUS_DATA_OF_VACANCIES, payload: TemArr});
      });
  };
};

export const RemoveErrorMessagesPC = () => {
  return (dispatch) => {
    dispatch({type: REMOVE_ERROR_MESSAGES_POST_COMPANY});
  };
};

export const ErrorPC = () => {
  return (dispatch) => {
    dispatch({type: ERROR_POST_COMPANY, errorMessagePC: mess});
  };
};

export const ApplyVacancy = (applyVacancy) => {
  return (dispatch) => {
    dispatch({type: APPLY_NOW_VACANCY_LOADING});
    try {
      // console.log(applyVacancy);
      database()
        .ref()
        .child(`companies/${applyVacancy.companyID}/candidates`)
        .push(applyVacancy);
      // console.log(id, 'id');
      dispatch({type: APPLY_NOW_VACANCY_SUCCESS, payload: applyVacancy});
    } catch (error) {
      dispatch({type: APPLY_NOW_VACANCY_FAILED, error});
    }
  };
};

export const ApplyVacancyData = (id) => {
  return (dispatch) => {
    dispatch({type: APPLY_VACANCY_DATA_LOADING});
    database()
      .ref()
      .child(`companies/${id}/candidates`)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log('data', data);
        const TemArr = [];
        for (let key in data) {
          TemArr.push({
            vacanyDataId: key,
            vacancyId: data[key].vacancyId,
            companyID: data[key].companyID,
            firstName: data[key].firstName,
            lastName: data[key].lastName,
            gender: data[key].gender,
            age: data[key].age,
            skills: data[key].skills,
            phoneNumber: data[key].phoneNumber,
            email: data[key].email,
            department: data[key].department,
          });
        }
        dispatch({type: APPLY_VACANCY_DATA_SUCCESS, payload: TemArr});
      });
  };
};
