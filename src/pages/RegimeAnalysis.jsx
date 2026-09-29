import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Key, TrendingDown, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAnalysisData } from '../services/api';
import Loading from '../components/Loading';

export default function RegimeAnalysis() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Insights');
  
  // Real app states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getAnalysisData();
        setData(result);
      } catch (err) {
        setError("Failed to load analysis data.");
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
          <ChevronLeft size={24} color="#374151" />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Analysis</h2>
      </header>

      {/* Segmented Tabs */}
      <div className="flex-row mb-4" style={{ background: 'var(--surface)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border)' }}>
        {['Insights', 'Data', 'Model'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, textAlign: 'center', padding: '0.6rem', borderRadius: '8px',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Key Insights Card */}
      <div className="card mb-4">
        <div className="flex-row gap-2 mb-3 font-semibold" style={{ color: '#111827' }}>
          <Key size={18} color="var(--primary)" /> Key Insights
        </div>
        <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {data.insights.map((insight, idx) => (
            <li key={idx} style={{ lineHeight: '1.4' }}>{insight}</li>
          ))}
        </ul>
      </div>

      {/* Model Performance Card */}
      <div className="card mb-4">
        <div className="flex-row gap-2 mb-4 font-semibold" style={{ color: '#111827' }}>
          <Activity size={18} color="#8b5cf6" /> Model Performance
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div>
            <div className="text-xs text-muted mb-1">MAE (mm)</div>
            <div className="font-bold mb-1" style={{ fontSize: '1.25rem', color: '#111827' }}>{data.metrics.mae}</div>
            <div className="text-xs" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 500 }}>
              <TrendingDown size={14} /> {data.metrics.maeImprovement}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">RMSE (mm)</div>
            <div className="font-bold mb-1" style={{ fontSize: '1.25rem', color: '#111827' }}>{data.metrics.rmse}</div>
            <div className="text-xs" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 500 }}>
              <TrendingDown size={14} /> {data.metrics.rmseImprovement}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">R² Score</div>
            <div className="font-bold mb-1" style={{ fontSize: '1.25rem', color: '#111827' }}>{data.metrics.r2}</div>
            <div className="text-xs" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 500 }}>
              <TrendingUp size={14} /> {data.metrics.r2Improvement}
            </div>
          </div>
        </div>
      </div>

      {/* Historical Comparison Bar Chart */}
      <div className="card">
        <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#111827' }}>Historical Comparison</h3>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={data.historicalData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', marginTop: '10px' }} />
              <Bar dataKey="raw" name="Raw NWP" fill="#94a3b8" barSize={12} radius={[4, 4, 0, 0]} />
              <Bar dataKey="corrected" name="AI Corrected" fill="var(--primary)" barSize={12} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}