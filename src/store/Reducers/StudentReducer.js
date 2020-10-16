import {GET_ALL_STUDENTS_SUCCESS, NEW_STUDENT_SUCCESS} from '../Types';
const initState = {
  allStudents: [],
  student: null,
};

const StudentReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        allStudents: action.payload,
      };
    case NEW_STUDENT_SUCCESS:
      return {
        ...state,
        student: action.payload,
      };

    default:
      return state;
  }
};

export default StudentReducer;
