import React from 'react';
import {Card, ListItem, Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
const Student = (props) => {
  console.log(props);
  return (
    <>
      {props.user ? (
        props.prevData ? (
          <View>
            {props.allStudents.length > 0 ? (
              <Card>
                <Text h4>All Students</Text>
                <FlatList
                  keyExtractor={(item) => item.userId}
                  data={props.allStudents}
                  renderItem={({item}) => {
                    return (
                      <ListItem>
                        <ListItem.Content>
                          <ListItem.Title>{item.firstName}</ListItem.Title>
                          <ListItem.Subtitle>
                            {item.department}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    );
                  }}
                />
              </Card>
            ) : (
              <View>
                <Text>Sorry, No Student available.</Text>
              </View>
            )}
          </View>
        ) : null
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allStudents: state.student.allStudents,
    prevData: state.student.prevDataOfStudents,
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(Student);
