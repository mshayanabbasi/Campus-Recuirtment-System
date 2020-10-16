import {
  APPLY_NOW_VACANCY_FAILED,
  APPLY_NOW_VACANCY_LOADING,
  APPLY_NOW_VACANCY_SUCCESS,
  APPLY_VACANCY_DATA_LOADING,
  APPLY_VACANCY_DATA_SUCCESS,
  NEW_VACANCIES_FAILED,
  NEW_VACANCIES_LOADING,
  NEW_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_LOADING,
  GET_ALL_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_FAILED,
  APPLY_VACANCY_DATA_FAILED,
} from '../Types';
import database from '@react-native-firebase/database';

export const addNewVacancy = (newVacany) => {
  return (dispatch) => {
    try {
      dispatch({type: NEW_VACANCIES_LOADING});
      database().ref().child('vacancies').push(newVacany);
      dispatch({type: NEW_VACANCIES_SUCCESS, payload: newVacany});
    } catch (error) {
      dispatch({type: NEW_VACANCIES_FAILED});
    }
  };
};

export const allDataOfVacancies = () => {
  return (dispatch) => {
    try {
      dispatch({type: GET_ALL_VACANCIES_LOADING});
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
          dispatch({type: GET_ALL_VACANCIES_SUCCESS, payload: TemArr});
        });
    } catch (error) {
      dispatch({type: GET_ALL_VACANCIES_FAILED});
    }
  };
};

export const ApplyVacancy = (applyVacancy) => {
  return (dispatch) => {
    try {
      dispatch({type: APPLY_NOW_VACANCY_LOADING});
      database()
        .ref()
        .child(`companies/${applyVacancy.id}/candidates`)
        .push(applyVacancy);
      dispatch({type: APPLY_NOW_VACANCY_SUCCESS, payload: applyVacancy});
    } catch (error) {
      dispatch({type: APPLY_NOW_VACANCY_FAILED, error});
    }
  };
};

export const ApplyVacancyData = (id) => {
  return (dispatch) => {
    try {
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
    } catch (error) {
      dispatch({type: APPLY_VACANCY_DATA_FAILED});
    }
  };
};
