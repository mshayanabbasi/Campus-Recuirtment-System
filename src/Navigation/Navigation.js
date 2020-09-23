import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import {connect} from 'react-redux';
import StudentRegistration from '../screens/Student/StudentRegistration';
import Companies from '../screens/Company/Companies';
import {CURRENTUSER} from '../store/actions/authActions';

const AppNavigation = (props) => {
  React.useEffect(() => {
    props.CurrentUser();
  }, []);
  console.log('navigation', props);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen
          name="StudentRegistration"
          component={StudentRegistration}
          options={{title: 'Student Registration'}}
        />

        {props.type === 'company' ? (
          <Stack.Screen name="Company" component={Companies} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.auth.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CurrentUser: () => dispatch(CURRENTUSER()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
