import React from 'react';
import {Button, View, ScrollView, Modal} from 'react-native';
import {Text, Input, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';

const StudentRegistration = (props) => {
  onAdd = (
    firstName,
    lastName,
    age,
    skills,
    department,
    email,
    qualification,
    gender,
  ) => {
    // const { userId, firstName,  }
    props.newStudent({
      // userId: ,
      firstName,
      lastName,
      age,
      skills,
      department,
      email,
      qualification,
      gender,
      type: props.user.type,
    });
    console.log('Successfully add');
  };
  // console.log('form', props.currentUser);
  return (
    <Modal visible={}>
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
          onSubmit={(values) => onAdd(values)}>
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
    </Modal>
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
