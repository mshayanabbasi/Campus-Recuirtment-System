import {
  DELETE_COMPANY_FAILED,
  DELETE_COMPANY_LOADING,
  DELETE_COMPANY_SUCCESS,
  DELETE_STUDENT_LOADING,
  DELETE_STUDENT_SUCCESS,
} from '../Types';
import database from '@react-native-firebase/database';

export const CompanyDelete = (companyID, userID) => {
  return (dispatch) => {
    try {
      dispatch({type: DELETE_COMPANY_LOADING});
      database()
        .ref()
        .child('companies/' + companyID)
        .remove()
        .then(() => console.log('Successfully Delete'));
      database()
        .ref()
        .child('user/' + userID)
        .remove()
        .then(() => console.log('Successfully Delete'));
      dispatch({type: DELETE_COMPANY_SUCCESS});
    } catch (error) {
      dispatch({type: DELETE_COMPANY_FAILED});
    }
  };
};

export const StudentDelete = (id, userID) => {
  return (dispatch) => {
    try {
      dispatch({type: DELETE_STUDENT_LOADING});
      database()
        .ref()
        .child('students/' + id)
        .remove()
        .then(() => console.log('Successfully Delete'));
      database()
        .ref()
        .child('user/' + userID)
        .remove()
        .then(() => console.log('Successfully Delete'));
      dispatch({type: DELETE_STUDENT_SUCCESS});
    } catch (error) {
      dispatch({type: DELETE_STUDENT_LOADING});
    }
  };
};
