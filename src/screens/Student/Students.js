import React, {useEffect} from 'react';
import {Card, ListItem} from 'react-native-elements';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {prevDataOfStudents} from '../../store/actions/studentActions';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Student = (props) => {
  console.log('Students Screen', props);
  useEffect(() => {
    props.allStudentsData();
  }, []);
  return (
    <>
      {props.allStudents.length > 0 ? (
        <FlatList
          data={props.allStudents}
          keyExtractor={(item) => item.userId}
          renderItem={({item}) => {
            console.log(item);
            return (
              <Card>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text>{item.firstName}</Text>
                    <Text>{item.department}</Text>
                  </View>
                  <Ionicons name="information-circle-outline" size={30} />
                </View>
              </Card>
            );
          }}
        />
      ) : (
        <View>
          <Text>Sorry, No Student Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // const unBlockedStudents = state.student.allStudents.filter((v) => !v.block);

  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allStudentsData: () => dispatch(prevDataOfStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
