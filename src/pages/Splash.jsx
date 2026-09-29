import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5rem 2rem 3rem 2rem',
      background: 'linear-gradient(to bottom, #032535 0%, #04384d 50%, #021a24 100%)',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="#062e3d" stroke="#00d29b" strokeWidth="2" opacity="0.95" />
            <path d="M42 64C35.3726 64 30 58.6274 30 52C30 45.7199 34.8213 40.5694 41 40.063C43.1932 32.8427 49.9575 28 58 28C67.9411 28 76 36.0589 76 46C76 46.4259 75.9852 46.8483 75.9562 47.2662C81.6023 48.7495 85.5 53.9482 85.5 60C85.5 67.1797 79.6797 73 72.5 73H58" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 72L42 80" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M55 76L52 84" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M65 72L62 80" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            <path d="M84 57C84 57 88 52 92 56C96 60 92 68 92 68C92 68 88 72 84 68C80 64 84 57 84 57Z" fill="#00d29b"/>
          </svg>
        </div>

        <h1 style={{ fontSize: '3.8rem', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '1.25rem' }}>Nivara</h1>
        <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.95)', maxWidth: '320px', margin: '0 auto' }}>
          Regime-Aware AI Post-Processing<br/>of Monsoon Rainfall Forecasts
        </p>

        <div style={{ marginTop: '3.5rem' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6' }}>
            Smarter Predictions.<br/>Safer Tomorrows.
          </p>
        </div>
      </div>

      <button 
        onClick={() => navigate('/signup')}
        style={{ 
          width: '85%', maxWidth: '320px', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 600,
          borderRadius: '50px', border: 'none', color: 'white', background: '#00d29b',
          boxShadow: '0 8px 20px rgba(0, 210, 155, 0.4)', cursor: 'pointer',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'
        }}
      >
        Get Started <ArrowRight size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
}