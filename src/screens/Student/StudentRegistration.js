import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {Text, Input, Modal, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';

const StudentRegistration = (props) => {
  console.log('Navigate', props);
  const [state, setState] = useState({
    Name: '',
    LName: '',
    Age: '',
    Gender: '',
    Phone: '',
    Email: '',
    Qualification: '',
    Skills: '',
    Department: '',
    edit: false,
    editID: '',
    block: false,
  });
  //didmount
  useEffect(() => {
    // console.log(props.currentUser.email);
    setState({...state, email: props.currentUser.email});
    if (props.currentUser) {
      const userID = props.currentUser.uid;
      console.log(userID);
      if (props.allStudents) {
        props.allStudents.forEach((stu) => {
          if (stu.userId === userID) {
            setState({
              ...state,
              Name: stu.firstName,
              LName: stu.lastName,
              Age: stu.age,
              Gender: stu.gender,
              Phone: stu.phoneNumber,
              Email: stu.email,
              Skills: stu.skills,
              Department: stu.department,
              Qualification: stu.qualification,
              edit: true,
              editID: stu.id,
              block: stu.block,
            });
          }
        });
      }
    }
  }, []);
  // willrecieveprops
  useEffect(() => {
    console.log(props.currentUser);
    if (props.currentUser) {
      const userID = props.currentUser.uid;
      console.log(userID);
      if (props.allStudents) {
        props.allStudents.forEach((stu) => {
          if (stu.userId === userID) {
            setState({
              ...state,
              Name: stu.firstName,
              LName: stu.lastName,
              Age: stu.age,
              Gender: stu.gender,
              Phone: stu.phoneNumber,
              Email: stu.email,
              Skills: stu.skills,
              Department: stu.department,
              Qualification: stu.qualification,
              edit: true,
              editID: stu.id,
              block: stu.block,
            });
          }
        });
      }
    }
  }, [props.currentUser, props.allStudents]);
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
    <>
      {props.currentUser ? (
        <>
          {state.edit ? null : <Text>Campus Recuirtment System</Text>}
          <Formik
            initialValues={{
              name: state.Name,
              lname: state.LName,
              age: state.Age,
              skills: state.Skills,
              department: state.Department,
              phone: state.Phone,
              gender: state.Gender,
            }}
            onSubmit={(values) => console.log(values)}>
            {({handleChange, handleSubmit, values}) => {
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
                {state.edit ? null : (
                  <Input
                    value={values.department}
                    placeholder="Department"
                    onChangeText={handleChange('department')}
                  />
                )}
                {state.edit ? null : (
                  <Input
                    value={values.gender}
                    placeholder="Gender"
                    onChangeText={handleChange('gender')}
                  />
                )}
                {state.edit ? (
                  <Button title="Update Request" />
                ) : (
                  <Button title="Register" onPress={handleSubmit} />
                )}
              </Card>;
            }}
          </Formik>
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    allStudents: state.student.allStudents,
    type: state.auth.type,
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
