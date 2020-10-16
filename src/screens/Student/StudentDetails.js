import React, {useEffect} from 'react';
import {Card, Text} from 'react-native-elements';
import {connect} from 'react-redux';
const StudentDetails = (props) => {
  console.log('Student Details', props);
  const currentStudent = props.candidates.find(
    (v) => v.vacanyDataId === props.route.params.id,
  );
  console.log('Current Student', currentStudent);
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Student's Detail</Card.Title>
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
    candidates: state.vacancy.candidates,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(StudentDetails);
