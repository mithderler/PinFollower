import React from 'react';
import { render, screen, waitFor } from '../../../app/common/util/test-utils';
import LoginForm from '../LoginForm';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('checking login form elements', () => {
  test('submit button should be initialized as disabled', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('input email should give error if user enters incorrect data type', async () => {
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'testgmail.com');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByTestId('meta')).toBeInTheDocument();
    });
  });

  test('input password should give error if user enters less than 6 chars', async () => {
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/password/i), '12345');
    await user.tab();
    await waitFor(() => {
      expect(screen.getByTestId('meta')).toBeInTheDocument();
    });
  });

  test('after filling form fields, submit button should be enabled', async () => {
    render(<LoginForm />);
    await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    await user.type(screen.getByLabelText(/password/i), '123456');
    await user.tab();
    expect(
      screen.getByRole('button', { name: 'login_form.sign_in' })
    ).toBeEnabled();
  });
});

describe('submit form when clicked button', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('take user credentials from form', async () => {
    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(getEmail(), 'test@gmail.com');
    await user.type(getPassword(), '123456');
    clickSubmitButton();
    // await user.click(getRememberMeCheckbox());

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'test@gmail.com',
        password: '123456',
        rememberMe: false,
      })
    );
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

function getEmail() {
  return screen.getByLabelText(/email/i);
}

function getPassword() {
  return screen.getByLabelText(/password/i);
}

function getRememberMeCheckbox() {
  return screen.getByRole('checkbox', { name: 'login_form.remember_me' });
}

function clickSubmitButton() {
  user.click(screen.getByRole('button', { name: 'login_form.sign_in' }));
}
