import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {allDataOfCompanies} from '../../../store/actions/companyActions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AllCompanies = (props) => {
  console.log('All Companies', props);

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
                  props.navigation.navigate('Company Details', {
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

const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
  },
  actionText: {
    color: 'black',
    fontSize: 16,
  },
  rectButton: {
    width: '100%',
    height: 80,
    backgroundColor: 'blue',
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(AllCompanies);
