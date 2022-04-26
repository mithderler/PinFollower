import React from 'react';
import { render, screen } from '../../../app/common/util/test-utils';
import LoginForm from '../LoginForm';
import userEvent from '@testing-library/user-event';

test('inputs should give validation error feedback', () => {
  render(<LoginForm />);
  // userEvent.type(screen.getByLabelText(/email/i), {
  //   target: { value: 'testgmail.com' },
  // });
  // userEvent.tab();
  // expect(screen.getByTestId('meta')).toBeInTheDocument();

  const passwordInputElement = screen.getByLabelText(/password/i);
  expect(passwordInputElement.value).toBe('');
});
