import React from 'react';
import { render, screen } from '../../../app/common/util/test-utils';
import LoginForm from '../LoginForm';
import userEvent from '@testing-library/user-event';

test('submit button should be initialized as disabled', () => {
  render(<LoginForm />);
  expect(screen.getByRole('button')).toBeDisabled();
});

test('input email should give error if user enters incorrect data type', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/email/i), 'testgmail.com');
  await user.tab();
  expect(screen.getByTestId('meta')).toBeInTheDocument();
});

test('input password should give error if user enters less than 6 chars', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/password/i), '12345');
  await user.tab();
  expect(screen.getByTestId('meta')).toBeInTheDocument();
});

test('after filling fields submit button should be enabled', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
  await user.type(screen.getByLabelText(/password/i), '123456');
  user.tab();
  expect(screen.getByRole('button')).toBeEnabled();
});
