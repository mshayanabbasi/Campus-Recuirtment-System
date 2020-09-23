import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {BlockC, UnBlockC} from '../../store/actions/adminActions';

const CompanyDetails = (props) => {
  // console.log(props);
  return <View></View>;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    allCompanies: state.company.allCompanies,
    type: state.auth.type,
    isUserBlocked: isUserBlocked,
    BlockedUser: specificBU,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blockC: (cid, cuid) => dispatch(BlockC(cid, uid)),
    unBlockC: (cid, cuid, bukey) => dispatch(UnBlockC(cid, cuid, bukey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
