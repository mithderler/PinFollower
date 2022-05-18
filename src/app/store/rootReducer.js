import { combineReducers } from 'redux';
import authReducer from '../../features/auth/authReducer';
import uiReducer from '../common/reducers/uiReducer';
import asyncReducer from '../async/asyncReducer';
import profileReducer from '../../features/profiles/profileReducer';
import pinReducer from '../../features/pins/pinReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  async: asyncReducer,
  profile: profileReducer,
  pin: pinReducer,
});

export default rootReducer;
