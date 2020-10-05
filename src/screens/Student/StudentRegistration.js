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

import React from 'react';
import {Button, View, ScrollView, Modal} from 'react-native';
import {Text, Input, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';

const StudentRegistration = (props) => {
  console.log('Student Registration', props);
  // const onAdd = (
  //   firstName,
  //   lastName,
  //   age,
  //   skills,
  //   department,
  //   email,
  //   qualification,
  //   gender,
  // ) => {
  //   // const { userId, firstName,  }
  //   props.newStudent({
  //     // userId: ,
  //     firstName,
  //     lastName,
  //     age,
  //     skills,
  //     department,
  //     email,
  //     qualification,
  //     gender,
  //     type: props.user.type,
  //   });
  //   console.log('Successfully add');
  // };
  // console.log('form', props.currentUser);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          name: '',
          lname: '',
          age: '',
          skills: '',
          department: '',
          phone: '',
          gender: '',
        }}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleSubmit, values}) => (
          <Card>
            <Text h4>Student Registration Form</Text>
            <Input
              value={values.name}
              placeholder="First Name"
              onChangeText={handleChange('name')}
            />
            <Input
              value={values.lname}
              placeholder="Last Name"
              onChangeText={handleChange('lname')}
            />
            <Input
              value={values.age}
              placeholder="Age"
              onChangeText={handleChange('age')}
            />
            <Input
              value={values.skills}
              placeholder="Skills"
              onChangeText={handleChange('skills')}
            />
            <Input
              value={values.phone}
              placeholder="Phone Number"
              onChangeText={handleChange('phone')}
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

            <Button title="Register" onPress={handleSubmit} />
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
