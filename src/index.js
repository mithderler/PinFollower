import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';

import './app/common/util/i18n';
import './index.css';

const loadingMarkup = <div>Loading</div>;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
);
