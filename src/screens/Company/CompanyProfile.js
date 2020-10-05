import React from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const CompanyProfile = (props) => {
  // const currentCompany = props.allCompanies.forEach((stu) => {
  //   return stu.userId === props.currentUser.uid;
  // });
  return (
    
        <Card>
          <Card.Title>Company's profile</Card.Title>
          <Card.Divider />
          <Text>Company Name In App</Text>
          <Text>Established 2015</Text>
          <Text>HR Name Hammad</Text>
          <Text>Email company@gmail.com</Text>
          <Text>Contact Number 03331022234</Text>
          <Button title="Edit" />
        </Card>
  );
};

const mapStateToProps = (state) => {
  // const userId = state.auth.currentUser ? state.auth.currentUser.uid : null;
  return {
    currentUser: state.auth.currentUser,
    allCompanies: state.student.allCompanies,
    // isDisabled: checkC,
  };
};

export default connect(mapStateToProps)(CompanyProfile);
