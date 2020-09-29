import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Input, Button, Card} from 'react-native-elements';
import {Formik} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import '../../config/firebaseConfig';
import {SIGNUP} from '../../store/actions/authActions';

const SignUp = (props) => {
  console.log('SignUp', props);
  signUp = (data) => {
    const {name, email, password, selectedValue} = data;
    // console.log(data);
    const obj = {
      name,
      email,
      password,
      type: selectedValue,
    };
    // const navi = props.navigation;
    props.signUp(obj);
  };
  console.log(props.user);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        selectedValue: '',
      }}
      onSubmit={(values) => signUp(values)}>
      {({handleChange, handleSubmit, values, setFieldValue}) => (
        <Card>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            Campus Recuritment System
          </Text>
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
          <DropDownPicker
            items={[
              {label: 'Admin', value: 'admin'},
              {label: 'Student', value: 'student'},
              {
                label: 'Company',
                value: 'company',
              },
            ]}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            defaultValue={values.selectedValue}
            containerStyle={{height: 40, marginBottom: 25}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            onChangeItem={(item) => {
              setFieldValue('selectedValue', item.value);
              handleChange('selectedValue');
            }}
          />
          {/* <Picker
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
          </Picker> */}
          <Button onPress={handleSubmit} title="Sign Up" />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>
              Already have an Account?
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Sign  In')}>
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
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (a, b) => dispatch(SIGNUP(a, b)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
