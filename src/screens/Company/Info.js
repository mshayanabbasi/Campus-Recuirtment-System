import React, {useState} from 'react';
import {Button, ScrollView} from 'react-native';
import {Text, Input, Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {addNewCompany} from '../../store/actions/companyActions';

const CompanyRegistration = (props) => {
  console.log('Company Registration', props);
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
            <Button onPress={handleSubmit} title="Register" />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyRegistration);
