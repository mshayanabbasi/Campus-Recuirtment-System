import React from 'react';
import {View, ActivityIndicator, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

const Loading = (props) => {
  React.useEffect(() => {
    console.log('userrr', props.user);
    if (!props.user) {
      AsyncStorage.getItem('user').then((response) => {
        if (response) {
          response = JSON.parse(response);
          if (response.type === 'student') {
            props.navigation.navigate('Companies', {screen: 'Company Drawer'});
          }
          if (response.type === 'company') {
            props.navigation.navigate('Students', {screen: 'Student'});
          }
          if (response.type === 'admin') {
            props.navigation.navigate('Root', {screen: 'Admin'});
          }
        } else {
          props.navigation.navigate('Auth');
        }
      });
    }
    console.log('user', props.user);
  }, [props.user]);

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Loading);
