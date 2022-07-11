import { FaFacebookF } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { setUserDataForSignIn } from './authReducer';
import { signInWithProvider } from '../../app/firebase/firebaseService';

function SocialLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const letUserToSignIn = async (provider) => {
    const credential = await signInWithProvider(provider);
    if (credential) {
      dispatch(setUserDataForSignIn(credential.user));
      toast.success(t('login_form.sign_in_success'));
      navigate('/');
    }
  };

  const signInWithGoogle = () => {
    letUserToSignIn(GoogleAuthProvider);
  };

  const signInWithFacebook = () => {
    letUserToSignIn(FacebookAuthProvider);
  };

  return (
    <div className='mt-8'>
      <button
        className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-md bg-google border-gray-300  flex items-center w-full h-11 mb-3'
        onClick={signInWithGoogle}
      >
        <FaGoogle className='text-white' />
        <p className='w-4/5 text-center text-white ml-4'>
          {t('social_login.google')}
        </p>
      </button>
      <button
        className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-md bg-facebook border-gray-300  flex items-center w-full h-11 mb-3'
        onClick={signInWithFacebook}
      >
        <FaFacebookF className='text-white' />

        <p className='w-4/5 text-center text-white ml-4'>
          {t('social_login.facebook')}
        </p>
      </button>
    </div>
  );
}

export default SocialLogin;
