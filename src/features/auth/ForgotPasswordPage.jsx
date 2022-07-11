import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  APP_TRADEMARK,
  CURRENT_YEAR,
} from '../../app/common/constants/AppConstants';
import TextInput from '../../app/common/form/TextInput';
import useDocTitle from '../../app/hooks/useDocTitle';
import { getLocaleText } from '../../app/common/utils/errorMatches';
import { sendPassResetEmail } from '../../app/firebase/firebaseService';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  useDocTitle(t('forgot_password_page.doc_title'));

  return (
    <div className='signBackground flex justify-center bg-white h-full md:p-4'>
      <div className='w-full md:max-w-xl mx-auto rounded'>
        <div className='bg-white h-full p-4 md:p-10 rounded'>
          <div className='text-3xl text-center text-main font-medium tracking-tighter py-6'>
            <Link to={'/'}>{APP_TRADEMARK}</Link>
          </div>
          <p className='text-center text-2xl mb-3'>
            {t('forgot_password_page.title')}
          </p>
          <hr className='my-6' />
          <div className='flex flex-col w-full px-8'>
            <p className='mb-4'>{t('forgot_password_page.description')}</p>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .required(t('form_validation.required'))
                  .email(t('form_validation.invalid_email')),
              })}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  setSubmitting(true);
                  await sendPassResetEmail(values);
                  setErrors({
                    auth: t(
                      `forgot_password_page.auth.wrong_email_or_password`
                    ),
                  });
                  setSubmitting(false);
                } catch (error) {
                  console.log(error);
                  const errorLocaleText = getLocaleText(error.code);
                  setErrors({
                    auth: t(`forgot_password_page.auth.${errorLocaleText}`),
                  });
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, isValid, dirty, errors }) => (
                <Form>
                  <div className='w-full flex flex-col mb-4'>
                    <label htmlFor='email' className='mb-2 font-medium'>
                      {t('forgot_password_page.email')}
                    </label>
                    <TextInput name='email' type='email' id='email' />
                  </div>
                  {errors.auth && (
                    <div className='text-red-500 text-xs'>{errors.auth}</div>
                  )}
                  <button
                    type='submit'
                    disabled={!isValid || !dirty || isSubmitting}
                    className='w-full bg-main disabled:bg-gray-300 text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'
                  >
                    {t('forgot_password_page.send_reset_link')}
                  </button>
                </Form>
              )}
            </Formik>

            <div className='flex items-center justify-center mt-2'>
              <span>{t('forgot_password_page.already_have_account')}</span>
              <span className='text-main font-semibold ml-2'>
                <Link to='/users/sign_in'>
                  {t('forgot_password_page.sign_in')}
                </Link>
              </span>
            </div>
            <div className='flex items-center justify-center mt-2'>
              <span>{t('forgot_password_page.dont_have_account')}</span>
              <span className='text-main font-semibold ml-2'>
                <Link to='/users/sign_up'>
                  {t('forgot_password_page.sign_up')}
                </Link>
              </span>
            </div>
            <div className='flex items-center justify-center text-gray-500 font-medium my-10'>
              <span>©</span>
              <span className='ml-1'>{CURRENT_YEAR}</span>
              <span className='ml-1'>{APP_TRADEMARK}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
