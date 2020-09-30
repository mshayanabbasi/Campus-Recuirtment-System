import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import AppNavigation from './Navigation/Navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {UpdateUser} from './store/actions/authActions';

const App = () => {
  const user = store.getState().auth.user;
  console.log(user);
  useEffect(() => {
    if (!user) {
      AsyncStorage.getItem('user').then((response) => {
        store.dispatch(UpdateUser(response));
      });
    }
  }, [user]);
  console.log('store', store);
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

// import React, {useState} from 'react';
// import {
//   NavigationContainer,
//   getFocusedRouteNameFromRoute,
//   DrawerActions,
// } from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import LandingScreen from './Example/screens/Landing';
// import HomeScreen from './Example/screens/Home';
// import SignInScreen from './Example/screens/SignIn';
// import SignUpScreen from './Example/screens/SignUp';
// import {Button} from 'react-native';
// import PasswordForgetScreen from './Example/screens/PasswordForget';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import AccountScreen from './Example/screens/Account';
// import PasswordChangeScreen from './Example/screens/PasswordChange';
// import AdminScreen from './Example/screens/Admin';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import ProfileScreen from './Example/screens/Profile';

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

// export default App;
