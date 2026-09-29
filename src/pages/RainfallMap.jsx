import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, Crosshair, ChevronRight, MapPin, AlertTriangle } from 'lucide-react';
import { getMapData } from '../services/api';
import Loading from '../components/Loading';

export default function RainfallMap() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('India');
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getMapData();
        setData(result);
      } catch (err) {
        setError("Failed to load map data.");
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <header className="app-header" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ChevronLeft size={24} color="#111827" />
        </button>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Rainfall Map</h2>
      </header>

      {/* Segmented Control */}
      <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '50px', padding: '4px', marginBottom: '1rem' }}>
        {['India', 'Districts'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1, textAlign: 'center', padding: '0.6rem', borderRadius: '50px',
              background: activeTab === tab ? 'var(--primary-dark)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Map Container Area */}
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        borderRadius: '16px', 
        backgroundColor: '#e6f2f5', 
        overflow: 'hidden',
        minHeight: '400px',
        marginBottom: '1rem',
        // Agar aapke paas actual map image hai toh yahan URL daal sakte hain
         backgroundImage: `url('/src/assets/india-map.png')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        border: '1px solid var(--border)'
      }}>
        
        {/* Placeholder Graphic (Agar image na ho toh) */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.1 }}>
           <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#0369a1' }}>Map UI Area</span>
        </div>

        {/* Map Controls (Top Right) */}
        <div style={{ 
          position: 'absolute', right: '12px', top: '12px', 
          display: 'flex', flexDirection: 'column', 
          background: 'white', borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden'
        }}>
          <button style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}><Plus size={20} color="#374151" /></button>
          <button style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}><Minus size={20} color="#374151" /></button>
          <button style={{ padding: '8px', border: 'none', background: 'transparent', cursor: 'pointer' }}><Crosshair size={20} color="#374151" /></button>
        </div>

        {/* Map Marker & Tooltip (Centered roughly for Bhopal) */}
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Tooltip */}
          <div style={{ background: 'white', padding: '0.5rem 0.75rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center', marginBottom: '8px', position: 'relative' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#111827' }}>{data.location}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>{data.currentRainfall}</div>
            {/* Tooltip Arrow */}
            <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '8px', height: '8px', background: 'white' }}></div>
          </div>
          {/* Marker */}
          <div style={{ background: '#111827', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid white', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></div>
          </div>
        </div>

        {/* Legend (Bottom Right) */}
        <div style={{ 
          position: 'absolute', right: '12px', bottom: '12px', 
          background: 'white', padding: '0.75rem', 
          borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          fontSize: '0.75rem', fontWeight: 500, color: '#374151'
        }}>
          <div className="flex-row gap-2"><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#a3e635' }}></div> &lt; 20 mm</div>
          <div className="flex-row gap-2"><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24' }}></div> 20 - 50 mm</div>
          <div className="flex-row gap-2"><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f97316' }}></div> 50 - 100 mm</div>
          <div className="flex-row gap-2"><div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div> &gt; 100 mm</div>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div className="flex-row justify-between" style={{ marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>{data.location}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{data.state}</span>
          </div>
          <ChevronRight size={20} color="#9ca3af" />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Raw NWP</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{data.rawNwp}</div>
          </div>
          <div style={{ borderLeft: '1px solid #f3f4f6', paddingLeft: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Corrected</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{data.corrected}</div>
          </div>
          <div style={{ borderLeft: '1px solid #f3f4f6', paddingLeft: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Heavy Rain</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>{data.heavyRainRisk}</div>
          </div>
        </div>
      </div>
    </div>
  );
}