import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { authActions } from './authReducer';
import TextInput from '../../app/common/form/TextInput';

function LoginForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.username_short')),
        password: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.password_short')),
        rememberMe: Yup.boolean(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          console.log(values);
          dispatch(authActions.login());
          setSubmitting(false);
          // navigate('/');
        } catch (error) {
          setErrors({ auth: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='w-full'>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='username' className='mb-2 font-medium'>
              {t('login_form.email_or_username')}
            </label>
            <TextInput name='username' type='text' />
          </div>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='password' className='mb-2 font-medium'>
              {t('login_form.password')}
            </label>
            <TextInput name='password' type='password' />
          </div>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <Field type='checkbox' name='rememberMe' id='rememberMe' />{' '}
              <label htmlFor='rememberMe'>{t('login_form.remember_me')}</label>
            </div>
            <div>{t('login_form.forgot_password')}</div>
          </div>
          {errors.auth && (
            <div className='text-red-500 text-xs'>{errors.auth}</div>
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
