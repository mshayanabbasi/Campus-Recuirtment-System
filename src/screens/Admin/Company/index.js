import React from 'react';
import {View, FlatList, Animated} from 'react-native';
import {Card, ListItem, Text} from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {connect} from 'react-redux';

const AllCompanies = (props) => {
  console.log(props);
  // const details = (id) => {
  //   // props.navigation.navigate();
  // };
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Delete
        </Animated.Text>
      </RectButton>
    );
  };
  return (
    <>
      {props.allCompanies.length > 0 ? (
        <FlatList
          data={props.allCompanies}
          keyExtractor={(item) => item.companyID}
          renderItem={({item}) => {
            return (
              <Swipeable renderRightActions={}>
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.cname}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Swipeable>
            );
          }}
        />
      ) : (
        <View>
          <Text>Sorry, No Company Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
  };
};

export default connect(mapStateToProps)(AllCompanies);
