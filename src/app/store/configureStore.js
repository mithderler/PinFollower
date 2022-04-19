import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import { verifyAuth } from '../../features/auth/authReducer';

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.dispatch(verifyAuth());

  return store;
};

export default configureStore;
