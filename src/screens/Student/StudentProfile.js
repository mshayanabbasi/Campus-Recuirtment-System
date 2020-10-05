import React from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const StudentProfile = (props) => {
  return (
    <>
      <Card>
        <Card.Title>Student's profile</Card.Title>
        <Card.Divider />
        <Text>First Name Muhammad</Text>
        <Text>Last Name Shayan</Text>
        <Text>Age 28</Text>
        <Text>Gender Male</Text>
        <Text>Qualification Bachelor's</Text>
        <Text>Skills Mobile Application Developer</Text>
        <Text>Department BS</Text>
        <Text>Email mshayanabbai@gmail.com</Text>
        <Text>Contact Number 03331022234</Text>
        <Button title="Edit" />
      </Card>
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
