import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, register } from '../api/client';
import './LoginPage.css';

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // Login form
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Register form
  const [regForm, setRegForm] = useState({
    username: '', password: '', email: '', SentimentAnalysis: false,
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(loginForm.username, loginForm.password);
      loginUser(res.data, loginForm.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register(regForm);
      // Auto-login after register
      const res = await login(regForm.username, regForm.password);
      loginUser(res.data, regForm.username);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-orb login-bg-orb-1"></div>
      <div className="login-bg-orb login-bg-orb-2"></div>

      <div className="login-container animate-slide">
        <div className="login-header">
          <span className="login-logo">📝</span>
          <h1>DayScript</h1>
          <p>Journal your thoughts, track your emotions</p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
          >
            Sign In
          </button>
          <button
            className={`login-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                className="input-field"
                type="text"
                placeholder="Enter your username"
                value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                required
                autoFocus
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                className="input-field"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary btn-lg login-submit" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="login-form">
            <div className="input-group">
              <label htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                className="input-field"
                type="text"
                placeholder="Choose a username"
                value={regForm.username}
                onChange={e => setRegForm({ ...regForm, username: e.target.value })}
                required
                autoFocus
              />
            </div>
            <div className="input-group">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                className="input-field"
                type="email"
                placeholder="your@email.com"
                value={regForm.email}
                onChange={e => setRegForm({ ...regForm, email: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                className="input-field"
                type="password"
                placeholder="Create a password"
                value={regForm.password}
                onChange={e => setRegForm({ ...regForm, password: e.target.value })}
                required
              />
            </div>
            <div className="toggle-wrapper" onClick={() => setRegForm({ ...regForm, SentimentAnalysis: !regForm.SentimentAnalysis })}>
              <div className={`toggle-track ${regForm.SentimentAnalysis ? 'active' : ''}`}>
                <div className="toggle-thumb"></div>
              </div>
              <span className="toggle-label">Enable weekly sentiment email reports</span>
            </div>
            <button className="btn btn-primary btn-lg login-submit" type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : null}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
