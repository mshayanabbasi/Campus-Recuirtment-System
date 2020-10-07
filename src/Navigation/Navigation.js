import * as React from 'react';
import {
  NavigationContainer,
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../screens/SignIn/index.';
import SignUp from '../screens/SignUp';
import {connect} from 'react-redux';
import StudentRegistration from '../screens/Student/StudentRegistration';
import Companies from '../screens/Company/Companies';
import {currentUser, SIGNOUT, UpdateUser} from '../store/actions/authActions';
import Students from '../screens/Student/Students';
import {Button} from 'react-native-elements';
import {navigationRef} from '../RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import CompanyDrawerContent from './CompanyDrawerContent';
import PostVacancy from '../screens/Company/PostVacancy';
import StudentProfile from '../screens/Student/StudentProfile';
import CompanyRegistration from '../screens/Company/Info';
import Loading from '../screens/Loading';
import CompanyProfile from '../screens/Company/CompanyProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StudentDrawerContent from './StudentDrawerContent';
import PostedVacancy from '../screens/Company/PostedVacancy';

const AppNavigation = (props) => {
  React.useEffect(() => {
    props.currentUser();
  }, []);

  const Drawer = createDrawerNavigator();
  const CompanyDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CompanyDrawerContent {...props} />}>
        <Drawer.Screen name="Student" component={Students} />
        <Drawer.Screen name="PostVacancy" component={PostVacancy} />
        <Drawer.Screen name="Company Profile" component={CompanyProfile} />
      </Drawer.Navigator>
    );
  };
  const StudentDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <StudentDrawerContent {...props} />}>
        <Drawer.Screen name="Company" component={Companies} />
        <Drawer.Screen name="Posted Vacancies" component={PostedVacancy} />
        <Drawer.Screen name="Student Profile" component={StudentProfile} />
      </Drawer.Navigator>
    );
  };

  const Stack = createStackNavigator();
  function Auth() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign In">
          {(props) => <SignIn {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Sign Up">
          {(props) => <SignUp {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
  function Company() {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Company"
          component={StudentDrawer}
          options={({route, navigation}) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerLeft: () => {
              return (
                <Ionicons
                  name="menu"
                  size={30}
                  style={{padding: 5}}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              );
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Company Registration"
          component={CompanyRegistration}
          options={({navigation}) => ({
            headerLeft: null,
          })}
        />
      </Stack.Navigator>
    );
  }
  function Student() {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Student"
          component={CompanyDrawer}
          options={({navigation, route}) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerLeft: () => {
              return (
                <Ionicons
                  name="menu"
                  size={30}
                  style={{padding: 5}}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                />
              );
            },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="Student Registration"
          component={StudentRegistration}
          options={({navigation}) => ({
            headerLeft: null,
          })}
        />
      </Stack.Navigator>
    );
  }
  function Root() {
    return (
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Companies"
          component={Company}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Students"
          component={Student}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
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
    currentUser: () => dispatch(currentUser()),
    updateUser: (d) => dispatch(UpdateUser(d)),
    signOut: (a) => dispatch(SIGNOUT(a)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
