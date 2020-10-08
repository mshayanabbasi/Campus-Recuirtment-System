import {NEW_STUDENT, PERVIOUS_DATA_OF_STUDENTS} from '../Types';
const initState = {
  allStudents: [],
  student: null,
};

const StudentReducer = (state = initState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_STUDENTS:
      return {
        ...state,
        allStudents: action.payload,
      };
    case NEW_STUDENT:
      return {
        ...state,
        student: action.payload,
      };

    default:
      return state;
  }
};

export default StudentReducer;
