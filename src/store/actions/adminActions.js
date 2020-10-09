import {
  BLOCK_COMPANY,
  BLOCK_LIST,
  BLOCK_STUDENT,
  COMPANIES_UPDATION_REQUESTS,
  REQUEST_OF_COMPANY_ACCEPT,
  REQUEST_OF_COMPANY_REJECT,
  REQUEST_OF_STUDENT_ACCEPT,
  REQUEST_OF_STUDENT_REJECT,
  SAVE_COMPANY_UPDATION_DATA,
  SAVE_STUDENT_UPDATION_DATA,
  STUDENTS_UPDATION_REQUESTS,
  UN_BLOCK_COMPANY,
  UN_BLOCK_STUDENT,
} from '../Types';
import database from '@react-native-firebase/database';

export const BlockS = (studentId, studentUserId) => {
  return (dispatch) => {
    database()
      .ref()
      .child('user/' + studentUserId + 'type/')
      .remove();
    database().ref().child('BlockList').push(studentId);
    const updates = {};
    updates['block'] = true;
    database().ref().child(`students/${studentId}`).update(updates);
    dispatch({type: BLOCK_STUDENT});
  };
};

export const UnBlockS = (studentId, studentUserId, BUKey) => {
  return (dispatch) => {
    const updates = {};
    updates['block'] = false;
    database()
      .ref()
      .child('user/' + studentUserId + '/type')
      .set({type: 'student'});

    database()
      .ref()
      .child('BlockList' + BUKey)
      .remove();
    database().ref().child(`students/${studentId}`).update(updates);
    dispatch({type: UN_BLOCK_STUDENT});
  };
};

export const BlockC = (companyId, companyUserId) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(state);
    const vac = state.vac.allVacancies;
    console.log(vac);
    const sp = vac.filter((v) => v.userId === companyUserId);
    console.log(sp);
    const updates = {};
    updates['block'] = true;
    database().ref().child(`user/${companyUserId}/type`).remove();
    database().ref().child('BlockList').push(companyUserId);
    database().ref().child(`companies/${companyId}`).update(updates);
    sp.forEach((v) =>
      database().ref().child(`vacancies/${v.postId}`).update(updates),
    );
    dispatch({type: BLOCK_COMPANY});
  };
};

export const UnBlockC = (companyId, companyUserId, BUkey) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(state);
    const vac = state.vac.allVacancies;
    console.log(vac);
    const sp = vac.filter((v) => v.userId === companyUserId);
    console.log(sp);
    const updates = {};
    updates['block'] = false;

    database()
      .ref()
      .child('user/' + companyUserId + '/type')
      .set({type: 'company'});
    database().ref().child(`BlockList/${BUkey}`).remove();
    database().ref().child(`companies/${companyId}`).update(updates);
    sp.forEach((v) =>
      database().ref().child(`vacancies/${v.postId}`).update(updates),
    );
    dispatch({type: UN_BLOCK_COMPANY});
  };
};

export const BlockList = () => {
  return (dispatch) => {
    database()
      .ref()
      .child('BlockList')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const TemArr = [];
        for (let key in TemArr) {
          TemArr.push({key: key, userId: data[key]});
        }
        dispatch({type: BLOCK_LIST, blockData: TemArr});
      });
  };
};

export const UpdationRequest = (data) => {
  return (dispatch) => {
    if (data.type === 'student') {
      database().ref().child('UpdationRequest').child('student').push(data);
      dispatch({type: SAVE_STUDENT_UPDATION_DATA});
    }
    if (data.type === 'company') {
      database().ref().child('UpdationRequest').child('company').push(data);
      dispatch({type: SAVE_COMPANY_UPDATION_DATA});
    }
  };
};

export const prevDataOfUpdationRequests = () => {
  return (dispatch) => {
    database()
      .ref()
      .child('UpdationRequest')
      .child('student')
      .on('value', (snapshot) => {
        const dataS = snapshot.val();
        console.log(dataS);
        const TemArrS = [];
        for (let key in dataS) {
          TemArrS.push({
            userId: dataS[key].userId,
            firstName: dataS[key].firstName,
            lastName: dataS[key].lastName,
            age: dataS[key].age,
            skills: dataS[key].skills,
            gender: dataS[key].gender,
            phoneNumber: dataS[key].phoneNumber,
            email: dataS[key].email,
            qualification: dataS[key].qualification,
            department: dataS[key].department,
            editId: dataS[key].editId,
            urid: key,
            block: dataS[key].block,
          });
        }
        console.log(TemArrS);
        dispatch({
          type: STUDENTS_UPDATION_REQUESTS,
          SupdationRequestsData: TemArrS,
        });
      });
    database()
      .ref()
      .child('UpdationRequest')
      .child('student')
      .on('value', (snapshot) => {
        const dataC = snapshot.val();
        console.log(dataC);
        const TemArrC = [];
        for (let key in dataC) {
          TemArrC.push({
            userId: dataC[key].userId,
            cname: dataC[key].cname,
            es: dataC[key].es,
            hrname: dataC[key].hrname,
            email: dataC[key].email,
            cnum: dataC[key].cnum,
            editId: dataC[key].editId,
            urid: key,
            block: dataC[key].block,
          });
        }
        dispatch({
          type: COMPANIES_UPDATION_REQUESTS,
          CupdationRequestsData: TemArrC,
        });
      });
  };
};

export const RequestSAccept = (editId, updationId) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(state);
    const sp = state.admin.Srequests.find((v) => v.find(v.editId === editId));
    const TemObj = {
      userId: sp.userId,
      firstName: sp.firstName,
      lastName: sp.lastName,
      age: sp.age,
      skills: sp.skills,
      gender: sp.gender,
      phoneNumber: sp.phoneNumber,
      email: sp.email,
      qualification: sp.qualification,
      department: sp.department,
      block: sp.block,
    };
    database().ref().child(`students/${editId}`).update(TemObj);
    database()
      .ref()
      .child('UpdationRequest')
      .child(`students/${updationId}`)
      .remove();
    dispatch({type: REQUEST_OF_STUDENT_ACCEPT});
  };
};

export const RequestCAccept = (editId, updationId) => {
  return (dispatch, getState) => {
    const state = getState();
    const sp = state.admin.Crequests.find((v) => v.editId === editId);
    const TemObj = {
      userId: sp.userId,
      cname: sp.cname,
      es: sp.es,
      hrname: sp.hrname,
      email: sp.email,
      cnum: sp.cnum,
      block: sp.block,
    };
    database().ref().child(`companies/${editId}`).update(TemObj);
    database()
      .ref()
      .child('UpdationRequest')
      .child(`company/${updationId}`)
      .remove();
    dispatch({type: REQUEST_OF_COMPANY_ACCEPT});
  };
};

export const RequestSCancel = (updationId) => {
  return (dispatch) => {
    database()
      .ref()
      .child('UpdationRequest')
      .child(`student/${updationId}`)
      .remove();
    dispatch({type: REQUEST_OF_STUDENT_REJECT});
  };
};

export const RequestCCancel = (updationId) => {
  return (dispatch) => {
    database()
      .ref()
      .child('UpdationRequest')
      .child(`company/${updationId}`)
      .remove();
    dispatch({type: REQUEST_OF_COMPANY_REJECT});
  };
};
