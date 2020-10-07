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
  USER_IS_BLOCKED,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILED,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN = ({email, password}, navigation) => {
  const obj = {
    email,
    password,
  };
  return (dispatch) => {
    dispatch({type: LOGIN_LOADING});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('data', data);
        if (email === 'admin@gmail.com' && password === 'admin12345') {
          console.log('Successfully Sign In admin');
        } else {
          const userId = firebase.auth().currentUser.uid;
          const database = firebase.database().ref();
          const speedRef = database.child('user/' + userId);
          speedRef.on('value', (snapshot) => {
            const {email, name, type} = snapshot.val();
            const object = {
              name,
              email,
              type,
            };
            AsyncStorage.setItem('user', JSON.stringify(object));
            if (type === 'student') {
              navigation.navigate('Companies', {screen: 'Company'});
            }
            if (type === 'company') {
              navigation.navigate('Students', {screen: 'Student'});
            }
          });
        }
        dispatch({type: LOGIN_SUCCESS, payload: obj});
      })
      .catch((error) => {
        dispatch({type: LOGIN_FAILED, payload: error, logInEmail: email});
      });
  };
};

export const SIGNUP = ({name, email, password, type}, navigation) => {
  const obj = {
    name,
    email,
    type,
  };
  return (dispatch) => {
    dispatch({type: SIGNUP_LOADING});
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        var userID = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref();
        ref.child('user' + '/' + firebase.auth().currentUser.uid).set({
          userID,
          ...obj,
        });
        AsyncStorage.setItem('user', JSON.stringify(obj));
        if (type === 'student') {
          navigation.navigate('Students', {
            screen: 'Student Registration',
          });
        } else if (type === 'company') {
          navigation.navigate('Companies', {
            screen: 'Company Registration',
          });
        }

        dispatch({type: SIGNUP_SUCCESS, payload: obj});
      })
      .catch((error) => {
        dispatch({type: SIGNUP_FAILED, payload: error});
      });
  };
};

export const currentUser = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref()
          .child(`user/${user.uid}`)
          .on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            if (data === null) {
              dispatch({type: USER_IS_BLOCKED, payload: user});
            } else {
              dispatch({type: CURRENT_USER_SUCCESS, payload: data});
            }
          });
      } else {
        dispatch({type: CURRENT_USER_FAILED});
      }
    });
  };
};

export const SIGNOUT = (navigation) => {
  return (dispatch) => {
    dispatch({type: LOGOUT_LOADING});
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          AsyncStorage.removeItem('user').then(() => {
            navigation.navigate('Auth', {screen: 'Sign In'});
          });
          dispatch({type: LOGOUT_SUCCESS});
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
