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
      {props.currentUser ? (
        <View>
          {props.type === 'admin' ? (
            props.allCompanies.length > 0 ? (
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
            )
          ) : props.unBlockedCompanies.length > 0 ? (
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
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  const unBlockedCompanies = state.company.allCompanies.filter((v) => !v.block);
  return {
    type: state.auth.type,
    allCompanies: state.company.allCompanies,
    currentUser: state.auth.currentUser,
    unBlockedCompanies,
  };
};

export default connect(mapStateToProps)(Companies);