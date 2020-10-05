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
      <Card.Title style={{fontSize: 20}}>Company's profile</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Name In App
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Established 2015
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        HR Name Hammad
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Email company@gmail.com
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Contact Number 03331022234
      </Text>
      <Card.Divider />
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
