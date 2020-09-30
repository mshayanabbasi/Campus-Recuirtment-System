import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../screens/SignIn/index.';
import SignUp from '../screens/SignUp';
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

  AsyncStorage.getItem('user').then((response) => {
    setValue(JSON.parse(response));
    console.log('response', value);
  });
  console.log('value', value);
  console.log('navigation', props);
  // const AuthStack = createStackNavigator();
  // const AuthStackScreen = () => {
  //   return (
  //     <AuthStack.Navigator initialRouteName="SignIn">
  //       <AuthStack.Screen name="SignIn" component={SignIn} />
  //       <AuthStack.Screen name="SignUp" component={SignUp} />
  //     </AuthStack.Navigator>
  //   );
  // };

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
  function Root() {
    return (
      <Stack.Navigator>
        {value.type && value.type === 'company' ? (
          <Stack.Screen
            name="Student"
            component={Students}
            options={{
              headerRight: () => {
                return (
                  <Button title="Sign Out" onPress={() => props.signOut()} />
                );
              },
            }}
          />
        ) : (
          <Stack.Screen
            name="Company"
            component={Companies}
            options={{
              headerRight: () => {
                return (
                  <Button title="Sign out" onPress={() => props.signOut()} />
                );
              },
            }}
          />
        )}
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {value ? (
          <Stack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />
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
    signOut: () => dispatch(SIGNOUT()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);

// const Tab = createBottomTabNavigator();

// const HomeTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// const Drawer = createDrawerNavigator();

// const HomeDrawer = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={HomeTabs} />
//       <Drawer.Screen name="Account" component={AccountScreen} />
//       <Drawer.Screen name="Password Forget" component={PasswordForgetScreen} />
//       <Drawer.Screen name="Password Change" component={PasswordChangeScreen} />
//       <Drawer.Screen name="Admin" component={AdminScreen} />
//     </Drawer.Navigator>
//   );
// };

// const RootStack = createStackNavigator();

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const handleSignIn = () => {
//     setIsAuthenticated(true);
//   };
//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//   };
//   const handleSignUp = () => {
//     setIsAuthenticated(true);
//   };
//   return (
//     <NavigationContainer>
//       <RootStack.Navigator>
//         {isAuthenticated ? (
//           <RootStack.Screen
//             name="Home"
//             component={HomeDrawer}
//             options={({route, navigation}) => ({
//               headerTitle: getFocusedRouteNameFromRoute(route),
//               headerLeft: () => (
//                 <Button
//                   onPress={() =>
//                     navigation.dispatch(DrawerActions.toggleDrawer())
//                   }
//                   title="Menu"
//                 />
//               ),
//               headerRight: () => {
//                 return <Button title="Sign Out" onPress={handleSignOut} />;
//               },
//             })}
//           />
//         ) : (
//           <>
//             <RootStack.Screen
//               name="Landing"
//               component={LandingScreen}
//               options={{
//                 animationTypeForReplace: 'pop',
//               }}
//             />

//             <RootStack.Screen name="Sign In">
//               {(props) => <SignInScreen {...props} onSignIn={handleSignIn} />}
//             </RootStack.Screen>
//             <RootStack.Screen name="Sign Up">
//               {(props) => <SignUpScreen {...props} onSignUp={handleSignUp} />}
//             </RootStack.Screen>
//             <RootStack.Screen
//               name="Password Forget"
//               component={PasswordForgetScreen}
//             />
//           </>
//         )}
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// };
