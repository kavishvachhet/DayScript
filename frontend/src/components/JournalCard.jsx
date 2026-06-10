import SentimentBadge from './SentimentBadge';
import './JournalCard.css';

export default function JournalCard({ entry, onEdit, onDelete }) {
  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : 'No date';

  return (
    <div className="journal-card glass-card">
      <div className="journal-card-header">
        <SentimentBadge sentiment={entry.sentiment} />
        <span className="journal-card-date">{formattedDate}</span>
      </div>

      <h3 className="journal-card-title">{entry.title || 'Untitled'}</h3>

      <p className="journal-card-content">
        {entry.content
          ? entry.content.length > 150
            ? entry.content.substring(0, 150) + '...'
            : entry.content
          : 'No content'}
      </p>

      <div className="journal-card-actions">
        <button className="btn btn-ghost" onClick={() => onEdit(entry)}>
          ✏️ Edit
        </button>
        <button className="btn btn-ghost journal-card-delete" onClick={() => onDelete(entry)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
