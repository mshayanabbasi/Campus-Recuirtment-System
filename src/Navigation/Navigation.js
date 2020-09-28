import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import {connect} from 'react-redux';
import StudentRegistration from '../screens/Student/StudentRegistration';
import Companies from '../screens/Company/Companies';
import {SIGNOUT} from '../store/actions/authActions';
import Students from '../screens/Student/Students';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const AppNavigation = (props) => {
  const [value, setValue] = React.useState('');
  React.useEffect(() => {
    AsyncStorage.getItem('user').then((response) => {
      setValue(JSON.parse(response));
      console.log('response', value);
    });
  }, []);
  console.log('value', value);
  console.log('navigation', props);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        {props.user ? (
          props.user.type && props.user.type === 'company' ? (
            <Stack.Screen
              name="Student"
              component={Students}
              options={{
                headerRight: () => (
                  <Button
                    title="Sign Out"
                    onPress={() => props.signOut(props.navigation)}
                  />
                ),
              }}
            />
          ) : props.user.type && props.user.type === 'student' ? (
            <Stack.Screen
              name="Company"
              component={Companies}
              options={{
                headerRight: () => (
                  <Button
                    title="Sign Out"
                    onPress={() => props.signOut(props.navigation)}
                  />
                ),
              }}
            />
          ) : null
        ) : (
          <>
            <Stack.Screen name="Sign In">
              {(props) => <SignIn {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Sign Up">
              {(props) => <SignUp {...props} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // CurrentUser: () => dispatch(CURRENTUSER()),
    signOut: (a) => dispatch(SIGNOUT(a)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
