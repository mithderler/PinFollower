import React from 'react';
import { render, screen } from '../../../app/common/util/test-utils';
import LoginPage from '../LoginPage';
import userEvent from '@testing-library/user-event';

describe('render sign in methods when initialized', () => {
  test('render google provider button', () => {
    render(<LoginPage />);
    expect(screen.getByText(/google/i)).toBeInTheDocument();
  });

  test('render facebook provider button', () => {
    render(<LoginPage />);
    expect(screen.getByText(/facebook/i)).toBeInTheDocument();
  });

  test('render email-password user login form', () => {
    render(<LoginPage />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
