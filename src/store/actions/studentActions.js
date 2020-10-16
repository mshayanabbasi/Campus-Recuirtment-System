import {
  GET_ALL_STUDENTS_FAILED,
  GET_ALL_STUDENTS_LOADING,
  GET_ALL_STUDENTS_SUCCESS,
  NEW_STUDENT_FAILED,
  NEW_STUDENT_LOADING,
  NEW_STUDENT_SUCCESS,
} from '../Types';
import database from '@react-native-firebase/database';

export const addNewStudent = (newStudent) => {
  return (dispatch) => {
    try {
      dispatch({type: NEW_STUDENT_LOADING});
      database().ref().child('students').push(newStudent);
      dispatch({type: NEW_STUDENT_SUCCESS, payload: newStudent});
    } catch (error) {
      dispatch({type: NEW_STUDENT_FAILED});
    }
  };
};

export const allDataOfStudents = () => {
  return (dispatch) => {
    try {
      dispatch({type: GET_ALL_STUDENTS_LOADING});
      database()
        .ref()
        .child('students')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          console.log('data', data);
          const TemArr = [];
          for (let key in data) {
            TemArr.push({
              id: key,
              userId: data[key].userId,
              firstName: data[key].firstName,
              lastName: data[key].lastName,
              age: data[key].age,
              phoneNumber: data[key].phoneNumber,
              gender: data[key].gender,
              email: data[key].email,
              department: data[key].department,
              skills: data[key].skills,
            });
          }
          dispatch({type: GET_ALL_STUDENTS_SUCCESS, payload: TemArr});
        });
    } catch (error) {
      dispatch({type: GET_ALL_STUDENTS_FAILED});
    }
  };
};
