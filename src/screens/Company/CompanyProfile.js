import React, {useEffect} from 'react';
import {Button, Text} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {PrevDataOfCompanies} from '../../store/actions/companyActions';

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
      <Card.Divider />
      <Button title="Edit" />
    </Card>
  );
};

const mapStateToProps = (state) => {
  // const userId = state.auth.currentUser ? state.auth.currentUser.uid : null;
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
    // isDisabled: checkC,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allCompanyData: () => dispatch(PrevDataOfCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
