import { Routes, Route } from 'react-router-dom';

import LoginPage from '../../features/auth/LoginPage';
import Navbar from '../../features/nav/Navbar';
import PinDashboard from '../../features/pins/pinDashboard/PinDashboard';
import RegisterPage from '../../features/auth/RegisterPage';
import { useSelector } from 'react-redux';

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <>
      <Routes>
        <Route path='/' element={<PinDashboard />} />
        <Route path='users/sign_in' element={<LoginPage />} />
        <Route path='users/sign_up' element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
