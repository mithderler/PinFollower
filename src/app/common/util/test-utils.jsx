import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import '../../../app/common/util/i18n';
import '../../../index.css';

const loadingMarkup = <div>Loading</div>;

const AllTheProviders = ({ children }) => {
  return (
    <Suspense fallback={loadingMarkup}>
      <Provider store={configureStore()}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    </Suspense>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
