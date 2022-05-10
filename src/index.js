import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from './app/layout/App';
import configureStore from './app/store/configureStore';
import './app/common/util/i18n';
import './index.css';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const loadingMarkup = <div>Loading</div>;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
