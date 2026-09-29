import { CloudRain } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '60vh',
      gap: '1rem',
      color: 'var(--primary)'
    }}>
      <CloudRain size={48} className="animate-pulse" />
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
        Fetching intelligence...
      </p>
    </div>
  );
}