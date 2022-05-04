import React from 'react';
import { render, screen, waitFor } from '../../../app/common/util/test-utils';
import RegisterForm from '../RegisterForm';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('checking register form elements', () => {
  test('submit button should be initialized as disabled', () => {
    render(<RegisterForm />);
    expect(getSubmitButton()).toBeDisabled();
  });

  test('input email should give error if user enters incorrect data type', async () => {
    render(<RegisterForm />);

    await user.type(getEmail(), 'testgmail.com');
    await user.tab();
    await waitFor(() => {
      expect(getErrorEl()).toBeInTheDocument();
    });
  });

  test('input username should give error if user enters less than 6 chars', async () => {
    render(<RegisterForm />);

    await user.type(getUsername(), 'test');
    await user.tab();
    await waitFor(() => {
      expect(getErrorEl()).toBeInTheDocument();
    });
  });

  test('input password should give error if user enters less than 6 chars', async () => {
    render(<RegisterForm />);

    await user.type(getPassword(), '12345');
    await user.tab();
    await waitFor(() => {
      expect(getErrorEl()).toBeInTheDocument();
    });
  });

  test('input password confirm should give error if user enters less than 6 chars', async () => {
    render(<RegisterForm />);

    await user.type(getPasswordConfirm(), '12345');
    await user.tab();
    await waitFor(() => {
      expect(getErrorEl()).toBeInTheDocument();
    });
  });

  test('input password confirm should give error if passwords do not match', async () => {
    render(<RegisterForm />);
    await user.type(getPassword(), '123456');
    await user.type(getPasswordConfirm(), '123457');
    await user.tab();
    await waitFor(() => {
      expect(getErrorEl()).toBeInTheDocument();
    });
  });

  test('after filling form fields, submit button should be enabled', async () => {
    render(<RegisterForm />);
    await user.type(getEmail(), 'test@gmail.com');
    await user.type(getUsername(), 'testuser');
    await user.type(getPassword(), '123456');
    await user.type(getPasswordConfirm(), '123456');
    await user.tab();
    await waitFor(() => {
      expect(getSubmitButton()).toBeEnabled();
    });
  });

  describe('submit form when clicked button', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
      onSubmit.mockClear();
    });

    test('take user credentials from form', async () => {
      render(<RegisterForm onSubmit={onSubmit} />);

      await user.type(getEmail(), 'test@gmail.com');
      await user.type(getUsername(), 'testuser');
      await user.type(getPassword(), '123456');
      await user.type(getPasswordConfirm(), '123456');
      clickSubmitButton();

      await waitFor(() =>
        expect(onSubmit).toHaveBeenCalledWith({
          email: 'test@gmail.com',
          username: 'testuser',
          password: '123456',
          passwordConfirm: '123456',
        })
      );
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

function getEmail() {
  return screen.getByTestId('email');
}

function getUsername() {
  return screen.getByTestId('username');
}

function getPassword() {
  return screen.getByTestId('password');
}

function getPasswordConfirm() {
  return screen.getByTestId('passwordConfirm');
}

function getSubmitButton() {
  return screen.getByRole('button', { name: 'sign_up_form.register' });
}

function clickSubmitButton() {
  user.click(getSubmitButton());
}

function getErrorEl() {
  return screen.getByTestId('errorEl');
}
