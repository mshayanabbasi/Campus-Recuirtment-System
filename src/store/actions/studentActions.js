import {NEW_STUDENT, PERVIOUS_DATA_OF_STUDENTS} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

export const addNewStudent = (newStudent) => {
  return (dispatch) => {
    firebase.database().ref().child('students').push(newStudent);
    console.log(newStudent);
    dispatch({type: NEW_STUDENT, payload: newStudent});
  };
};

export const prevDataOfStudents = () => {
  return (dispatch) => {
    try {
      firebase
        .database()
        .ref()
        .child('students')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          console.log(data);
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
          dispatch({type: PERVIOUS_DATA_OF_STUDENTS, payload: TemArr});
        });
    } catch (error) {
      console.log(error);
    }
  };
};
