import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../app/common/form/TextInput';
import { registerInFirebase } from '../../app/firebase/firebaseService';

function RegisterForm() {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required(t('form_validation.required'))
          .email(t('form_validation.invalid_email')),
        username: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.username_short')),
        password: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.password_short')),
        passwordConfirm: Yup.string()
          .required(t('form_validation.required'))
          .min(6, t('form_validation.password_short'))
          .oneOf(
            [Yup.ref('password'), null],
            t('form_validation.password_match')
          ),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          await registerInFirebase(values);
          setSubmitting(false);
        } catch (error) {
          console.log('ERRRRRRRR: ', error);
          setErrors({ auth: error.message });
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors }) => (
        <Form className='w-full'>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='email' className='mb-2 font-medium'>
              {t('sign_up_form.email')}
            </label>
            <TextInput name='email' type='email' />
          </div>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='email' className='mb-2 font-medium'>
              {t('sign_up_form.username')}
            </label>
            <TextInput name='username' type='text' />
          </div>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='password' className='mb-2 font-medium'>
              {t('sign_up_form.password')}
            </label>
            <TextInput name='password' type='password' />
            <p className='text-xs mt-1 text-gray-400'>
              {t('sign_up_form.min_6_chars')}
            </p>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <label htmlFor='password' className='mb-2 font-medium'>
              {t('sign_up_form.password_confirm')}
            </label>
            <TextInput name='passwordConfirm' type='password' />
          </div>
          {errors.auth && (
            <div className='text-red-500 text-xs'>{errors.auth}</div>
          )}
          <button
            type='submit'
            className='w-full bg-main disabled:bg-gray-300 text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'
            disabled={!isValid || !dirty || isSubmitting}
          >
            {t('sign_up_form.register')}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
