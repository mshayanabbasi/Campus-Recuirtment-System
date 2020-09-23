import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';

const Companies = (props) => {
  console.log(props);
  return (
    <>
      {props.user ? (
        <View>
          <Text>All Companies</Text>
        </View>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.auth.type,
    allCompanies: state.company.allCompanies,
    user: state.auth.currentUser,
    unBlockedCompanies,
  };
};

export default connect(mapStateToProps)(Companies);
