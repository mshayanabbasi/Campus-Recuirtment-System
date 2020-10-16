import React, {useEffect, useState} from 'react';
import {Card} from 'react-native-elements';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {allDataOfStudents} from '../../../store/actions/studentActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AllStudents = (props) => {
  const [loading, setLoading] = useState(true);
  console.log('Students Screen', props);

  useEffect(() => {
    setLoading(true);
    props.allStudentsData();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : props.allStudents.length > 0 ? (
        <FlatList
          data={props.allStudents}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Student Details', {
                    id: item.id,
                  });
                }}>
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
                    <Ionicons name="information-circle-outline" size={25} />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Sorry, No Student Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allStudentsData: () => dispatch(allDataOfStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);
