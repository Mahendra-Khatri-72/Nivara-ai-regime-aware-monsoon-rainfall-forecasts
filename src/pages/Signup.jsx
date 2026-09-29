import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, phone: numericValue });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!\%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, & 1 special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreeTerms) {
      newErrors.terms = "Please agree to the Terms & Conditions.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    alert("Validation Successful! Data ready for API.");
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '1.5rem', minHeight: '100vh', backgroundColor: '#f8f9fc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1rem', padding: 0, display: 'flex' }}>
          <ChevronLeft size={24} color="#1e1b4b" />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>Create Account</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Full Name */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem 1rem', background: '#f8fafc' }}>
              <User size={20} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0f172a' }} />
            </div>
          </div>

          {/* Email */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem 1rem', background: '#f8fafc' }}>
              <Mail size={20} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0f172a' }} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.phone ? '#ef4444' : '#e2e8f0'}`, borderRadius: '12px', padding: '0.75rem 1rem', background: '#f8fafc' }}>
              <Phone size={20} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required maxLength="10" style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0f172a' }} />
            </div>
            {errors.phone && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}>{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.password ? '#ef4444' : '#e2e8f0'}`, borderRadius: '12px', padding: '0.75rem 1rem', background: '#f8fafc' }}>
              <Lock size={20} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0f172a' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
              </button>
            </div>
            {errors.password && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}>{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${errors.confirmPassword ? '#ef4444' : '#e2e8f0'}`, borderRadius: '12px', padding: '0.75rem 1rem', background: '#f8fafc' }}>
              <Lock size={20} color="#64748b" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0f172a' }} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                {showConfirmPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
              </button>
            </div>
            {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '0.25rem' }}>{errors.confirmPassword}</p>}
          </div>

          {/* Terms Checkbox */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.25rem' }}>
              <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#1e1b4b', cursor: 'pointer', marginTop: '2px' }} />
              <label htmlFor="terms" style={{ fontSize: '0.75rem', color: '#334155', fontWeight: 500, cursor: 'pointer', lineHeight: '1.4' }}>
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>
            {errors.terms && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '1.25rem' }}>{errors.terms}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" style={{ width: '100%', backgroundColor: '#1e1b4b', color: 'white', padding: '0.9rem', borderRadius: '12px', border: 'none', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(30, 27, 75, 0.2)' }}>
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#475569' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1e1b4b', fontWeight: 700, textDecoration: 'none' }}>
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}