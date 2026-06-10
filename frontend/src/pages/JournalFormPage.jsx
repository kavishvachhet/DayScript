import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createJournalEntry, getJournalEntry, updateJournalEntry } from '../api/client';
import { SENTIMENT_CONFIG } from '../components/SentimentBadge';
import './JournalFormPage.css';

export default function JournalFormPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', content: '', sentiment: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadEntry();
    }
  }, [id]);

  async function loadEntry() {
    setFetchLoading(true);
    try {
      const res = await getJournalEntry(id);
      const entry = res.data;
      setForm({
        title: entry.title || '',
        content: entry.content || '',
        sentiment: entry.sentiment || '',
      });
    } catch {
      setError('Failed to load entry');
    } finally {
      setFetchLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        content: form.content,
      };
      if (form.sentiment) {
        payload.sentiment = form.sentiment;
      }

      if (isEditing) {
        await updateJournalEntry(id, payload);
      } else {
        await createJournalEntry(payload);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to save entry');
    } finally {
      setLoading(false);
    }
  }

  if (fetchLoading) {
    return (
      <div className="page-container">
        <div className="page-loader"><div className="spinner spinner-lg"></div></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="journal-form-wrapper animate-slide">
        <div className="page-header">
          <h1>{isEditing ? '✏️ Edit Entry' : '📝 New Journal Entry'}</h1>
          <p>{isEditing ? 'Update your journal entry' : 'Write down your thoughts and tag your mood'}</p>
        </div>

        {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="journal-form glass-card">
          <div className="input-group">
            <label htmlFor="entry-title">Title</label>
            <input
              id="entry-title"
              className="input-field"
              type="text"
              placeholder="Give your entry a title..."
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="entry-content">Content</label>
            <textarea
              id="entry-content"
              className="input-field"
              placeholder="What's on your mind today?"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              rows={8}
            />
          </div>

          <div className="input-group">
            <label>How are you feeling?</label>
            <div className="sentiment-picker">
              {Object.entries(SENTIMENT_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  className={`sentiment-pill ${form.sentiment === key ? 'selected' : ''} ${config.className}`}
                  onClick={() => setForm({ ...form, sentiment: form.sentiment === key ? '' : key })}
                >
                  <span>{config.emoji}</span>
                  <span>{config.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="journal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? <span className="spinner"></span> : null}
              {loading ? 'Saving...' : isEditing ? 'Update Entry' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
