import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Activity, User } from 'lucide-react';

const NavLinks = () => (
  // ... (Apna purana NavLinks ka code waisa hi rakhein) ...
  <>
    <NavLink to="/dashboard" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Home size={24}/> <span>Home</span></NavLink>
    <NavLink to="/map" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><MapIcon size={24}/> <span>Map</span></NavLink>
    <NavLink to="/analysis" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><Activity size={24}/> <span>Analysis</span></NavLink>
    <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}><User size={24}/> <span>Profile</span></NavLink>
  </>
);

export default function Layout() {
  const location = useLocation();
  
  // NAYI LINE: In teeno screens pe Bottom Navigation hide ho jayega
  const hideNav = ['/', '/login', '/signup'].includes(location.pathname);

  if (hideNav) return <Outlet />;

  return (
    <div className="app-container">
      <div className="main-content"><div style={{ padding: '1rem', paddingBottom: '80px' }}><Outlet /></div></div>
      <div className="bottom-nav"><NavLinks /></div>
    </div>
  );
}