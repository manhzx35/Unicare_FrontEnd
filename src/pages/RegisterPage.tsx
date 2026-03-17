import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';

const STEPS = ['Thông tin cá nhân', 'Mật khẩu'] as const;

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = (() => {
    if (password.length === 0) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'][passwordStrength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#0891B2', '#059669'][passwordStrength];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim().length < 3) {
      toast.error('Tên hiển thị phải có ít nhất 3 ký tự.');
      return;
    }
    setStep(1);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setLoading(true);
    try {
      await authService.register({ email, password, displayName });
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác thực.');
      navigate('/verify-otp', { state: { email } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Đăng ký thất bại. Thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '0.75rem 1rem 0.75rem 2.75rem',
    border: '1.5px solid #e2e8f0', borderRadius: '10px',
    fontSize: '0.9375rem', color: '#1e293b', outline: 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    fontFamily: '"Noto Sans", sans-serif', background: 'white',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: '"Noto Sans", sans-serif' }}>

      {/* ── Left Panel: Illustration ── */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #164E63 0%, #0e7490 50%, #059669 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '380px', color: 'white', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
            </div>
            <span style={{ fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>UniCare</span>
          </div>

          <h2 style={{ fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '2rem', lineHeight: 1.25, marginBottom: '1rem' }}>
            Bắt đầu hành trình<br/>chăm sóc bản thân
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, opacity: 0.85, marginBottom: '2.5rem' }}>
            Tham gia cùng hàng nghìn sinh viên đang sử dụng UniCare để theo dõi sức khoẻ tâm thần mỗi ngày.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', textAlign: 'left' }}>
            {[
              'Bài test PHQ-9 & GAD-7 được chuẩn hóa y tế',
              'Theo dõi tâm trạng hàng ngày',
              'Bài tập sơ cứu cảm xúc cá nhân hóa',
              'Chế độ ẩn danh để bảo vệ quyền riêng tư',
            ].map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div style={{
        flex: '0 0 500px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '3rem 3.5rem',
        backgroundColor: '#ffffff',
      }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: i <= step ? '#0891B2' : '#e2e8f0',
                  color: i <= step ? 'white' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, transition: 'all 200ms',
                }}>
                  {i < step ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : i + 1}
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: i === step ? 600 : 400, color: i === step ? '#164E63' : '#94a3b8' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: '2px', background: i < step ? '#0891B2' : '#e2e8f0', transition: 'background 200ms', borderRadius: '2px' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#164E63', margin: '0 0 0.4rem' }}>
            {step === 0 ? 'Tạo tài khoản' : 'Đặt mật khẩu'}
          </h1>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>
            {step === 0 ? 'Điền thông tin cơ bản của bạn' : 'Tạo mật khẩu bảo mật cho tài khoản'}
          </p>
        </div>

        {step === 0 ? (
          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Display Name */}
            <div>
              <label htmlFor="displayName" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>Tên hiển thị</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Nguyễn Văn A" required minLength={3} style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>
            {/* Email */}
            <div>
              <label htmlFor="reg-email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <p style={{ margin: '0.375rem 0 0', fontSize: '0.8rem', color: '#64748b' }}>Hệ thống sẽ gửi mã xác thực đến địa chỉ này</p>
            </div>
            <button type="submit" style={{
              width: '100%', padding: '0.875rem',
              background: 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 200ms ease', fontFamily: '"Figtree", sans-serif',
              boxShadow: '0 4px 14px rgba(8,145,178,0.3)',
            }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(8,145,178,0.4)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; (e.target as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(8,145,178,0.3)'; }}
            >
              Tiếp tục →
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Password */}
            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>Mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 6 ký tự" required minLength={6} style={{ ...inputStyle, paddingRight: '2.75rem' }}
                  onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                  {showPassword
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {/* Strength meter */}
              {password.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '0.25rem' }}>
                    {[1,2,3,4].map((i) => (
                      <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= passwordStrength ? strengthColor : '#e2e8f0', transition: 'background 200ms' }} />
                    ))}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: strengthColor, fontWeight: 500 }}>Độ mạnh: {strengthLabel}</p>
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#334155' }}>Xác nhận mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input id="confirm-password" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" required style={{ ...inputStyle, borderColor: confirmPassword && confirmPassword !== password ? '#ef4444' : '#e2e8f0' }}
                  onFocus={(e) => { e.target.style.borderColor = '#0891B2'; e.target.style.boxShadow = '0 0 0 3px rgba(8,145,178,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = confirmPassword && confirmPassword !== password ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p style={{ margin: '0.375rem 0 0', fontSize: '0.8rem', color: '#ef4444' }}>Mật khẩu chưa khớp</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" onClick={() => setStep(0)} style={{
                flex: '0 0 auto', padding: '0.875rem 1.25rem', borderRadius: '10px', cursor: 'pointer',
                border: '1.5px solid #e2e8f0', background: 'white', color: '#64748b',
                fontSize: '0.9375rem', fontWeight: 500, transition: 'all 200ms',
              }}>← Quay lại</button>
              <button type="submit" disabled={loading} style={{
                flex: 1, padding: '0.875rem',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
                color: 'white', border: 'none', borderRadius: '10px',
                fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 200ms ease', fontFamily: '"Figtree", sans-serif',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(8,145,178,0.3)',
              }}>
                {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Đã có tài khoản?{' '}
            <Link to="/login" style={{ color: '#0891B2', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap');`}</style>
    </div>
  );
};

export default RegisterPage;
