import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Text} from 'react-native-elements';
import {
  ApplyVacancy,
  ApplyVacancyData,
} from '../../store/actions/vacancyActions';
import {allDataOfStudents} from '../../store/actions/studentActions';
import {Alert} from 'react-native';

const VacancieDetails = (props) => {
  console.log('Vacancie Details', props);
  const currentCompany = props.companies.find((v) => v.companyID);

  useEffect(() => {
    props.allDataOfStudents();
    props.ApplyVacancyData(currentCompany?.companyID);
  }, []);


  const currentVacancy = props.allVacancies.find(
    (v) => v.postId === props.route.params.id,
  );

  const currentStudent = props.allStudents.find(
    (v) => v.userId === props.user.userID,
  );

  const onAdd = async () => {
    const obj = {
      firstName: currentStudent?.firstName,
      lastName: currentStudent?.lastName,
      age: currentStudent?.age,
      department: currentStudent?.department,
      skills: currentStudent?.skills,
      vacancyId: currentVacancy?.postId,
      phoneNumber: currentStudent?.phoneNumber,
      email: currentStudent?.email,
      gender: currentStudent?.gender,
      studentID: props.user.userID,
      id: currentVacancy?.companyID,
    };

    props.ApplyVacancy(obj, currentVacancy?.postId);
    Alert.alert('Successfully apply');
    props.navigation.navigate('Vacancies');
  };

  return (
    <Card>
      <Card.Title style={{fontSize: 20}}>Vacancy Information</Card.Title>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Company Name {currentVacancy?.cname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Job Name {currentVacancy?.jobname}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Job Description {currentVacancy?.jobdescription}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Eligibility Criteria {currentVacancy?.ec}
      </Text>
      <Card.Divider />
      <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>
        Salary {currentVacancy?.salary}
      </Text>
      {props.user &&
      props.user.applyJob &&
      Object.values(props.user.applyJob).includes(currentVacancy?.postId) ? (
        <Button title="Applied" onPress={() => Alert.alert('Applied')} />
      ) : (
        <Button
          title="Apply Now"
          onPress={() => {
            onAdd();
          }}
        />
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allVacancies: state.vacancy.allVacancies,
    allStudents: state.student.allStudents,
    candidates: state.vacancy.candidates,
    companies: state.company.allCompanies,
    visited: state.vacancy.visited,
  };
};

export default connect(mapStateToProps, {
  ApplyVacancy,
  allDataOfStudents,
  ApplyVacancyData,
})(VacancieDetails);
