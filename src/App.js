import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Provider} from 'react-redux';
import SignIn from './screens/SignIn/SignIn';
import store from './store';
import SignUp from './screens/SignUp/SignUp';
import CompanyDetails from './screens/Company/CompanyDetails';
import Admin from './screens/Admin/Admin';
import StudentRegistration from './screens/Student/StudentRegistration';
// import Student from './screens/Student/Student';
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
