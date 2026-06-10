import { useState, useEffect } from 'react';
import { getWeatherGreeting } from '../api/client';
import './WeatherWidget.css';

export default function WeatherWidget() {
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchWeather() {
    setLoading(true);
    setError(false);
    try {
      const res = await getWeatherGreeting();
      setGreeting(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-widget glass-card">
      <span className="weather-icon">☀️</span>
      {greeting ? (
        <span className="weather-text">{greeting}</span>
      ) : (
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={fetchWeather} 
          disabled={loading}
          style={{ marginLeft: 8 }}
        >
          {loading ? 'Loading...' : 'Get Local Weather'}
        </button>
      )}
      {error && <span style={{ marginLeft: 12, color: 'var(--danger-color)', fontSize: '0.85rem' }}>Failed to load</span>}
    </div>
  );
}
