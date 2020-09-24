import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Card, Text} from 'react-native-elements';

const Vacancies = (props) => {
  return (
    <>
      <View>
        {props.currentUser ? (
          props.type === 'admin' ? (
            props.allVacancies.length > 0 ? (
              <Card>
                {props.allVacancies.map((v, i) => {
                  <View key={i}>
                    <Text>Company Name {v.cname}</Text>
                    <Text>Job Name {v.jobname} </Text>
                    <Text>Job Description {v.jobdescription}</Text>
                    <Text>Salary {v.salary}</Text>
                    <Text>Eligibility Criteria {v.ec}</Text>
                  </View>;
                })}
              </Card>
            ) : (
              <View>
                <Text>No Company has posted vacancy yet!</Text>
              </View>
            )
          ) : props.unBlockedVacancies.length > 0 ? (
            <Card>
              {props.unBlockedVacancies.map((v, i) => {
                <View key={i}>
                  <Text>Company Name {v.cname}</Text>
                  <Text>Job Name {v.jobname} </Text>
                  <Text>Job Description {v.jobdescription}</Text>
                  <Text>Salary {v.salary}</Text>
                  <Text>Eligibility Criteria {v.ec}</Text>
                </View>;
              })}
            </Card>
          ) : (
            <View>
              <Text>No Company has posted vacancy yet!</Text>
            </View>
          )
        ) : null}
      </View>
    </>
  );
};

const mapStateToProps = (state) => {
  const unBlockedVacancies = state.vacancy.allVacancies.filter((v) => !v.block);
  return {
    currentUser: state.auth.currentUser,
    allVacancies: state.vacancy.allVacancies,
    type: state.auth.type,
    unBlockedVacancies,
  };
};

export default connect(mapStateToProps)(Vacancies);
