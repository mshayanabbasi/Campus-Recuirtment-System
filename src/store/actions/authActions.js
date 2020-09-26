import {
  LOGIN_SUCCESS,
  USER_IS_BLOCKED,
  SIGNUP_SUCCESS,
  LOGIN_LOADING,
  LOGIN_FAILED,
  CURRENT_USER_FAILED,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CURRENT_USER_LOADING,
  CURRENT_USER_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_FAILED,
} from '../Types';
import '../../config/firebaseConfig';
import * as firebase from 'firebase';

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
          console.log(data);
          dispatch({type: LOGIN_SUCCESS, payload: data});
        });
    } catch (error) {
      dispatch({type: LOGIN_FAILED, payload: error});
    }
  };
};

export const SIGNUP = (name, email, password, type) => {
  return (dispatch) => {
    dispatch({type: SIGNUP_LOADING});
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
        dispatch({type: SIGNUP_SUCCESS, payload: data});
      })
      .catch((error) => {
        dispatch({type: SIGNUP_FAILED, payload: error});
      });
  };
};

export const CURRENTUSER = () => {
  return (dispatch) => {
    let loading = false;
    dispatch({type: CURRENT_USER_LOADING, payload: !loading});
    try {
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
                  type: CURRENT_USER_SUCCESS,
                  currentUser: data,
                  userType: t.type,
                });
              }
            });
        }
      });
    } catch (error) {
      dispatch({type: CURRENT_USER_FAILED, payload: error});
    }
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
