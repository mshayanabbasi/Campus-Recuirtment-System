import React, {useEffect} from 'react';
import {Button, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {allDataOfCompanies} from '../../store/actions/companyActions';

const CompanyProfile = (props) => {
  console.log('Company Profile', props);
  useEffect(() => {
    props.allCompanyData();
  }, []);
  const currentCompany = props.allCompanies.find(
    (v) => v.userId === props.user.userID,
  );
  console.log('current Company', currentCompany);
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Company's profile</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Name {currentCompany?.cname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Established {currentCompany?.es}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        HR Name {currentCompany?.hrname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Email {currentCompany?.email}
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

const mapDispatchToProps = (dispatch) => {
  return {
    allCompanyData: () => dispatch(allDataOfCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
