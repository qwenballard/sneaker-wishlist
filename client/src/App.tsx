import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SneakerDashboard from './pages/SneakerDashboard';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      {/* so we can trigger toast notification from other pages/components */}
      <Toaster />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <SneakerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
