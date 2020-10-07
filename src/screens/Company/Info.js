import React from 'react';
import {Button, View, ScrollView} from 'react-native';
import {Text, Input, Modal, Card} from 'react-native-elements';
import {connect} from 'react-redux';
// import { UpdationRequest } from '../../store/actions/adminActions';
import {addNewStudent} from '../../store/actions/studentActions';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import {addNewCompany} from '../../store/actions/companyActions';

const CompanyRegistration = (props) => {
  console.log('Company Registration', props);
  console.log('userId', props.user.userID);
  const onAdd = ({cname, es, hrname, cnum}) => {
    props.newCompany({
      userId: props.user.userID,
      cname,
      es,
      hrname,
      cnum,
      email: props.user.email,
      type: props.user.type,
    });
    props.navigation.navigate('Students', {screen: 'Student'});
  };
  // console.log('form', props.currentUser);
  return (
    <ScrollView>
      <Formik
        initialValues={{
          cname: '',
          es: '',
          hrname: '',
          cnum: '',
        }}
        onSubmit={(values) => onAdd(values)}>
        {({handleChange, handleSubmit, values}) => (
          <Card>
            <Text h4>Company Registration Form</Text>
            <Input
              value={values.cname}
              placeholder="Company Name"
              onChangeText={handleChange('cname')}
            />
            <Input
              value={values.es}
              placeholder="Established"
              keyboardType="numeric"
              onChangeText={handleChange('es')}
            />
            <Input
              value={values.hrname}
              placeholder="HR Name"
              onChangeText={handleChange('hrname')}
            />
            <Input
              value={values.cnum}
              placeholder="Contact Number"
              keyboardType="numeric"
              onChangeText={handleChange('cnum')}
            />

            <Button title="Register" onPress={handleSubmit} />
          </Card>
        )}
      </Formik>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.student.allCompanies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newCompany: (obj) => dispatch(addNewCompany(obj)),
    // UpdateRequest: (sdata) => dispatch(UpdationRequest(sdata)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyRegistration);
