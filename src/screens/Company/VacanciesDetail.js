import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Text} from 'react-native-elements';
import {ApplyVacancy} from '../../store/actions/vacancyActions';
import {prevDataOfStudents} from '../../store/actions/studentActions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

const VacancieDetails = (props) => {
  console.log('Vacancie Details', props);
  console.log('params', props.route.params);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION', notification);
      },
    });

    props.allStudentsData();
    fcmTokenFunc();
  }, []);

  const NotiPermission = async () => {
    messaging()
      .requestPermission()
      .then(() => {
        console.log('User has authorised');
      })
      .catch((error) => {
        console.log('user has rejected permissions', error);
      });
  };

  const fcmTokenFunc = async () => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          console.log('user has permission');
        } else {
          console.log("user doesn't have permission");
          NotiPermission();
        }
      });
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('fcmToken from AsyncStorage', fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken from firebase: ', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken).then(() =>
          console.log('set'),
        );
      }
    }
  };

  const currentVacancy = props.allVacancies.find(
    (v) => v.postId === props.route.params.id,
  );

  const currentStudent = props.allStudents.find(
    (v) => v.userId === props.user.userID,
  );

  console.log(currentStudent);

  console.log(currentVacancy, 'Current Vacancy');

  const onAdd = () => {
    // console.log(id, 'id');
    console.log(currentVacancy, 'currentVacancy');
    const obj = {
      firstName: currentStudent?.firstName,
      lastName: currentStudent?.lastName,
      age: currentStudent?.age,
      department: currentStudent?.department,
      skills: currentStudent?.skills,
      vacancyId: currentVacancy?.userId,
      phoneNumber: currentStudent?.phoneNumber,
      email: currentStudent?.email,
      gender: currentStudent?.gender,
      studentID: props.user.userID,
      id: currentVacancy?.companyID,
    };
    console.log(obj);
    props.applyJob(obj);
    props.navigation.navigate('Vacancies');
  };

  const sendPushNotification = async () => {
    const FIREBASE_API_KEY = 'AIzaSyD77FCxeEgcKApi6wT3Ew_TVUXKe7qSdEs';
    const message = {
      registration_ids: [
        'eWPpYdgTQ1-oUw7iWgejNA:APA91bHUQgpdmLMiMBrgktLr-EYRlC_7x-OV5QMGd77LeRTAvi_CE30vLe3tyqlb4abz1Krtfi1523E1cJ4E5qTDko-bsKAAcF_B4IXYefBp5n7x8CMh53_QC_Io-V3FcGgQRpPiVSTs',
      ],
      notification: {
        title: currentStudent?.firstName,
        body: currentStudent?.skills,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: 'high',
        content_available: true,
      },
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: 'key=' + FIREBASE_API_KEY,
    });

    let response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers,
      body: JSON.stringify(message),
    });
    console.log('responseee', response);
    response = await response.json();
    console.log('response', response);
  };
  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Vacancy Information</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Name {currentVacancy?.cname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Job Name {currentVacancy?.jobname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Job Description {currentVacancy?.jobdescription}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Eligibility Criteria {currentVacancy?.ec}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Salary {currentVacancy?.salary}
      </Text>
      <Button
        title="Apply Now"
        onPress={() => {
          onAdd();
          sendPushNotification();
        }}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allVacancies: state.vacancy.allVacancies,
    allStudents: state.student.allStudents,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    applyJob: (a) => dispatch(ApplyVacancy(a)),
    allStudentsData: () => dispatch(prevDataOfStudents()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VacancieDetails);
