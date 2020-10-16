import React, { useState } from 'react';
import {Alert, SafeAreaView, View, Text} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {ListItem} from 'react-native-elements';
import moment from 'moment';

const Dashboard = () => {
  const [enableNotification, setEnableNotification] = useState()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardTitleView}>
        <Text style={styles.cardTitle}>Add Reminder</Text>
      </View>
      <ListItem
        title="Notification"
        bottomDivider
        titleStyle={styles.titleStyle}
        switch={{
          onValueChange: enableNotification,
          value: enableNotification,
        }}
      />
      <ListItem
        title="Time"
        titleStyle={styles.titleStyle}
        onPress={this.showDateTimePicker}
        rightElement={
          <Text style={{opacity: 0.7}}>
            {moment(notificationTime).format('LT')}
          </Text>
        }
      />
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
        mode="time" // show only time picker
        is24Hour={false}
        date={new Date(notificationTime)}
        titleIOS="Pick your Notification time"
      />
    </SafeAreaView>
  );
};

export default Dashboard;
