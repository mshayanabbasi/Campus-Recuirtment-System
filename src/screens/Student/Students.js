import React, {useEffect} from 'react';
import {Card, ListItem} from 'react-native-elements';
import {View, FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ApplyVacancyData} from '../../store/actions/vacancyActions';
import {allDataOfCompanies} from '../../store/actions/companyActions';

const Student = (props) => {
  console.log('Students Screen', props);
  console.log('data', props.allCompanies);
  const currentCompanyID = props.allCompanies.find((v) => {
    if (props.user) {
      return v.userId === props.user.userID;
    }
  });

  console.log('curreCompanyID', currentCompanyID);
  useEffect(() => {
    props.ApplyVacancyData(currentCompanyID?.companyID);
    props.allDataOfCompanies();
  }, []);
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Sorry, No Student Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
    candidates: state.vacancy.candidates,
  };
};

export default connect(mapStateToProps, {allDataOfCompanies, ApplyVacancyData})(
  Student,
);
