import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import LoginPage from '../../features/auth/LoginPage';
import PinDashboard from '../../features/pins/pinDashboard/PinDashboard';
import RegisterPage from '../../features/auth/RegisterPage';
import NewPinPage from '../../features/pins/newPin/NewPinPage';

function App() {
  return (
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
        <Route path='pins/new' element={<NewPinPage />} />
      </Routes>
    </>
  );
}

export default App;
