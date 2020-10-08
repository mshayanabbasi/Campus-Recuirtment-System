// const [state, setState] = useState({
//   Name: '',
//   LName: '',
//   Age: '',
//   Gender: '',
//   Phone: '',
//   Email: '',
//   Qualification: '',
//   Skills: '',
//   Department: '',
//   edit: false,
//   editID: '',
//   block: false,
// });
//didmount
// useEffect(() => {
//   AsyncStorage.getItem('user').then(
//     (response) => console.log('response', response),
//     // setState({
//     //   ...state,
//     //   Email: JSON.parse(response),
//     // }),
//     // console.log('email', state.Email),
//   );
// console.log(state.Email.email);
// setState({...state, email: props.currentUser.email});
// if (props.currentUser) {
//   const userID = props.users.uid;
//   console.log(userID);
//   if (props.allStudents) {
//     props.allStudents.forEach((stu) => {
//       if (stu.userId === userID) {
//         setState({
//           ...state,
//           Name: stu.firstName,
//           LName: stu.lastName,
//           Age: stu.age,
//           Gender: stu.gender,
//           Phone: stu.phoneNumber,
//           Email: stu.email,
//           Skills: stu.skills,
//           Department: stu.department,
//           Qualification: stu.qualification,
//           edit: true,
//           editID: stu.id,
//           block: stu.block,
//         });
//       }
//     });
//   }
// }
// }, []);
// willrecieveprops
// useEffect(() => {
//   console.log(props.currentUser);
//   if (props.currentUser) {
//     const userID = props.currentUser.uid;
//     console.log(userID);
//     if (props.allStudents) {
//       props.allStudents.forEach((stu) => {
//         if (stu.userId === userID) {
//           setState({
//             ...state,
//             Name: stu.firstName,
//             LName: stu.lastName,
//             Age: stu.age,
//             Gender: stu.gender,
//             Phone: stu.phoneNumber,
//             Email: stu.email,
//             Skills: stu.skills,
//             Department: stu.department,
//             Qualification: stu.qualification,
//             edit: true,
//             editID: stu.id,
//             block: stu.block,
//           });
//         }
//       });
//     }
//   }
// }, [props.currentUser, props.allStudents]);

import React, {useState} from 'react';
import {Button, View, ScrollView, Modal, ActivityIndicator} from 'react-native';
import {Text, Input, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';

const StudentRegistration = (props) => {
  console.log('Student Registration', props);
  // console.log('userId', props.currentUser.uid);
  const onAdd = ({
    firstName,
    lastName,
    age,
    skills,
    department,
    gender,
    phoneNumber,
  }) => {
    props.newStudent({
      userId: props.user.userID,
      firstName,
      lastName,
      age,
      skills,
      department,
      email: props.user.email,
      gender,
      type: props.user.type,
      phoneNumber,
    });
    props.navigation.navigate('Companies', {screen: 'Company'});
  };
  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          age: '',
          skills: '',
          department: '',
          phoneNumber: '',
          gender: '',
        }}
        onSubmit={(values) => onAdd(values)}>
        {({handleChange, handleSubmit, values}) => (
          <Card>
            <Text h4>Student Registration Form</Text>
            <Input
              value={values.firstName}
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
            />
            <Input
              value={values.lastName}
              placeholder="Last Name"
              onChangeText={handleChange('lastName')}
            />
            <Input
              value={values.age}
              placeholder="Age"
              keyboardType="numeric"
              onChangeText={handleChange('age')}
            />
            <Input
              value={values.skills}
              placeholder="Skills"
              onChangeText={handleChange('skills')}
            />
            <Input
              value={values.phoneNumber}
              placeholder="Phone Number"
              keyboardType="numeric"
              onChangeText={handleChange('phoneNumber')}
            />
            <Input
              value={values.department}
              placeholder="Department"
              onChangeText={handleChange('department')}
            />
            <Input
              value={values.gender}
              placeholder="Gender"
              onChangeText={handleChange('gender')}
            />
            <Button onPress={handleSubmit} title="Register" />
          </Card>
        )}
      </Formik>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allStudents: state.student.allStudents,
    // type: state.auth.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newStudent: (obj) => dispatch(addNewStudent(obj)),
    // UpdateRequest: (sdata) => dispatch(UpdationRequest(sdata)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentRegistration);
