import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Input, Card, Text, Button} from 'react-native-elements';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {LOGIN} from '../../store/actions/authActions';
import {ActivityIndicator} from 'react-native';
import {
  LOGIN_VALIDATION_EMAIL,
  LOGIN_VALIDATION_PASSWORD,
} from '../../store/Types';

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  console.log('SignIn', props);
  let signIn = (data) => {
    const {email, password} = data;
    const {navigation} = props;
    const obj = {
      email,
      password,
    };
    props.signIn(obj, navigation);
    setLoading(true);
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => signIn(values)}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
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
          {errors.email && touched.email && <Text>{props.error}</Text>}
          <Input
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
            errorMessage={props.error}
          />
          {loading ? (
            <ActivityIndicator
              animating={loading}
              size="large"
              color="0000ff"
            />
          ) : (
            <Button onPress={handleSubmit} title="Sign In" />
          )}

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
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (a, b) => dispatch(LOGIN(a, b)),
    LoginVE: () => dispatch({type: LOGIN_VALIDATION_EMAIL}),
    LoginVP: () => dispatch({type: LOGIN_VALIDATION_PASSWORD}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
