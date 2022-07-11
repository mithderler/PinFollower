import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Spinner from '../common/spinner/Spinner';

const EditPinPage = React.lazy(() =>
  import('../../features/pins/newPin/EditPinPage')
);

const NewPinPage = React.lazy(() =>
  import('../../features/pins/newPin/NewPinPage')
);
const RegisterPage = React.lazy(() =>
  import('../../features/auth/RegisterPage')
);
const ForgotPasswordPage = React.lazy(() =>
  import('../../features/auth/ForgotPasswordPage')
);
const LoginPage = React.lazy(() => import('../../features/auth/LoginPage'));
const PinDashboard = React.lazy(() =>
  import('../../features/pins/pinDashboard/PinDashboard')
);
const ProfilePage = React.lazy(() =>
  import('../../features/profiles/ProfilePage')
);
const EditProfilePage = React.lazy(() =>
  import('../../features/profiles/EditProfilePage')
);
const About = React.lazy(() => import('../../features/pages/About'));
const PrivacyPolicy = React.lazy(() =>
  import('../../features/pages/policies/PrivacyPolicy')
);
const TermsOfUse = React.lazy(() =>
  import('../../features/pages/policies/TermsOfUse')
);
const CookiePolicy = React.lazy(() =>
  import('../../features/pages/policies/CookiePolicy')
);

function App() {
  const { initialized } = useSelector((state) => state.async);

  return (
    <Suspense fallback={<Spinner />}>
      {initialized && (
        <>
          <ToastContainer
            position='bottom-right'
            hideProgressBar
            autoClose={3000}
          />
          <Routes>
            <Route path='/' element={<PinDashboard />} />
            <Route path='users/sign_in' element={<LoginPage />} />
            <Route path='users/sign_up' element={<RegisterPage />} />
            <Route path='users/password/new' element={<ForgotPasswordPage />} />
            <Route path='profiles/:userId' element={<ProfilePage />} />
            <Route path='settings/profile' element={<EditProfilePage />} />
            <Route path='pins/new' element={<NewPinPage />} />
            {/* <Route path='pins/:pinId' element={<PinPage />} /> */}
            <Route path='pins/:pinId/edit' element={<EditPinPage />} />
            <Route path='about' element={<About />} />
            <Route path='privacy_policy' element={<PrivacyPolicy />} />
            <Route path='terms_of_use' element={<TermsOfUse />} />
            <Route path='cookie_policy' element={<CookiePolicy />} />
          </Routes>
        </>
      )}
    </Suspense>
  );
}

export default App;
