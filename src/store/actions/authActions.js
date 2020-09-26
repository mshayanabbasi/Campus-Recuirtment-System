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

export const LOGIN = (email, password) => {
  return (dispatch) => {
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
                console.log('Successfully');
              }
              if (typeCheck === 'company') {
                console.log('Successfully Sign In company');
              }
            });
          }
          dispatch({type: LOGIN_SUCCESS, payload: data});
        });
    } catch (error) {
      dispatch({type: LOGIN_FAILED, payload: error});
    }
  };
};

export const SIGNUP = ({name, email, password, type}, navigate) => {
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
        const asybc = AsyncStorage.setItem('user', JSON.stringify(obj));
        console.log(asybc);
        if (type === 'student') {
          navigate('Company');
        }
        if (type === 'company') {
          navigate('Student');
        }

        name = '';
        email = '';
        password = '';
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
      firebase.auth().signOut();
      dispatch({type: LOGOUT_SUCCESS});
    } catch (error) {
      dispatch({type: LOGOUT_FAILED});
    }
  };
};
