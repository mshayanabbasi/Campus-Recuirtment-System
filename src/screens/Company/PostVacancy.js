import React, {useState} from 'react';
import {Card, Input, Button, Text} from 'react-native-elements';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {
  addNewVacancy,
  ErrorPC,
  RemoveErrorMessagesPC,
} from '../../store/actions/vacancyActions';
import {View, Modal, ScrollView} from 'react-native';

const PostVacany = (props) => {
  console.log('Post Vacancy', props);
  const [state, setState] = useState({
    isVisible: false,
  });

  // onAdd = () => {
  //   const {jobName, jobDescription, salary, ec} = state;
  //   if (jobName || jobDescription || salary || ec) {
  //     props.error('All fields are required!');
  //   } else if (jobName.length > 25) {
  //     props.error('Please enter job name properly.');
  //   } else if (jobName.length < 2) {
  //     props.error('Please enter job name properly.');
  //   } else if (jobDescription.length > 35) {
  //     props.error('Please enter job description properly.');
  //   } else if (jobDescription.length < 5) {
  //     props.error('Please enter job description properly.');
  //   } else if (salary < 5000) {
  //     props.error("Salary can't be less than 5k.");
  //   } else if (salary > 1000000) {
  //     props.error("Salary can't be more than 1000000");
  //   } else if (ec.length > 35) {
  //     props.error('Please enter Eligibility Criteria properly.');
  //   } else {
  //     props.newVacancy({
  //       userId: props.currentUser.uid,
  //       jobName: jobName,
  //       jobDescription: jobDescription,
  //       ec: ec,
  //       cname: props.currentCompnay.cname,
  //       block: state.block,
  //     });
  //   }
  //   setState({
  //     jobName: '',
  //     jobDescription: '',
  //     salary: '',
  //     ec: '',
  //   });
  //   // props.navigation.navigate('Profile');
  // };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          jobName: '',
          jobDescription: '',
          ec: '',
          salary: '',
        }}
        onSubmit={(values) => console.log(values)}>
        {({handleChange, handleSubmit, values}) => {
          return (
            <Card>
              <Text h4>Post New Vacancy</Text>
              <Input
                value={values.jobName}
                placeholder="Job Name"
                onChangeText={handleChange('jobName')}
              />
              <Input
                value={values.jobDescription}
                placeholder="Job Description"
                onChangeText={handleChange('jobDescription')}
              />
              <Input
                value={values.salary}
                placeholder="Salary"
                onChangeText={handleChange('salary')}
              />
              <Input
                value={values.ec}
                placeholder="Eligibility Criteria"
                onChangeText={handleChange('ec')}
              />
              <Button onPress={handleSubmit} title="Post" />
            </Card>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    // currentUser: state.auth.currentUser,
    // errorMessagePC: state.vacancy.errorMessage,
    // errorFlag: state.vacancy.errorFlag,
    // currentCompnay: state.company.allCompanies.forEach(
    //   (v) => v.userId === state.auth.currentUser.uid,
    // ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newVacancy: (obj) => dispatch(addNewVacancy(obj)),
    removeError: () => dispatch(RemoveErrorMessagesPC()),
    error: () => dispatch(ErrorPC()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVacany);
