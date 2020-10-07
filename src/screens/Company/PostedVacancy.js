import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  deleteVacany,
  prevDataOfVacancies,
} from '../../store/actions/vacancyActions';

const PostedVacancy = (props) => {
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
              <Card>
                <View>
                  <Text>{item.jobname}</Text>
                  <Text>{item.jobdescription}</Text>
                  <Text>{item.salary}</Text>
                  <Text style={{paddingBottom: 20}}>{item.ec}</Text>
                  <Button title="Apply Now" />
                </View>
              </Card>
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

{
  /* <Card>
              <View>
                <Text>{v.jobname}</Text>
                <Text>{v.description}</Text>
                <Text>{v.salary}</Text>
                <Text style={{paddingBottom: 20}}>{v.ec}</Text>
                <Button title="Apply Now" />
              </View>
            </Card> */
}
