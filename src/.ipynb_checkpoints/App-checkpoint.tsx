import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import EmpireHome from './pages/EmpireHome';
import LabelPage from './pages/LabelPage';
import EMPPage from './pages/MultimediaPage';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/ScrollToTop';
import { PlayerProvider } from './context/PlayerContext';

// Your new dashboard imports
import Login from './Login';
import Dashboard from './Dashboard';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  // If not logged in, bounce them back to the login page
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <PlayerProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes (Wrapped in MainLayout) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LabelPage />} />
            {/* <Route path="/label" element={<LabelPage />} /> */}
            <Route path="/multimedia" element={<EMPPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/home" element={<EmpireHome />} />
          </Route>

          {/* Separate Dashboard Routes (No MainLayout) */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard is now strictly guarded */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </PlayerProvider>
  );
}