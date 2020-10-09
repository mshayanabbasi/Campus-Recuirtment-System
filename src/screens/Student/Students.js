import React, {useEffect} from 'react';
import {Card, ListItem} from 'react-native-elements';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import {prevDataOfStudents} from '../../store/actions/studentActions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApplyVacancyData} from '../../store/actions/vacancyActions';
import {PrevDataOfCompanies} from '../../store/actions/companyActions';

const Student = (props) => {
  console.log('Students Screen', props);
  // console.log('user', props.user.userID);
  console.log('data', props.allCompanies);
  const currentCompanyID = props.allCompanies.find((v) => {
    if (props.user) {
      return v.userId === props.user.userID;
    }
  });

  console.log('curreCompanyID', currentCompanyID);
  useEffect(() => {
    props.allcandidates(currentCompanyID?.companyID);
    props.allCompaniesData();
    // props.allStudentsData();
  }, []);
  console.log('candidates', props.candidates);
  return (
    <>
      {props.candidates.length > 0 ? (
        <FlatList
          data={props.candidates}
          keyExtractor={(item) => item.vacanyDataId}
          renderItem={({item}) => {
            console.log('item', item);
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Student Detail', {
                    id: item.vacanyDataId,
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
        <View>
          <Text>Sorry, No Student Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  // const unBlockedStudents = state.student.allStudents.filter((v) => !v.block);

  return {
    allStudents: state.student.allStudents,
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
    candidates: state.vacancy.candidates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allStudentsData: () => dispatch(prevDataOfStudents()),
    allcandidates: (a) => dispatch(ApplyVacancyData(a)),
    allCompaniesData: () => dispatch(PrevDataOfCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
