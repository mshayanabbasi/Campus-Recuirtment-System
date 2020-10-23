import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, ActivityIndicator, Alert} from 'react-native';
import {Text, Input, Button, Card} from 'react-native-elements';
import {Formik} from 'formik';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';
import {SIGNUP} from '../../store/actions/authActions';
import * as Yup from 'yup';

const SignUp = (props) => {
  console.log('SignUp', props);
  const [loading, setLoading] = useState(false);

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'To Short')
      .max(20, 'To Long')
      .required('This field is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
    selectedValue: Yup.string().required('This field is required'),
  });

  let signUp = (data) => {
    const {name, email, password, selectedValue} = data;
    const {navigation} = props;
    const obj = {
      name,
      email,
      password,
      type: selectedValue,
    };
    props.signUp(obj, navigation);
    setLoading(true);
    Alert.alert('Successfully SignUp');
  };

  console.log('user', props.user);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        selectedValue: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        signUp(values);
      }}>
      {({
        handleChange,
        handleSubmit,
        values,
        setFieldValue,
        handleBlur,
        errors,
        touched,
      }) => (
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
          {errors.name && touched.name ? (
            <Text style={{color: 'red', paddingBottom: 5}}>{errors.name}</Text>
          ) : null}
          <Input
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            value={values.email}
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <Text style={{color: 'red', paddingBottom: 5}}>{errors.email}</Text>
          ) : null}
          <Input
            onChangeText={handleChange('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          {errors.password && touched.password ? (
            <Text style={{color: 'red', paddingBottom: 5}}>
              {errors.password}
            </Text>
          ) : null}
          <DropDownPicker
            items={[
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
          {errors.selectedValue && touched.selectedValue ? (
            <Text style={{color: 'red', paddingBottom: 5}}>
              {errors.selectedValue}
            </Text>
          ) : null}
          {loading ? (
            <ActivityIndicator
              animating={loading}
              size="large"
              color="0000ff"
            />
          ) : (
            <Button onPress={handleSubmit} title="Sign Up" />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontSize: 18}}>Already have an Account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Sign In')}>
              <Text style={{paddingLeft: 5, fontSize: 18}}>Sign In</Text>
            </TouchableOpacity>
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
