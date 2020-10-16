import React from 'react';
import {Card, Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {StudentDelete} from '../../../../store/actions/adminActions';

const AdminStudentDetails = (props) => {
  console.log('Student Details', props);
  const currentStudent = props.allStudents.find(
    (v) => v.id === props.route.params.id,
  );
  console.log('Current Student', currentStudent);

  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Student's Detail</Card.Title>
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
      <Button
        title="Delete"
        onPress={() => {
          props.StudentDelete(currentStudent?.id, currentStudent?.userId);
          props.navigation.navigate('Students', {screen: 'Students'});
        }}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {StudentDelete})(AdminStudentDetails);
