import React, {useEffect} from 'react';
import {Card, ListItem, Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
const AllStudents = (props) => {
  console.log(props);

  return (
    <>
      {/* {props.allStudents.length > 0 ? ( */}
        <Card>
          <Text>All Students</Text>
          <FlatList
            data={props.allStudents}
            keyExtractor={(item) => item.userId}
            renderItem={({item}) => {
              console.log(item);
              return (
                <ListItem>
                  <ListItem.Content>
                    <ListItem.Title>{item.firstName}</ListItem.Title>
                    <ListItem.Subtitle>{item.department}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            }}
          />
        </Card>
      {/* ) : ( */}
        {/* <View>
          <Text>Sorry, No Student Available</Text>
        </View> */}
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(AllStudents);
