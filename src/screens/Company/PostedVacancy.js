import React from 'react';
import {View} from 'react-native';
import {Card, Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {deleteVacany} from '../../store/actions/vacancyActions';

const PostedVacancy = (props) => {
  const currentCompanyVacancies = props.allVacancies.forEach((stu) => {
    return stu.userId === props.currentUser.uid;
  });
  return (
    <>
      {props.currentUser ? (
        <Card>
          <Card.Title>POSTED VACANCIES</Card.Title>
          {currentCompanyVacancies.length > 0 ? (
            currentCompanyVacancies.map((v, i) => {
              <View key={i}>
                <Text>{v.jobname}</Text>
                <Text>{v.description}</Text>
                <Text>{v.salary}</Text>
                <Text>{v.ec}</Text>
              </View>;
            })
          ) : (
            <View>
              <Text>You didn't post any vacancy yet!</Text>
            </View>
          )}
        </Card>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    allVacancies: state.vacancy.allVacancies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVacancy: (did) => dispatch(deleteVacany(did)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostedVacancy);
