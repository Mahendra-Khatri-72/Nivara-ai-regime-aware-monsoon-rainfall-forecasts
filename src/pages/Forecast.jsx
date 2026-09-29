import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Clock, CloudRain, Droplet, Lightbulb, ChevronDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getForecastData } from '../services/api';
import Loading from '../components/Loading';

export default function Forecast() {
  const navigate = useNavigate();
  
  // States for API fetching
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getForecastData();
        setData(result);
      } catch (err) {
        setError("Failed to load forecast data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>
        <AlertTriangle size={40} style={{ margin: '0 auto 1rem auto' }} />
        <p>{error}</p>
        <button className="action-btn" onClick={() => window.location.reload()} style={{ marginTop: '1rem', background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="app-header" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#111827" />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Forecast</h2>
      </header>

      {/* Location Selector */}
      <div className="card flex-row justify-between" style={{ padding: '0.85rem 1rem', alignItems: 'center' }}>
        <div className="flex-row gap-2" style={{ color: '#111827', fontSize: '0.9rem', fontWeight: 600 }}>
          <MapPin size={18} color="#374151" /> Bhopal, Madhya Pradesh
        </div>
        <ChevronDown size={18} color="var(--text-secondary)" />
      </div>

      {/* Date & Time Selectors */}
      <div className="grid-2-col" style={{ gap: '0.75rem' }}>
        <div className="card flex-row justify-between" style={{ padding: '0.85rem 1rem', marginBottom: 0, alignItems: 'center' }}>
          <div className="flex-row gap-2" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
            <Calendar size={16} color="#374151" /> 30 Sep 2026
          </div>
          <ChevronDown size={16} color="var(--text-secondary)" />
        </div>
        <div className="card flex-row justify-between" style={{ padding: '0.85rem 1rem', marginBottom: 0, alignItems: 'center' }}>
          <div className="flex-row gap-2" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
            <Clock size={16} color="#374151" /> 24 Hours
          </div>
          <ChevronDown size={16} color="var(--text-secondary)" />
        </div>
      </div>

      {/* Weather Regime Card */}
      <div className="card" style={{ border: '1px solid #e5e7eb' }}>
        <div className="flex-row gap-3 mb-3">
          <div style={{ background: '#e0f2fe', padding: '0.5rem', borderRadius: '50%' }}>
            <CloudRain size={24} color="#0ea5e9" />
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: '#0369a1' }}>Weather Regime</div>
            <div className="font-bold" style={{ fontSize: '1.2rem', color: '#111827' }}>Active Monsoon</div>
          </div>
        </div>
        <div className="flex-row justify-between text-xs font-medium text-muted mb-2">
          <span>Confidence</span>
          <span>91%</span>
        </div>
        <div className="progress-bg" style={{ background: '#d1fae5', height: '8px' }}>
          <div className="progress-fill" style={{ width: `91%`, background: 'var(--primary)' }}></div>
        </div>
      </div>

      {/* Rainfall Forecast Stats */}
      <div className="card" style={{ paddingBottom: '0.5rem' }}>
        <div className="flex-row gap-2 mb-4" style={{ color: '#0369a1', fontWeight: 600 }}>
          <Droplet size={20} /> Rainfall Forecast
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.9rem' }}>
          <span style={{ color: '#475569', fontWeight: 500 }}>Raw NWP</span>
          <span style={{ color: '#111827', fontWeight: 600 }}>{data.rawNwp} mm</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.9rem' }}>
          <span style={{ color: '#475569', fontWeight: 500 }}>AI Corrected</span>
          <span style={{ color: '#111827', fontWeight: 600 }}>{data.aiCorrected} mm</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontSize: '0.9rem' }}>
          <span style={{ color: '#475569', fontWeight: 500 }}>Difference</span>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{data.difference} mm</span>
        </div>
      </div>

      {/* Info Box */}
      <div style={{ background: '#ecfdf5', border: '1px solid #d1fae5', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <Lightbulb size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.8rem', color: '#065f46', lineHeight: '1.5', fontWeight: 500 }}>
          AI adjusted the forecast based on detected weather regime and historical bias patterns.
        </p>
      </div>

      {/* Recharts Chart - Fixed Height added here */}
      <div className="card">
        <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#111827', fontWeight: 600 }}>Rainfall Trend (mm)</h3>
        {/* Parent container MUST have a fixed height for ResponsiveContainer to work */}
        <div style={{ width: '100%', height: '220px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} />
              
              <Line type="monotone" dataKey="raw" name="Raw NWP" stroke="#3b82f6" strokeWidth={2} dot={true} />
              <Line type="monotone" dataKey="corrected" name="AI Corrected" stroke="var(--primary)" strokeWidth={2} dot={true} />
              <Line type="monotone" dataKey="observed" name="Observed" stroke="#64748b" strokeDasharray="5 5" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}