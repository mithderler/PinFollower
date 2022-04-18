import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authReducer';
import uiReducer from '../common/reducers/uiReducer';

const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer },
});

export default store;
