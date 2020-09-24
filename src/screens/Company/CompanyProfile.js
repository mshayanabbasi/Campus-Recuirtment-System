import React from 'react';
import {Button, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const CompanyProfile = (props) => {
  const currentCompany = props.allCompanies.forEach((stu) => {
    return stu.userId === props.currentUser.uid;
  });
  return (
    <>
      {props.currentUser ? (
        <Card>
          <Card.Title>Company's profile</Card.Title>
          <Card.Divider />
          <Text>Company Name {currentCompany.cname}</Text>
          <Text>Established {currentCompany.es}</Text>
          <Text>HR Name {currentCompany.hrname}</Text>
          <Text>Email {currentCompany.email}</Text>
          <Text>Contact Number {currentCompany.cnum}</Text>
          <Button title="Edit" />
        </Card>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const userId = state.auth.currentUser ? state.auth.currentUser.uid : null;
  const checkC = state.auth.currentUser
    ? state.admin.Crequests.forEach((v) => v.userId === userId)
    : null;
  return {
    currentUser: state.auth.currentUser,
    allCompanies: state.student.allCompanies,
    isDisabled: checkC,
  };
};

export default connect(mapStateToProps)(CompanyProfile);
