import React from 'react';
import {View, FlatList} from 'react-native';
import {Card, ListItem, Text} from 'react-native-elements';
import {connect} from 'react-redux';

const AllCompanies = (props) => {
  console.log(props);
  // const details = (id) => {
  //   // props.navigation.navigate();
  // };
  return (
    <>
      {/* {props.allCompanies.length > 0 ? ( */}
        <Card>
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
      {/* ) : ( */}
        {/* <View>
          <Text>Sorry, No Company Available</Text>
        </View> */}
      {/* )} */}
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
