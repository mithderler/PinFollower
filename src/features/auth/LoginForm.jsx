function LoginForm() {
  return (
    <form className='w-full'>
      <div className='w-full flex flex-col mb-4'>
        <label htmlFor='email' className='mb-2 font-medium'>
          E-posta ya da Kullanıcı adı
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
          Parola
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
          <input id='remember-me' type='checkbox' />{' '}
          <label htmlFor='remember-me'>Beni hatırla</label>
        </div>
        <div>Parolanı mı unuttun?</div>
      </div>
      <button className='w-full bg-main text-white font-bold hover:bg-second transition ease-in delay-100 rounded-full py-3.5 px-8 my-4'>
        Giriş Yap
      </button>
    </form>
  );
}

export default LoginForm;
