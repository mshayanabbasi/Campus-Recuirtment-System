import React from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';

const CompanyDetails = (props) => {
  console.log('Company Details', props);
  const currentCompany = props.allCompanies.find(
    (v) => v.companyID === props.route.params.id,
  );
  console.log('current Company Details', currentCompany);
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Company Information</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Name {currentCompany?.cname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Email {currentCompany?.email}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        HR Name {currentCompany?.hrname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Contact Number {currentCompany?.cnum}
      </Text>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
  };
};

export default connect(mapStateToProps)(CompanyDetails);
