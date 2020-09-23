import {NEW_STUDENT, PERVIOUS_DATA_OF_STUDENTS} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

export const addNewStudent = (newStudent) => {
  return (dispatch) => {
    firebase.database().ref().child('students').push(newStudent);
    dispatch({type: NEW_STUDENT, newStudent});
  };
};

export const prevDataOfStudents = () => {
  return (dispatch) => {
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
            address: data[key].address,
            email: data[key].email,
            qualification: data[key].qualification,
            department: data[key].department,
            skills: data[key].skills,
            block: data[key].block,
          });
        }
        dispatch({type: PERVIOUS_DATA_OF_STUDENTS, data: TemArr});
      });
  };
};


