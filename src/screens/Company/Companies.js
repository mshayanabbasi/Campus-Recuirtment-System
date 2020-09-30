import React from 'react';
import {View, FlatList} from 'react-native';
import {Card, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';

const Companies = (props) => {
  console.log(props);
  // const details = (id) => {
  //   // props.navigation.navigate();
  // };
  return (
    <>
      {props.allCompanies.length > 0 ? (
        <Card>
          <Text>All Companies</Text>
          <FlatList
            data={props.allCompanies}
            keyExtractor={(item) => item.companyID}
            renderItem={({item}) => {
              return (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.cname}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
            }}
          />
        </Card>
      ) : (
        <View>
          <Text>Sorry, No Company Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const unBlockedCompanies = state.company.allCompanies.filter((v) => !v.block);
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
    // currentUser: state.auth.currentUser,
    unBlockedCompanies,
  };
};

export default connect(mapStateToProps)(Companies);
