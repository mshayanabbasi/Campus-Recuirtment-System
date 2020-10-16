import React from 'react';
import {Card, Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {CompanyDelete} from '../../../../store/actions/adminActions';

const AdminCompanyDetails = (props) => {
  console.log('Admin Company Details', props);
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
      <Button
        title="Delete"
        onPress={() => {
          props.CompanyDelete(
            currentCompany?.companyID,
            currentCompany?.userId,
          );
          props.navigation.navigate('Students', {screen: 'Companies'});
        }}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
  };
};

export default connect(mapStateToProps, {CompanyDelete})(AdminCompanyDetails);
