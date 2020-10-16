import React, {useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {allDataOfCompanies} from '../../store/actions/companyActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Companies = (props) => {
  console.log('Companies', props);
  // const details = (id) => {
  //   // props.navigation.navigate();
  // };
  useEffect(() => {
    props.allCompaniesData();
  }, []);
  return (
    <>
      {props.allCompanies.length > 0 ? (
        <FlatList
          data={props.allCompanies}
          keyExtractor={(item) => item.companyID}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Company Detail', {
                    id: item.companyID,
                  });
                }}>
                <Card
                  wrapperStyle={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{item.cname}</Text>
                  <Ionicons name="information-circle-outline" size={25} />
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Sorry, No Company Available</Text>
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allCompanies: state.company.allCompanies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    allCompaniesData: () => dispatch(allDataOfCompanies()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
