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
  CURRENT_USER_LOADING,
} from '../Types';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const LOGIN = ({email, password}, navigation) => {
  const obj = {
    email,
    password,
  };
  return (dispatch) => {
    dispatch({type: LOGIN_LOADING});
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('data', data);

        const userId = auth().currentUser.uid;
        database()
          .ref()
          .child('user/' + userId)
          .on('value', (snapshot) => {
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
            if (type === 'admin') {
              navigation.navigate('Root', {screen: 'Admin'});
            }
          });

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

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        var userID = auth().currentUser.uid;
        var ref = database().ref();
        ref.child('user' + '/' + auth().currentUser.uid).set({
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
        } else if (type === 'admin') {
          navigation.navigate('Root', {screen: 'Admin'});
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
    try {
      dispatch({type: CURRENT_USER_LOADING});
      auth().onAuthStateChanged((user) => {
        if (user) {
          database()
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
    } catch (error) {
      dispatch({type: CURRENT_USER_FAILED});
    }
  };
};

export const SIGNOUT = (navigation) => {
  return (dispatch) => {
    dispatch({type: LOGOUT_LOADING});
    try {
      auth()
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

