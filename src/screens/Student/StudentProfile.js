import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {allDataOfStudents} from '../../store/actions/studentActions';

const StudentProfile = (props) => {
  console.log('student profile', props);
  useEffect(() => {
    props.allDataOfStudents();
  }, []);
  const currentStudent = props.allStudents.find(
    (v) => v.userId === props.user.userID,
  );
  console.log('currentStudent', currentStudent);
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Student's profile</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        First Name {currentStudent?.firstName}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Last Name {currentStudent?.lastName}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Age {currentStudent?.age}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Gender {currentStudent?.gender}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Skills {currentStudent?.skills}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Department {currentStudent?.department}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Email {currentStudent?.email}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Phone Number {currentStudent?.phoneNumber}
      </Text>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {allDataOfStudents})(StudentProfile);
