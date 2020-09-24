import authReducer from './authReducer';
import AdminReducer from './AdminReducer';
import {combineReducers} from 'redux';
import StudentReducer from './StudentReducer';
import CompanyReducer from './CompanyReducer';
import VacanyReducer from './vacancyReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  student: StudentReducer,
  company: CompanyReducer,
  vacancy: VacanyReducer,
  // admin: AdminReducer,
});

export default rootReducer;
