import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function isActive(path) {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">📝</span>
          <span className="navbar-title">DayScript</span>
        </Link>

        <div className="navbar-links hide-mobile">
          <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/new" className={`nav-link ${isActive('/new') ? 'active' : ''}`}>
            New Entry
          </Link>
          <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
            Profile
          </Link>
          {isAdmin && (
            <Link to="/admin" className={`nav-link nav-link-admin ${isActive('/admin') ? 'active' : ''}`}>
              ⚙️ Admin
            </Link>
          )}
        </div>

        <div className="navbar-right">
          <span className="navbar-user hide-mobile">
            {user?.username || 'User'}
          </span>
          <button className="btn btn-ghost navbar-logout" onClick={handleLogout}>
            Logout
          </button>

          {/* Mobile hamburger */}
          <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu animate-in">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>📓 Dashboard</Link>
          <Link to="/new" className="mobile-link" onClick={() => setMenuOpen(false)}>✏️ New Entry</Link>
          <Link to="/profile" className="mobile-link" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
          {isAdmin && (
            <Link to="/admin" className="mobile-link" onClick={() => setMenuOpen(false)}>⚙️ Admin</Link>
          )}
          <button className="mobile-link mobile-logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
}
