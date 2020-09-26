import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import {connect} from 'react-redux';
import StudentRegistration from '../screens/Student/StudentRegistration';
import Companies from '../screens/Company/Companies';
import {CURRENTUSER, SIGNOUT} from '../store/actions/authActions';
import Students from '../screens/Student/Students';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const AppNavigation = (props) => {
  React.useEffect(() => {
    let asyncs = AsyncStorage.getItem('user');
    let data = JSON.parse(asyncs);
    console.log(data);
  }, []);
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  console.log('navigation', props);
  // const handleSignIn = () => {
  //   setIsAuthenticated(true);
  // };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        {
          props.isAuthenticated && props.isAuthenticated ? (
            props.user.type && props.user.type === 'company' ? (
              <Stack.Screen
                name="Student"
                component={Students}
                options={{
                  headerRight: () => (
                    <Button title="Sign Out" onPress={props.signOut} />
                  ),
                }}
              />
            ) : props.type === 'student' ? (
              <Stack.Screen
                name="Company"
                component={Companies}
                options={{
                  headerRight: () => (
                    <Button title="Sign Out" onPress={props.signOut} />
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
          ) // (props.type === 'Admin' ? <Stack.Screen />)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CurrentUser: () => dispatch(CURRENTUSER()),
    signOut: () => dispatch(SIGNOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
