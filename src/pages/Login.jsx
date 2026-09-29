import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Lock, EyeOff, Eye } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ padding: '1.5rem', height: '100vh', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', display: 'flex', width: 'fit-content' }}>
        <ChevronLeft size={28} color="#111827" />
      </button>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#111827', marginBottom: '0.25rem', textAlign: 'center' }}>Welcome Back</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '2.5rem' }}>Login to your account to continue</p>

      <div className="input-group">
        <Mail size={20} color="#64748b" />
        <input type="email" placeholder="Email Address" />
      </div>

      <div className="input-group">
        <Lock size={20} color="#64748b" />
        <input type={showPassword ? "text" : "password"} placeholder="Password" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          {showPassword ? <Eye size={20} color="#64748b" /> : <EyeOff size={20} color="#64748b" />}
        </button>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#1e1b4b', fontWeight: 700, cursor: 'pointer' }}>Forgot Password?</span>
      </div>

      <button className="auth-btn" onClick={() => navigate('/dashboard')}>
        Login
      </button>

      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#111827', fontWeight: 600 }}>
        Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#1e1b4b', cursor: 'pointer', fontWeight: 700 }}>Sign Up</span>
      </div>
    </div>
  );
}