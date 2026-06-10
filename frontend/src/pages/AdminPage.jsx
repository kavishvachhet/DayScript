import { useState, useEffect } from 'react';
import { getAllUsers, createAdminUser, clearCache } from '../api/client';
import Modal from '../components/Modal';
import './AdminPage.css';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Create admin modal
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ username: '', password: '', email: '' });
  const [creating, setCreating] = useState(false);

  // Cache clearing
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError('');
    try {
      const res = await getAllUsers();
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.status === 404) {
        setUsers([]);
      } else {
        setError('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAdmin(e) {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      await createAdminUser(createForm);
      setSuccess('Admin user created successfully');
      setShowCreate(false);
      setCreateForm({ username: '', password: '', email: '' });
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  }

  async function handleClearCache() {
    setClearing(true);
    setError('');
    setSuccess('');
    try {
      const res = await clearCache();
      setSuccess(typeof res.data === 'string' ? res.data : 'Cache cleared successfully');
    } catch {
      setError('Failed to clear cache');
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="page-container">
      <div className="admin-wrapper animate-slide">
        <div className="admin-top">
          <div className="page-header">
            <h1>⚙️ Admin Panel</h1>
            <p>Manage users and system configuration</p>
          </div>
          <div className="admin-actions-top">
            <button className="btn btn-secondary" onClick={handleClearCache} disabled={clearing}>
              {clearing ? <span className="spinner"></span> : null}
              {clearing ? 'Clearing...' : '🔄 Clear Cache'}
            </button>
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              👑 Create Admin
            </button>
          </div>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>⚠️ {error}</div>}
        {success && <div className="alert alert-success" style={{ marginBottom: 16 }}>✅ {success}</div>}

        {/* Users table */}
        <div className="glass-card admin-table-card">
          <div className="admin-table-header">
            <h3>All Users ({users.length})</h3>
          </div>

          {loading ? (
            <div className="admin-table-loading">
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton" style={{ height: 52, marginBottom: 4 }}></div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="admin-table-empty">
              <p>No users found</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th className="hide-mobile">Email</th>
                    <th>Roles</th>
                    <th className="hide-mobile">Sentiment</th>
                    <th className="hide-mobile">Entries</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id || idx} className="animate-in" style={{ animationDelay: `${idx * 40}ms` }}>
                      <td>
                        <div className="user-cell">
                          <span className="user-avatar-sm">{u.username?.[0]?.toUpperCase() || '?'}</span>
                          <span className="user-name">{u.username}</span>
                        </div>
                      </td>
                      <td className="hide-mobile">
                        <span className="user-email">{u.email || '—'}</span>
                      </td>
                      <td>
                        <div className="role-badges">
                          {u.roles?.map(role => (
                            <span key={role} className={`role-badge ${role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="hide-mobile">
                        <span className={`sa-badge ${u.sentimentAnalysis ? 'sa-on' : 'sa-off'}`}>
                          {u.sentimentAnalysis ? '✅ On' : '❌ Off'}
                        </span>
                      </td>
                      <td className="hide-mobile">
                        <span className="entry-count">{u.journalentries?.length || 0}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create admin modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Admin User"
        size="md"
      >
        <form onSubmit={handleCreateAdmin} className="admin-create-form">
          <div className="input-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              className="input-field"
              type="text"
              placeholder="Admin username"
              value={createForm.username}
              onChange={e => setCreateForm({ ...createForm, username: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="input-group">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              className="input-field"
              type="email"
              placeholder="admin@example.com"
              value={createForm.email}
              onChange={e => setCreateForm({ ...createForm, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className="input-field"
              type="password"
              placeholder="Create a strong password"
              value={createForm.password}
              onChange={e => setCreateForm({ ...createForm, password: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={creating}>
              {creating ? <span className="spinner"></span> : null}
              {creating ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
