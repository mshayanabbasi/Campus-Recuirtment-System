import React from 'react';
import {Button, View, ScrollView} from 'react-native';
import {Text, Input, Modal, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';

const CompanyRegistration = (props) => {
  console.log('Company Registration', props);
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
  // onAdd = (
  //   firstName,
  //   lastName,
  //   age,
  //   skills,
  //   department,
  //   email,
  //   qualification,
  //   gender,
  // ) => {
  //   // if (state.edit) {
  //   //     props.UpdateRequest({
  //   //         userId:props.currentUser.uid,
  //   //         firstName: firstName,
  //   //         lastName: lastName,
  //   //         age: age,
  //   //         skills: skills,
  //   //         department: department,
  //   //         email: email,
  //   //         qualification: qualification,
  //   //         gender: gender,
  //   //         editID: state.editID,
  //   //         type: props.type,
  //   //         block: state.block,
  //   //     });
  //   // }
  //   // else {
  //   props.newStudent({
  //     userId: props.currentUser.uid,
  //     firstName: firstName,
  //     lastName: lastName,
  //     age: age,
  //     skills: skills,
  //     department: department,
  //     email: email,
  //     qualification: qualification,
  //     gender: gender,
  //     editID: state.editID,
  //     type: props.type,
  //     block: state.block,
  //   });
  //   // }
  // };
  // console.log('form', props.currentUser);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          CompanyName: '',
          Established: '',
          HRName: '',
          ContactNumber: '',
        }}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleSubmit, values}) => (
          <Card>
            <Text h4>Company Registration Form</Text>
            <Input
              value={values.CompanyName}
              placeholder="Company Name"
              onChangeText={handleChange('CompanyName')}
            />
            <Input
              value={values.Established}
              placeholder="Established"
              onChangeText={handleChange('Established')}
            />
            <Input
              value={values.HRName}
              placeholder="HR Name"
              onChangeText={handleChange('HRName')}
            />
            <Input
              value={values.ContactNumber}
              placeholder="Contact Number"
              onChangeText={handleChange('ContactNumber')}
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
    allCompanies: state.student.allCompanies,
    // type: state.auth.type,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     newCompany: (obj) => dispatch(addNew(obj)),
//     // UpdateRequest: (sdata) => dispatch(UpdationRequest(sdata)),
//   };
// };

export default connect(mapStateToProps)(CompanyRegistration);
