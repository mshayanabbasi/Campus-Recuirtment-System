import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SIGNUP_LOADING,
  SIGNUP_FAILED,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../RootNavigation';

export const LOGIN = ({email, password}) => {
  const obj = {
    email,
    password,
  };
  return (dispatch) => {
    // console.log(obj);
    dispatch({type: LOGIN_LOADING});
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          console.log('data', data);
          if (email === 'admin@gmail.com' && password === 'admin12345') {
            console.log('Successfully Sign In admin');
          } else {
            var typeCheck;
            const userId = firebase.auth().currentUser.uid;
            const database = firebase.database().ref();
            const speedRef = database.child('user/' + userId);
            speedRef.on('value', (snapshot) => {
              typeCheck = snapshot.val().type;
              if (typeCheck === 'student') {
                RootNavigation.navigate('Student');
              }
              if (typeCheck === 'company') {
                RootNavigation.navigate('Student');
              }
            });
          }
          dispatch({type: LOGIN_SUCCESS, payload: obj});
        });
    } catch (error) {
      dispatch({type: LOGIN_FAILED, payload: error});
    }
  };
};

export const SIGNUP = ({name, email, password, type}) => {
  const obj = {
    name,
    email,
    password,
    type,
  };
  return (dispatch) => {
    dispatch({type: SIGNUP_LOADING});
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log('error', error);
      })
      .then((data) => {
        var ref = firebase.database().ref();
        ref.child('user' + '/' + firebase.auth().currentUser.uid).set({
          ...obj,
        });
        if (type === 'student') {
          RootNavigation.navigate('Root', {screen: 'Company'});
        }
        if (type === 'company') {
          RootNavigation.navigate('Student');
        }
        AsyncStorage.setItem('user', JSON.stringify(obj));
        dispatch({type: SIGNUP_SUCCESS, payload: obj});
      })
      .catch((error) => {
        dispatch({type: SIGNUP_FAILED, payload: error});
      });
  };
};

export const SIGNOUT = () => {
  return (dispatch) => {
    dispatch({type: LOGOUT_LOADING});
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('user');
          dispatch({type: LOGOUT_SUCCESS});
          RootNavigation.navigate('Sign In');
        });
    } catch (error) {
      dispatch({type: LOGOUT_FAILED});
    }
  };
};

export const UpdateUser = (data) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_USER', payload: data});
  };
};
