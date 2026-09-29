import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, Bell, MapPin, ChevronDown, 
  CloudRain, AlertTriangle, Wind, 
  Map, Activity, Grid
} from 'lucide-react';
import { getDashboardData } from '../services/api';
import Loading from '../components/Loading';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Real app state management
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component load hote hi backend API call
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getDashboardData();
        setData(result);
      } catch (err) {
        setError("Failed to connect to the server. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty array means runs only once on mount

  // 1. Agar data aa raha hai toh Loading dikhao
  if (isLoading) return <Loading />;

  // 2. Agar API fail ho jaye toh Error dikhao
  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>
        <AlertTriangle size={40} style={{ margin: '0 auto 1rem auto' }} />
        <p>{error}</p>
        <button className="action-btn" onClick={() => window.location.reload()} style={{ marginTop: '1rem', background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>Retry</button>
      </div>
    );
  }

  // 3. Data aane ke baad real UI render karo
  return (
    <div>
      <header className="app-header">
        <Menu size={24} color="#374151" />
        <div className="header-title">
          <h2>Nivara</h2>
          <p>Regime-Aware Rainfall Intelligence</p>
        </div>
        <Bell size={24} color="#374151" />
      </header>

      {/* Location Card (Dynamic Data) */}
      <div className="card" style={{ padding: '1rem 1.25rem' }}>
        <div className="flex-row justify-between" style={{ alignItems: 'center' }}>
          <div className="flex-row gap-2">
            <MapPin size={20} color="#374151" />
            <div>
              <div className="font-semibold" style={{ fontSize: '0.95rem' }}>{data.location}</div>
              <div className="text-xs text-muted" style={{ marginTop: '2px' }}>
                {data.date} • {data.forecastDuration}
              </div>
            </div>
          </div>
          <ChevronDown size={20} color="var(--text-secondary)" />
        </div>
      </div>

      <div className="grid-2-col">
        {/* Corrected Rainfall Card (Dynamic) */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="flex-row gap-2 text-xs font-semibold mb-3" style={{ color: '#0369a1' }}>
            <CloudRain size={18} color="#0ea5e9" />
            Corrected Rainfall
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.25rem', color: '#111827' }}>
            {data.correctedRainfall} <span style={{ fontSize: '1rem', fontWeight: 500 }}>mm</span>
          </h2>
          <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}>
            ↑ {data.rainfallDiff} mm vs NWP
          </span>
        </div>

        {/* Heavy Rainfall Risk Card (Dynamic) */}
        <div className="card" style={{ marginBottom: 0, border: '1px solid #fecaca' }}>
          <div className="flex-row gap-2 text-xs font-semibold mb-3" style={{ color: '#b91c1c' }}>
            <AlertTriangle size={18} color="var(--danger)" />
            Heavy Rainfall Risk
          </div>
          <h2 style={{ fontSize: '2.25rem', marginBottom: '0.25rem', color: '#111827' }}>
            {data.heavyRainRisk}%
          </h2>
          <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)' }}></div>
            <span style={{ color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 600 }}>
              {data.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Weather Regime Card (Dynamic) */}
      <div className="card">
        <div className="flex-row gap-3 mb-4">
          <Wind size={28} color="#0ea5e9" />
          <div>
            <div className="text-xs font-semibold" style={{ color: '#0369a1' }}>
              Detected Weather Regime
            </div>
            <div className="font-bold" style={{ fontSize: '1.2rem', color: '#111827', marginTop: '2px' }}>
              {data.regime}
            </div>
          </div>
        </div>
        <div className="flex-row justify-between text-xs font-medium text-muted mb-2">
          <span>Confidence</span>
          <span>{data.confidence}%</span>
        </div>
        <div className="progress-bg" style={{ background: '#e2e8f0', height: '8px' }}>
          <div className="progress-fill" style={{ width: `${data.confidence}%`, background: 'var(--primary)', transition: 'width 1s ease-out' }}></div>
        </div>
      </div>

      <div className="grid-4-col">
        <button className="action-btn" onClick={() => navigate('/map')}>
          <div className="action-icon-box"><Map size={24} color="#0ea5e9" /></div>
          <span className="action-label">Map</span>
        </button>
        <button className="action-btn" onClick={() => navigate('/forecast')}>
          <div className="action-icon-box"><CloudRain size={24} color="#8b5cf6" /></div>
          <span className="action-label">Forecast</span>
        </button>
        <button className="action-btn" onClick={() => navigate('/analysis')}>
          <div className="action-icon-box"><Activity size={24} color="#f59e0b" /></div>
          <span className="action-label">Regime</span>
        </button>
        <button className="action-btn">
          <div className="action-icon-box"><Grid size={24} color="var(--text-secondary)" /></div>
          <span className="action-label">More</span>
        </button>
      </div>

    </div>
  );
}