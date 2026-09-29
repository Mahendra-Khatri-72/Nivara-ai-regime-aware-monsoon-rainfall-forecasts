import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import RainfallMap from './pages/RainfallMap';
import RegimeAnalysis from './pages/RegimeAnalysis';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Splash />} />
        <Route path="signup" element={<Signup />} /> {/* Yahan theek kar diya gaya hai */}
        <Route path="login" element={<Login />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="map" element={<RainfallMap />} />
        <Route path="analysis" element={<RegimeAnalysis />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;