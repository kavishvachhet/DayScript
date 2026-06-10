import './SentimentBadge.css';

const SENTIMENT_CONFIG = {
  HAPPY: { emoji: '😊', label: 'Happy', className: 'sentiment-happy' },
  SAD: { emoji: '😢', label: 'Sad', className: 'sentiment-sad' },
  ANGRY: { emoji: '😠', label: 'Angry', className: 'sentiment-angry' },
  ANXIOUS: { emoji: '😰', label: 'Anxious', className: 'sentiment-anxious' },
};

export default function SentimentBadge({ sentiment, size = 'sm' }) {
  if (!sentiment) return null;

  const config = SENTIMENT_CONFIG[sentiment] || SENTIMENT_CONFIG.HAPPY;

  return (
    <span className={`sentiment-badge ${config.className} sentiment-${size}`}>
      <span className="sentiment-emoji">{config.emoji}</span>
      <span className="sentiment-label">{config.label}</span>
    </span>
  );
}

export { SENTIMENT_CONFIG };
