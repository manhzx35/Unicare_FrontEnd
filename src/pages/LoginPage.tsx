import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      const token = data.accessToken || data.token;
      loginState(token, {
        id: data.id,
        email: data.email,
        displayName: data.displayName,
        role: data.role,
        isAnonymous: data.isAnonymous,
      });
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        toast.error('MSG09: Email hoặc mật khẩu không đúng.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: '"Noto Sans", sans-serif' }}>

      {/* ── Left Panel: Form ── */}
      <div style={{
        flex: '0 0 480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem 3.5rem',
        backgroundColor: '#ffffff',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Back Link */}
        <Link 
          to="/" 
          style={{ 
            color: '#64748b', 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.875rem',
            fontWeight: 500
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#0891B2'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
        >
          <ArrowLeft size={16} /> Quay lại Trang chủ
        </Link>

        {/* Logo */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Heart icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            <span style={{ fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#0891B2' }}>
              UniCare
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Nền tảng sức khỏe tâm thần sinh viên</p>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: '"Figtree", sans-serif', fontWeight: 700,
            fontSize: '1.875rem', color: '#164E63', margin: '0 0 0.5rem',
          }}>
            Chào mừng trở lại
          </h1>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.9375rem' }}>
            Nhập thông tin tài khoản để tiếp tục
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Email */}
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>
              Email trường học
            </label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@domain.edu.vn"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '0.9375rem', color: '#1e293b', outline: 'none',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease',
                  fontFamily: '"Noto Sans", sans-serif',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>
                Mật khẩu
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                  border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  fontSize: '0.9375rem', color: '#1e293b', outline: 'none',
                  transition: 'border-color 200ms ease, box-shadow 200ms ease',
                  fontFamily: '"Noto Sans", sans-serif',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0' }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.875rem',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 200ms ease', letterSpacing: '0.01em',
              fontFamily: '"Figtree", sans-serif',
              boxShadow: loading ? 'none' : '0 4px 14px rgba(8,145,178,0.3)',
            }}
            onMouseEnter={(e) => { if (!loading) (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg style={{ animation: 'spin 1s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                </svg>
                Đang đăng nhập...
              </span>
            ) : 'Đăng nhập'}
          </button>
        </form>

        {/* Divider + register link */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Chưa có tài khoản?{' '}
            <Link
              to="/register"
              style={{ color: '#0891B2', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel: Illustration ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #ECFEFF 0%, #cffafe 30%, #d1fae5 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(8,145,178,0.12)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(5,150,105,0.1)', filter: 'blur(50px)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '420px', textAlign: 'center' }}>
          {/* Illustration SVG */}
          <div style={{ marginBottom: '2rem' }}>
            <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
              {/* Person sitting */}
              <circle cx="110" cy="50" r="32" fill="#0891B2" opacity="0.15"/>
              <circle cx="110" cy="44" r="20" fill="#0891B2" opacity="0.8"/>
              <rect x="85" y="66" width="50" height="55" rx="12" fill="#059669" opacity="0.7"/>
              <rect x="73" y="72" width="15" height="35" rx="7" fill="#059669" opacity="0.5"/>
              <rect x="132" y="72" width="15" height="35" rx="7" fill="#059669" opacity="0.5"/>
              <rect x="90" y="118" width="14" height="40" rx="7" fill="#0891B2" opacity="0.6"/>
              <rect x="116" y="118" width="14" height="40" rx="7" fill="#0891B2" opacity="0.6"/>
              {/* Floating heart */}
              <g transform="translate(60, 30) scale(0.6)">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="#0891B2" opacity="0.8"/>
              </g>
              {/* Floating circle decoration */}
              <circle cx="165" cy="60" r="8" fill="#059669" opacity="0.4"/>
              <circle cx="58" cy="100" r="5" fill="#0891B2" opacity="0.3"/>
              <circle cx="172" cy="120" r="12" fill="#22D3EE" opacity="0.25"/>
            </svg>
          </div>

          <h2 style={{
            fontFamily: '"Figtree", sans-serif', fontWeight: 700,
            fontSize: '1.75rem', color: '#164E63', lineHeight: 1.3, marginBottom: '1rem',
          }}>
            Chăm sóc sức khoẻ<br/>tâm thần sinh viên
          </h2>
          <p style={{ color: '#0e7490', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Theo dõi trạng thái cảm xúc, thực hiện bài kiểm tra và nhận các bài tập sơ cứu cảm xúc được cá nhân hoá cho bạn.
          </p>

          {/* Feature badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', justifyContent: 'center' }}>
            {[
              { icon: '🧠', label: 'Đánh giá PHQ-9 / GAD-7' },
              { icon: '💚', label: 'Theo dõi tâm trạng' },
              { icon: '🛡️', label: 'Riêng tư & An toàn' },
            ].map((f) => (
              <div key={f.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                background: 'white', borderRadius: '100px',
                padding: '0.4rem 0.875rem',
                fontSize: '0.8125rem', fontWeight: 500, color: '#0e7490',
                boxShadow: '0 2px 8px rgba(8,145,178,0.12)',
              }}>
                <span style={{ fontSize: '0.875rem' }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .login-right { display: none !important; }
          .login-left { flex: 1 !important; padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
