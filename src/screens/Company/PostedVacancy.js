import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  deleteVacany,
  prevDataOfVacancies,
} from '../../store/actions/vacancyActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostedVacancy = (props) => {
  console.log('Posted Vacancy', props);
  useEffect(() => {
    props.allVacanicesData();
  }, []);
  return (
    <>
      {props.allVacancies.length > 0 ? (
        <FlatList
          data={props.allVacancies}
          keyExtractor={(item) => item.userId}
          renderItem={({item}) => {
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Vacancies Detail', {
                    id: item.postId,
                  })
                }>
                <Card>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{item.jobname}</Text>
                    <Ionicons name="information-circle-outline" size={25} />
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View>
          <Text>You didn't post any vacancy yet!</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allVacancies: state.vacancy.allVacancies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allVacanicesData: () => dispatch(prevDataOfVacancies()),
    deleteVacancy: (did) => dispatch(deleteVacany(did)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostedVacancy);
