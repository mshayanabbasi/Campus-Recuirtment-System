import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Card, Text} from 'react-native-elements';
import {ApplyVacancy} from '../../store/actions/vacancyActions';
import {allDataOfStudents} from '../../store/actions/studentActions';

const VacancieDetails = (props) => {
  console.log('Vacancie Details', props);
  console.log('params', props.route.params);

  useEffect(() => {
    props.allDataOfStudents();
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
      vacancyId: currentVacancy?.userId,
      phoneNumber: currentStudent?.phoneNumber,
      email: currentStudent?.email,
      gender: currentStudent?.gender,
      studentID: props.user.userID,
      id: currentVacancy?.companyID,
    };
    props.ApplyVacancy(obj);
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
      <Button
        title="Apply Now"
        onPress={() => {
          onAdd();
        }}
      />
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allVacancies: state.vacancy.allVacancies,
    allStudents: state.student.allStudents,
  };
};

export default connect(mapStateToProps, {ApplyVacancy, allDataOfStudents})(
  VacancieDetails,
);
