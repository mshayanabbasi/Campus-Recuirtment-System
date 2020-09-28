import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Input, Card, Text, Button} from 'react-native-elements';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {LOGIN} from '../../store/actions/authActions';

const SignIn = (props) => {
  console.log('SignIn', props);
  signIn = (data) => {
    const {email, password} = data;
    console.log(data);
    const obj = {
      email,
      password,
    };
    const navi = props.navigation.navigate;
    props.signIn(obj,navi);
    // if (props.user.type === 'student') {
    //   props.navigation.navigate('Company');
    // } else if (props.user.type === 'company') {
    //   props.navigation.navigate('Student');
    // }
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => signIn(values)}>
      {({handleChange, handleSubmit, values}) => (
        <Card>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            Campus Recuritment System
          </Text>
          <Text
            h4
            style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
            Sign In
          </Text>
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
          <Button onPress={handleSubmit} title="Sign In" />
          <Text>
            Do You Have an Account?
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Sign Up')}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </Text>
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
    signIn: (a, b) => dispatch(LOGIN(a, b)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
