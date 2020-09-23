import authReducer from './authReducer';
import AdminReducer from './AdminReducer';
import {combineReducers} from 'redux';
import StudentReducer from './StudentReducer';
import CompanyReducer from './CompanyReducer';
import VacanyReducer from './vacanyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  student: StudentReducer,
  company: CompanyReducer,
  vacany: VacanyReducer,
  // admin: AdminReducer,
});

export default rootReducer;
