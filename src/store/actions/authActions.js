import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  USER_IS_BLOCKED,
  CURRENT_USER,
  LOGOUT,
  SIGNUP_SUCCESS,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

export const LOGIN = (email, password) => {
  return (dispatch) => {
    const auth = firebase.auth();
    auth
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
        console.log(data);
        dispatch({type: LOGIN_SUCCESS, logInUser: data});
      })
      .catch((error) => {
        dispatch({type: LOGIN_ERROR, logInError: error, email: email});
      });
  };
};

export const SIGNUP = (name, email, password, type) => {
  return (dispatch) => {
    const auth = firebase.auth();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        console.log('error', error);
      })
      .then((data) => {
        console.log('Successfully');
        firebase.auth().currentUser.updateProfile({
          displayName: name,
        });
        var ref = firebase.database().ref();
        ref.child('user' + '/' + firebase.auth().currentUser.uid).set({
          email: email,
          password: password,
          name: name,
          type: type,
        });
        name = '';
        email = '';
        password = '';
        dispatch({type: SIGNUP_SUCCESS, signUpUser: data});
      })
      .catch((error) => {
        dispatch({type: SIGNUP_ERROR, signUpError: error});
      });
  };
};

export const CURRENTUSER = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((data) => {
      if (data) {
        console.log(data);
        firebase
          .database()
          .ref()
          .child(`user/${data.uid}`)
          .on('value', (snapshot) => {
            const t = snapshot.val();
            console.log(t);
            if (t === null) {
              dispatch({type: USER_IS_BLOCKED, blockedUser: data});
            } else {
              dispatch({
                type: CURRENT_USER,
                currentUser: data,
                userType: t.type,
              });
            }
          });
      }
    });
  };
};

export const SIGNOUT = () => {
  return (dispatch) => {
    firebase.auth().signOut();
    dispatch({type: LOGOUT});
  };
};
