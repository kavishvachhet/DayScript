import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser, deleteUser } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user, logout, updateUserContext } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: user?.username || '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {};
      if (form.username) payload.username = form.username;
      if (form.password) payload.password = form.password;
      await updateUser(payload);
      updateUserContext({ username: form.username });
      setSuccess('Profile updated successfully');
      setForm({ ...form, password: '' });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteUser();
      logout();
      navigate('/login');
    } catch {
      setError('Failed to delete account');
      setDeleting(false);
    }
  }

  return (
    <div className="page-container">
      <div className="profile-wrapper animate-slide">
        <div className="page-header">
          <h1>👤 Profile</h1>
          <p>Manage your account settings</p>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>⚠️ {error}</div>}
        {success && <div className="alert alert-success" style={{ marginBottom: 20 }}>✅ {success}</div>}

        {/* Profile info card */}
        <div className="glass-card profile-card">
          <div className="profile-avatar">
            <span className="avatar-letter">{user?.username?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <div className="profile-info">
            <h2>{user?.username}</h2>
            <span className="profile-role-badge">
              {user?.roles?.includes('ADMIN') ? '👑 Admin' : '👤 User'}
            </span>
          </div>
        </div>

        {/* Update credentials */}
        <form onSubmit={handleUpdate} className="glass-card profile-form">
          <h3>Update Credentials</h3>
          <div className="input-group">
            <label htmlFor="profile-username">Username</label>
            <input
              id="profile-username"
              className="input-field"
              type="text"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              placeholder="New username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="profile-password">New Password</label>
            <input
              id="profile-password"
              className="input-field"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Enter new password"
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : null}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        {/* Danger zone */}
        <div className="glass-card danger-zone">
          <div className="danger-zone-info">
            <h3>⚠️ Danger Zone</h3>
            <p>Permanently delete your account and all journal entries. This cannot be undone.</p>
          </div>
          <button className="btn btn-danger" onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete account modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        size="sm"
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          Are you absolutely sure? This will permanently delete your account and all associated journal entries.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? <span className="spinner"></span> : null}
            {deleting ? 'Deleting...' : 'Yes, delete my account'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
