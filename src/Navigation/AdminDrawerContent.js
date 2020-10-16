import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {SIGNOUT} from '../store/actions/authActions';
import {Drawer} from 'react-native-paper';

function AdminDrawer(props) {
  const handleSignout = () => {
    const {navigation} = props;
    props.signOut(navigation);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Students"
              onPress={() => {
                props.navigation.navigate('Students');
              }}
            />
            <DrawerItem
              label="Companies"
              onPress={() => {
                props.navigation.navigate('Companies');
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

export default connect(null, mapDispatchToProps)(AdminDrawer);
