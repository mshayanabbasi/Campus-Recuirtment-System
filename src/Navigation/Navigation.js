import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../screens/SignIn/SignIn';
import SignUp from '../screens/SignUp/SignUp';
import {connect} from 'react-redux';
import StudentRegistration from '../screens/Student/StudentRegistration';
import Companies from '../screens/Company/Companies';
import {SIGNOUT} from '../store/actions/authActions';
import Students from '../screens/Student/Students';
import {Button} from 'react-native-elements';
import {navigationRef} from '../RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import CompanyDrawerContent from './CompanyDrawerContent';
import PostVacancy from '../screens/Company/PostVacancy';
import StudentProfile from '../screens/Student/StudentProfile';

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
  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => {
    return (
      <AuthStack.Navigator initialRouteName="SignIn">
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
      </AuthStack.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();
  const CompanyDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CompanyDrawerContent {...props} />}>
        <Drawer.Screen name="Student" component={Students} />
        <Drawer.Screen name="PostVacancy" component={PostVacancy} />
        <Drawer.Screen name="Student Profile" component={StudentProfile} />
      </Drawer.Navigator>
    );
  };
  // const StudentDrawer = () => {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen />
  //       <Drawer.Screen />
  //       <Drawer.Screen />
  //     </Drawer.Navigator>
  //   )
  // }
  const Stack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      {props.user ? (props.user.type && props.user.type === 'company' ? <Stack.Screen name="Home Screen" component={CompanyDrawer} /> : (props.user.type === 'student' ? )) : <AuthStackScreen />}
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
    signOut: () => dispatch(SIGNOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
