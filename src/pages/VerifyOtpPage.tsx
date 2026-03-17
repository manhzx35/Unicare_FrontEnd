import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';
import { ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      toast.error('Email không hợp lệ. Vui lòng đăng ký lại.');
      navigate('/register');
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev: number) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      toast.error('Vui lòng nhập đủ 6 chữ số.');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyOtp(email, otpValue);
      toast.success('Xác thực thành công! Hãy đăng nhập để bắt đầu.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Xác thực thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setResending(true);
    try {
      await authService.resendOtp(email);
      toast.success('Mã xác thực mới đã được gửi!');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error('Không thể gửi lại mã. Thử lại sau.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '"Figtree", sans-serif'
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        textAlign: 'center'
      }}>
        {/* Icon Header */}
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(8, 145, 178, 0.1)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: '#0891B2'
        }}>
          <ShieldCheck size={40} />
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#164E63', marginBottom: '0.75rem' }}>
          Xác thực Email
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến email <br/>
          <strong style={{ color: '#1e293b' }}>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {otp.map((digit: string, idx: number) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                style={{
                  width: '52px',
                  height: '60px',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#164E63',
                  outline: 'none',
                  transition: 'all 200ms',
                  backgroundColor: '#f8fafc'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0891B2';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 4px rgba(8, 145, 178, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.backgroundColor = '#f8fafc';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 200ms',
              boxShadow: '0 4px 12px rgba(8, 145, 178, 0.25)'
            }}
          >
            {loading ? 'Đang xác thực...' : 'Xác thực tài khoản'}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={handleResend}
            disabled={timer > 0 || resending}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              color: timer > 0 ? '#94a3b8' : '#0891B2',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: timer > 0 ? 'default' : 'pointer',
              transition: 'color 200ms'
            }}
          >
            {resending ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            {timer > 0 ? `Gửi lại mã sau ${timer}s` : 'Gửi lại mã xác thực'}
          </button>

          <Link
            to="/register"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginTop: '1rem'
            }}
          >
            <ArrowLeft size={16} />
            Quay lại đăng ký
          </Link>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyOtpPage;
