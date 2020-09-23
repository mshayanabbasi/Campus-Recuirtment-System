import {NEW_STUDENT, PERVIOUS_DATA_OF_STUDENTS} from '../Types';
const initState = {
  allStudents: [],
  prevDataOfStudents: false,
};

const StudentReducer = (state = initState, action) => {
  switch (action.type) {
    case PERVIOUS_DATA_OF_STUDENTS:
      return {
        ...state,
        allStudents: action.data,
        prevDataOfStudents: true,
      };
    case NEW_STUDENT:
      return state;

    default:
      return state;
  }
};

export default StudentReducer;
