import { useTranslation } from 'react-i18next';

function RegisterForm() {
  const { t } = useTranslation();
  return (
    <form className='w-full'>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='email' className='mb-2 font-medium'>
          {t('sign_up_form.email')}
        </label>
        <input
          id='email'
          type='email'
          aria-labelledby='email'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
      </div>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='email' className='mb-2 font-medium'>
          {t('sign_up_form.username')}
        </label>
        <input
          id='username'
          type='text'
          aria-labelledby='username'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
      </div>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='password' className='mb-2 font-medium'>
          {t('sign_up_form.password')}
        </label>
        <input
          id='password'
          type='password'
          aria-labelledby='password'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
        <p className='text-xs mt-1 text-gray-400'>
          {t('sign_up_form.min_6_chars')}
        </p>
      </div>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='password' className='mb-2 font-medium'>
          {t('sign_up_form.password_confirm')}
        </label>
        <input
          id='password2'
          type='password'
          aria-labelledby='password2'
          className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
        />
      </div>
      <button className='w-full bg-main text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'>
        {t('sign_up_form.register')}
      </button>
    </form>
  );
}

export default RegisterForm;
