import React from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const StudentProfile = (props) => {
  const currentStudent = props.allStudents.forEach((stu) => {
    return stu.userId === props.currentUser.uid;
  });
  return (
    <>
      {props.currentUser ? (
        <Card>
          <Card.Title>Student's profile</Card.Title>
          <Card.Divider />
          <Text>First Name {currentStudent.firstName}</Text>
          <Text>Last Name {currentStudent.lastName}</Text>
          <Text>Age {currentStudent.age}</Text>
          <Text>Gender {currentStudent.gender}</Text>
          <Text>Qualification {currentStudent.qualification}</Text>
          <Text>Skills {currentStudent.skills}</Text>
          <Text>Department {currentStudent.department}</Text>
          <Text>Email {currentStudent.email}</Text>
          <Text>Contact Number {currentStudent.phoneNumber}</Text>
          <Button title="Edit" />
        </Card>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const userId = state.auth.currentUser ? state.auth.currentUser.uid : null;
  const checkS = state.auth.currentUser
    ? state.admin.Srequests.forEach((v) => v.userId === userId)
    : null;
  return {
    currentUser: state.auth.currentUser,
    allStudents: state.student.allStudents,
    isDisabled: checkS,
  };
};

export default connect(mapStateToProps)(StudentProfile);
