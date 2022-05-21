const errorCodeLocaleMatchesList = {
  'auth/wrong-password': 'wrong_email_or_password',
  'auth/user-not-found': 'wrong_email_or_password',
  'auth/user-disabled': 'user_disabled',
  'auth/email-already-in-use': 'email_already_in_use',
};

export function getLocaleText(errorCode) {
  if (!errorCodeLocaleMatchesList[errorCode]) return 'unknown_error';
  return errorCodeLocaleMatchesList[errorCode];
}
