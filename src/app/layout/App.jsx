import Navbar from '../../features/nav/Navbar';
import PinDashboard from '../../features/pins/pinDashboard/PinDashboard';
import LoginPage from '../../features/auth/LoginPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  const authenticated = false;
  return (
    <>
      {authenticated && (
        <>
          <Navbar />
          <div className='container mx-auto max-w-[600px] px-4 pt-24'>
            <Routes>
              <Route path='/' element={<PinDashboard />} />
            </Routes>
          </div>
        </>
      )}
      {!authenticated && (
        <Routes>
          <Route path='/users/sign_in' element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
