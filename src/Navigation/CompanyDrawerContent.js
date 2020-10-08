import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {SIGNOUT} from '../store/actions/authActions';
import {Drawer, Title} from 'react-native-paper';

function CompanyDrawerContent(props) {
  const handleSignout = () => {
    const {navigation} = props;
    props.signOut(navigation);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Shayan</Title>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Student"
              onPress={() => {
                props.navigation.navigate('Student');
              }}
            />

            <DrawerItem
              label="Post Vacancy"
              onPress={() => {
                props.navigation.navigate('Post Vacancy');
              }}
            />
            <DrawerItem
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Company Profile');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem label="Sign Out" onPress={handleSignout} />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: (a) => dispatch(SIGNOUT(a)),
  };
};

export default connect(null, mapDispatchToProps)(CompanyDrawerContent);
