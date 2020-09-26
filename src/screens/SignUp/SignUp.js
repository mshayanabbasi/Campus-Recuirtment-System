import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Input, Button, Card} from 'react-native-elements';
import {Formik} from 'formik';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import '../../config/firebaseConfig';
import {SIGNUP} from '../../store/actions/authActions';

const SignUp = (props) => {
  console.log('SignUp', props);
  signUp = (name, email, password, type) => {
    props.signUp(name, email, password, type);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        selectedValue: props.type,
      }}
      onSubmit={(values) =>
        signUp(values.name, values.email, values.password, values.selectedValue)
      }>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
        <Card>
          <Text h4>Campus Recuritment System</Text>
          <Text
            h4
            style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
            Sign Up
          </Text>
          <Input
            onChangeText={handleChange('name')}
            value={values.name}
            placeholder="Name"
          />
          <Input
            onChangeText={handleChange('email')}
            value={values.email}
            placeholder="Email"
          />
          <Input
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          <Picker
            mode="dialog"
            enabled 
            selectedValue={values.selectedValue}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) => {
              setFieldValue('selectedValue', itemValue);
              handleChange('selectedValue');
            }}>
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Company" value="company" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
          <Button onPress={handleSubmit} title="Sign Up" />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              Already have an Account?
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Sign In')}>
                <Text style={{fontSize: 18}}>Sign In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </Card>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    signUpUser: state.auth.signUpUser,
    type: state.auth.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (name, email, password, type) =>
      dispatch(SIGNUP(name, email, password, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
