import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';
import uiReducer from '../common/reducers/uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;
