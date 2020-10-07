import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {prevDataOfStudents} from '../../store/actions/studentActions';

const StudentProfile = (props) => {
  useEffect(() => {
    props.allStudentData();
  }, []);
  const currentStudent = props.allStudents.find((v) => {
    return v.userId === props.user.userID;
  });
  console.log(currentStudent);
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Student's profile</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        First Name {currentStudent.firstName}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Last Name {currentStudent.lastName}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Age {currentStudent.age}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Gender {currentStudent.gender}
      </Text>
      <Card.Divider />
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Skills {currentStudent.skills}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Department {currentStudent.department}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Email {currentStudent.email}
      </Text>
      <Card.Divider />
      <Button title="Edit" />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allStudents: state.student.allStudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allStudentData: () => dispatch(prevDataOfStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
