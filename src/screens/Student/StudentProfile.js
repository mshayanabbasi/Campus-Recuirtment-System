import React from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const StudentProfile = (props) => {
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Student's profile</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        First Name Muhammad
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Last Name Shayan
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Age 28
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Gender Male
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Qualification Bachelor's
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Skills Mobile Application Developer
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Department BS
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Email mshayanabbai@gmail.com
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Contact Number 03331022234
      </Text>
      <Button title="Edit" />
    </Card>
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
