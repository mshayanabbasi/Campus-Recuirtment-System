import React, {useEffect} from 'react';
import {Card, Input, Button, Text} from 'react-native-elements';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {addNewVacancy} from '../../store/actions/vacancyActions';
import {ScrollView} from 'react-native';
import {allDataOfCompanies} from '../../store/actions/companyActions';

const PostVacany = (props) => {
  useEffect(() => {
    props.allCompanyData();
  }, []);
  console.log('Post Vacancy', props);
  console.log('userId', props.user.userID);
  console.log('current Company', props.currentCompany);

  const onAdd = ({jobname, jobdescription, ec, salary}) => {
    props.newVacancy({
      userId: props.user.userID,
      jobname,
      jobdescription,
      ec,
      salary,
      cname: props.currentCompany?.cname,
      companyID: props.currentCompany?.companyID,
    });
    props.navigation.navigate('Student');
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          jobname: '',
          jobdescription: '',
          salary: '',
          ec: '',
        }}
        onSubmit={(values) => onAdd(values)}>
        {({handleChange, handleSubmit, values}) => {
          return (
            <Card>
              <Text h4>Post New Vacancy</Text>
              <Input
                value={values.jobname}
                placeholder="Job Name"
                onChangeText={handleChange('jobname')}
              />
              <Input
                value={values.jobdescription}
                placeholder="Job Description"
                onChangeText={handleChange('jobdescription')}
              />
              <Input
                value={values.ec}
                placeholder="Eligibility Criteria"
                onChangeText={handleChange('ec')}
              />
              <Input
                value={values.salary}
                placeholder="Salary"
                keyboardType="numeric"
                onChangeText={handleChange('salary')}
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
    user: state.auth.user,
    errorMessagePC: state.vacancy.errorMessage,
    errorFlag: state.vacancy.errorFlag,
    currentCompany: state.company.allCompanies.find(
      (v) => v.userId === state.auth.user.userID,
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newVacancy: (obj) => dispatch(addNewVacancy(obj)),
    allCompanyData: () => dispatch(allDataOfCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostVacany);
