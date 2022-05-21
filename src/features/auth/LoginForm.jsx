import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { authActions } from './authReducer';
import TextInput from '../../app/common/form/TextInput';
import {
  signInWithEmailAndRemember,
  signInWithEmailForOneSession,
} from '../../app/firebase/firebaseService';
import { toast } from 'react-toastify';
import { getLocaleText } from '../../app/common/utils/errorMatches';

function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required(t('form_validation.required'))
          .email(t('form_validation.invalid_email')),
        password: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.password_short')),
        rememberMe: Yup.boolean(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          setSubmitting(true);
          let response;
          if (values.rememberMe) {
            response = await signInWithEmailAndRemember(values);
          } else {
            response = await signInWithEmailForOneSession(values);
          }
          const { user } = response;
          // if (!user.emailVerified) {
          //   setErrors({
          //     activation: t('login_form.activate_your_account'),
          //   });
          //   setSubmitting(false);
          //   return;
          // }
          const userCredential = {
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            displayName: user.displayName,
          };
          dispatch(authActions.signInUser(userCredential));
          toast.success(t('login_form.sign_in_success'));
          setSubmitting(false);
          navigate('/');
        } catch (error) {
          console.log('ERROR: ', error);
          const errorLocaleText = getLocaleText(error.code);
          setErrors({ auth: t(`login_form.auth.${errorLocaleText}`) });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='w-full' name='loginForm'>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='email' className='mb-2 font-medium'>
              {t('login_form.email_or_username')}
            </label>
            <TextInput name='email' type='email' id='email' />
          </div>
          <div className='w-full flex flex-col mb-4'>
            <label
              htmlFor='password'
              className='mb-2 font-medium'
              data-testid='password'
            >
              {t('login_form.password')}
            </label>
            <TextInput name='password' type='password' id='password' />
          </div>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center justify-between'>
              <Field type='checkbox' name='rememberMe' id='rememberMe' />{' '}
              <label htmlFor='rememberMe' className='ml-2'>
                {t('login_form.remember_me')}
              </label>
            </div>
            <div
              className='text-sm italic hover:text-second hover:cursor-pointer'
              onClick={() => navigate('/users/password/new')}
            >
              {t('login_form.forgot_password')}
            </div>
          </div>
          {errors.auth && (
            <div className='text-red-500 text-xs'>{errors.auth}</div>
          )}
          {errors.activation && (
            <div className='text-red-500 text-xs'>{errors.activation}</div>
          )}
          <button
            type='submit'
            disabled={!isValid || !dirty || isSubmitting}
            className='w-full bg-main disabled:bg-gray-300 text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'
          >
            {t('login_form.sign_in')}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
