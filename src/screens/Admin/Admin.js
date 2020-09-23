import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  RequestSAccept,
  RequestCAccept,
  RequestSCancel,
  RequestCCancel,
} from '../../store/actions/adminActions';
import Icon from 'react-native-vector-icons/Ionicons';

const Admin = (props) => {
  const [state, setState] = useState({
    showDS: false,
    showDC: false,
    SObj: '',
    CObj: '',
  });
  dS = (uid) => {
    const TemObjS = props.AllSrequests.find((v) => v.userId === uid);
    setState({...state, showDS: true, showDC: false, SObj: TemObjS, CObj: ''});
  };
  dC = (uid) => {
    const TemObjC = props.AllCrequests.find((v) => v.userId === uid);
    setState({...state, showDS: false, showDC: true, SObj: '', CObj: TemObjC});
  };

  return (
    <View>
      {props.user ? (
        <View>
          <Card>
            <Text h4>Student Requests</Text>
            {props.AllSrequests.length > 0 ? (
              <>
                <FlatList
                  keyExtractor={(item) => item.userId}
                  data={props.AllSrequests}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <Text>{item.firstName}</Text>
                        <Icon
                          name="information-circle-outline"
                          size={20}
                          onPress={() => {
                            dS(v.userId);
                          }}
                        />
                        <Icon
                          name="checkmark-circle-outline"
                          size={20}
                          onPress={() => {
                            props.RequestCAccept(v.editId, v.urid);
                          }}
                        />
                        <Icon
                          name="close-circle-outline"
                          size={20}
                          onPress={() => {
                            props.RequestCCancel(v.urid);
                          }}
                        />
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <View>
                <Text h4>No Requests</Text>
              </View>
            )}
          </Card>
          <Card>
            <Text h4>Companies Request</Text>
            {props.AllCrequests.length > 0 ? (
              <>
                <FlatList
                  keyExtractor={(item) => item.userId}
                  data={props.AllCrequests}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <Text>{item.cname}</Text>
                        <Icon
                          name="information-circle-outline"
                          size={20}
                          onPress={() => {
                            dC(v.userId);
                          }}
                        />
                        <Icon
                          name="checkmark-circle-outline"
                          size={20}
                          onPress={() => {
                            props.RequestCAccept(v.urid);
                          }}
                        />
                        <Icon
                          name="close-circle-outline"
                          size={20}
                          onPress={() => {
                            props.RequestCCancel(v.editId, v.urid);
                          }}
                        />
                      </View>
                    );
                  }}
                />
              </>
            ) : (
              <View>
                <Text h4>No Requests</Text>
              </View>
            )}
          </Card>
        </View>
      ) : null}
      {state.showDS ? (
        <Card>
          <Text h2>Updation Data</Text>
          <Text>FirstName {state.SObj.firstName}</Text>
          <Text>LastName {state.SObj.lastName}</Text>
          <Text>Age {state.SObj.age}</Text>
          <Text>Qualification {state.SObj.qualification}</Text>
          <Text>Gender {state.SObj.gender}</Text>
          <Text>Department {state.SObj.department}</Text>
          <Text>Skills {state.SObj.skills}</Text>
          <Text>Email {state.SObj.email}</Text>
          <Text>Contact Number {state.SObj.phoneNumber}</Text>
        </Card>
      ) : null}
      {state.showDC ? (
        <Card>
          <Text h2>Updation Data</Text>
          <Text>Company Name {state.CObj.cname}</Text>
          <Text>Established {state.CObj.es}</Text>
          <Text>HR Name {state.CObj.hrname}</Text>
          <Text>Email {state.CObj.email}</Text>
          <Text>Contact Number {state.CObj.cnum}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    AllSrequests: state.admin.Srequests,
    AllCrequests: state.admin.Crequests,
    user: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RequestSAccept: (editId, updationId) =>
      dispatch(RequestSAccept(editId, updationId)),
    RequestCAccept: (editId, updationId) =>
      dispatch(RequestCAccept(editId, updationId)),
    RequestSCancel: (updationId) => dispatch(RequestSCancel(updationId)),
    RequestCCancel: (updationId) => dispatch(RequestCCancel(updationId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
