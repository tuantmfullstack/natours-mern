import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home/Home.js';
import Login from './components/Login/Login.js';
import Me from './components/Me/Me.js';
import NotFound from './components/NotFound/NotFound.js';
import Signup from './components/Signup/Signup.js';
import Tour from './components/Tour/Tour.js';
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js';
import { loginSelector } from './redux/selector.js';
import ResetPassword from './components/ResetPassword/ResetPassword.js';
import Admin from './components/Admin/Admin.js';

const App = () => {
  const isLogin = useSelector(loginSelector);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours/:slug' element={<Tour />} />
          <Route
            path='/login'
            element={!isLogin ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/signup'
            element={!isLogin ? <Signup /> : <Navigate to='/' />}
          />
          <Route path='/me' element={isLogin ? <Me /> : <Navigate to='/' />} />
          <Route
            path='/forgotPassword'
            element={!isLogin ? <ForgotPassword /> : <Navigate to='/' />}
          />
          <Route
            path='/resetPassword'
            element={!isLogin ? <ResetPassword /> : <Navigate to='/' />}
          />
          <Route
            path='/admin'
            element={isLogin ? <Admin /> : <Navigate to='/login' />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
