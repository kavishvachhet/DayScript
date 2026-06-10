import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJournalEntries, deleteJournalEntry } from '../api/client';
import { useAuth } from '../context/AuthContext';
import JournalCard from '../components/JournalCard';
import WeatherWidget from '../components/WeatherWidget';
import Modal from '../components/Modal';
import './DashboardPage.css';

export default function DashboardPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    setLoading(true);
    setError('');
    try {
      const res = await getJournalEntries();
      setEntries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.status === 404) {
        setEntries([]);
      } else {
        setError('Failed to load journal entries');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(entry) {
    navigate(`/edit/${entry.id}`);
  }

  function handleDeleteClick(entry) {
    setDeleteTarget(entry);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteJournalEntry(deleteTarget.id);
      setEntries(prev => prev.filter(e => e.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setError('Failed to delete entry');
    } finally {
      setDeleting(false);
    }
  }

  // Sentiment stats
  const sentimentCounts = entries.reduce((acc, e) => {
    if (e.sentiment) {
      acc[e.sentiment] = (acc[e.sentiment] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="page-container">
      <div className="dashboard-top">
        <div className="page-header">
          <h1>Welcome back, {user?.username || 'Writer'} 👋</h1>
          <p>Here's your journal at a glance</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/new')}>
          ✏️ New Entry
        </button>
      </div>

      <WeatherWidget />

      {/* Stats bar */}
      {entries.length > 0 && (
        <div className="dashboard-stats animate-in">
          <div className="stat-card glass-card">
            <span className="stat-value">{entries.length}</span>
            <span className="stat-label">Total Entries</span>
          </div>
          {Object.entries(sentimentCounts).map(([sentiment, count]) => (
            <div key={sentiment} className={`stat-card glass-card stat-${sentiment.toLowerCase()}`}>
              <span className="stat-value">{count}</span>
              <span className="stat-label">{sentiment}</span>
            </div>
          ))}
        </div>
      )}

      {error && <div className="alert alert-error" style={{ marginTop: 16 }}>⚠️ {error}</div>}

      {/* Loading skeleton */}
      {loading && (
        <div className="dashboard-grid" style={{ marginTop: 24 }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card" style={{ padding: 24 }}>
              <div className="skeleton" style={{ height: 20, width: '40%', marginBottom: 12 }}></div>
              <div className="skeleton" style={{ height: 16, width: '80%', marginBottom: 8 }}></div>
              <div className="skeleton" style={{ height: 16, width: '60%', marginBottom: 16 }}></div>
              <div className="skeleton" style={{ height: 40, width: '100%' }}></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && entries.length === 0 && (
        <div className="empty-state animate-slide">
          <div className="empty-icon">📓</div>
          <h3>No journal entries yet</h3>
          <p>Start documenting your thoughts and tracking your emotions. Your first entry is just a click away.</p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/new')}>
            ✏️ Write your first entry
          </button>
        </div>
      )}

      {/* Journal grid */}
      {!loading && entries.length > 0 && (
        <div className="dashboard-grid stagger" style={{ marginTop: 24 }}>
          {entries.map(entry => (
            <JournalCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Entry"
        size="sm"
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
          Are you sure you want to delete <strong>"{deleteTarget?.title || 'this entry'}"</strong>?
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
          <button className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? <span className="spinner"></span> : null}
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
