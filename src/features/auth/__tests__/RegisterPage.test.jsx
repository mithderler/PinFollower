import React from 'react';
import { render, screen } from '../../../app/common/util/test-utils';
import RegisterPage from '../RegisterPage';

describe('render sign in methods when initialized', () => {
  test('render google provider button', () => {
    render(<RegisterPage />);
    expect(screen.getByText(/google/i)).toBeInTheDocument();
  });

  test('render facebook provider button', () => {
    render(<RegisterPage />);
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
  });
});
