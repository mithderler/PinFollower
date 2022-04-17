import { useTranslation } from 'react-i18next';

function LoginForm() {
  const { t } = useTranslation();
  return (
    <form className='w-full'>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='email' className='mb-2 font-medium'>
          {t('login_form.email_or_username')}
        </label>
        <input
          id='email'
          type='email'
          aria-labelledby='email'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
      </div>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='password' className='mb-2 font-medium'>
          {t('login_form.password')}
        </label>
        <input
          id='password'
          type='password'
          aria-labelledby='password'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
      </div>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <input id='remember_me' type='checkbox' />{' '}
          <label htmlFor='remember_me'>{t('login_form.remember_me')}</label>
        </div>
        <div>{t('login_form.forgot_password')}</div>
      </div>
      <button className='w-full bg-main text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'>
        {t('login_form.sign_in')}
      </button>
    </form>
  );
}

export default LoginForm;
