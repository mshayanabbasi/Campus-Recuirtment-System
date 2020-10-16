import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    console.log('register [FCMService]');
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };

  registerAppWithFCM = async () => {
    console.log('registerAppWithFCM [FCMService]');
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {
    console.log('checkPermission [FCMService]');
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // User has Permission
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected', error);
      });
  };

  getToken = (onRegister) => {
    console.log('getToken [FCMService]');
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          console.log('fcmToken', fcmToken);
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken rejected', error);
      });
  };

  requestPermission = (onRegister) => {
    console.log('requestPermission [FCMService]');
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log('[FCMService] Permission rejected', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete token error', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    console.log('createNotificationListeners [FCMService]');
    // when the application is running in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open',
        remoteMessage.notification,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
      }
    });
    // when the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open',
          remoteMessage.notification,
        );
        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
        }
      });
    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A New FCM message arrived', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.data.notification;
        } else {
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });
    // Triggered when have we new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log('[FCMService] New token Refresh', fcmToken);
      onRegister(fcmToken);
    });
  };
  unRegister = () => {
    console.log('unRegister [FCMService]');
    this.messageListener();
  };
}

export const fcmService = new FCMService();
