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
      <Card>
        <View>
        {/* {v.jobname} */}
              <Text>Job Name</Text>
              {/* {v.description} */}
              <Text>Description</Text>
              {/* {v.salary} */}
              <Text>Salary</Text>
              {/* {v.ec} */}
              <Text style={{paddingBottom: 20}}>EC</Text>
              <Button title="Apply Now" />
            </View>
        {/* {currentCompanyVacancies.length > 0 ? (
          currentCompanyVacancies.map((v, i) => {
            return (
              
            );
            
          })
        ) : (
          <View>
            <Text>You didn't post any vacancy yet!</Text>
          </View>
        )} */}
      </Card>
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
