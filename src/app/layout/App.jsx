import { Routes, Route } from 'react-router-dom';

import LoginPage from '../../features/auth/LoginPage';
import Navbar from '../../features/nav/Navbar';
import PinDashboard from '../../features/pins/pinDashboard/PinDashboard';
import RegisterPage from '../../features/auth/RegisterPage';

function App() {
  const authenticated = false;

  return (
    <>
      {authenticated && (
        <div className='bg-[#f8f8f8]'>
          <Navbar />
          <div className='container mx-auto max-w-[600px] px-4 pt-24'>
            <Routes>
              <Route path='/' element={<PinDashboard />} />
            </Routes>
          </div>
        </div>
      )}
      {!authenticated && (
        <Routes>
          <Route path='/users/sign_in' element={<LoginPage />} />
          <Route path='/users/sign_up' element={<RegisterPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
