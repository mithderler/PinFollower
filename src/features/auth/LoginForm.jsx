import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { authActions } from './authReducer';
import TextInput from '../../app/common/form/TextInput';
import { signInWithEmail } from '../../app/firebase/firebaseService';
import { toast } from 'react-toastify';

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
          const { user } = await signInWithEmail(values);
          if (!user.emailVerified) {
            setErrors({
              activation: t('login_form.activate_your_account'),
            });
            setSubmitting(false);
            return;
          }
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
          setErrors({ auth: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='w-full'>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='email' className='mb-2 font-medium'>
              {t('login_form.email_or_username')}
            </label>
            <TextInput name='email' type='email' />
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
