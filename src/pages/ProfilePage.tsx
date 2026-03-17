import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import moodService, { type MoodHistory } from '../services/moodService';
import paymentService from '../services/paymentService';

interface SubscriptionData {
  planName: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

// ── Avatar with initials ─────────────────────────────────────────
const Avatar = ({ name, size = 80 }: { name: string; size?: number }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #0891B2 0%, #059669 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: size * 0.34, fontWeight: 700,
      fontFamily: '"Figtree", sans-serif',
      boxShadow: '0 4px 14px rgba(8,145,178,0.35)',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

// ── Mood score colour ─────────────────────────────────────────────
const moodColor = (score: number) => {
  if (score >= 4) return '#059669';
  if (score >= 3) return '#0891B2';
  if (score >= 2) return '#f59e0b';
  return '#ef4444';
};
const moodLabel = (score: number) => ['', 'Rất tệ 😢', 'Không tốt 😕', 'Bình thường 😐', 'Tốt 😊', 'Tuyệt vời 😄'][score];

// ── Toggle switch ─────────────────────────────────────────────────
const Toggle = ({
  checked, onChange, disabled,
}: { checked: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    disabled={disabled}
    style={{
      position: 'relative', width: '52px', height: '28px',
      borderRadius: '100px',
      background: checked ? '#0891B2' : '#e2e8f0',
      border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background 200ms ease', flexShrink: 0,
      boxShadow: checked ? '0 0 0 3px rgba(8,145,178,0.2)' : 'none',
    }}
  >
    <span style={{
      position: 'absolute', top: '3px',
      left: checked ? '27px' : '3px',
      width: '22px', height: '22px', borderRadius: '50%',
      background: 'white',
      transition: 'left 200ms ease',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    }} />
  </button>
);

// ── Stat Card ─────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) => (
  <div style={{
    background: 'white', borderRadius: '16px', padding: '1.25rem 1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '1rem',
    border: '1px solid #f0f9ff',
  }}>
    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
    <div>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontSize: '1.375rem', fontWeight: 700, color: '#164E63', fontFamily: '"Figtree", sans-serif' }}>{value}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { user, logout, checkingAuth, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isAnonymous, setIsAnonymous] = useState(user?.isAnonymous ?? false);
  const [anonymousLoading, setAnonymousLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodHistory[]>([]);
  const [moodLoading, setMoodLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [subLoading, setSubLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!checkingAuth && !user) {
      navigate('/login');
    }
  }, [user, navigate, checkingAuth]);

  // Load mood history & subscription
  useEffect(() => {
    if (!user) return;
    
    // Mood
    moodService.getMoodHistory()
      .then(setMoodHistory)
      .catch(() => {}) 
      .finally(() => setMoodLoading(false));

    // Subscription
    paymentService.getCurrentSubscription()
      .then(setSubscription)
      .catch(() => setSubscription(null))
      .finally(() => setSubLoading(false));
  }, [user]);

  const handleToggleAnonymous = async () => {
    setAnonymousLoading(true);
    try {
      await authService.toggleAnonymous();
      const newStatus = !isAnonymous;
      setIsAnonymous(newStatus);
      updateUser({ isAnonymous: newStatus });
      toast.success(newStatus
        ? 'Đã bật chế độ ẩn danh. Tên của bạn sẽ được ẩn.'
        : 'Đã tắt chế độ ẩn danh. Tên của bạn sẽ hiển thị.');
    } catch {
      toast.error('Không thể thay đổi trạng thái ẩn danh. Thử lại sau.');
    } finally {
      setAnonymousLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy gói cước Premium không?')) return;
    
    setCancelling(true);
    try {
      await paymentService.cancelSubscription();
      toast.success('Đã hủy gói cước thành công.');
      setSubscription(prev => prev ? { ...prev, active: false } : null);
    } catch {
      toast.error('Không thể hủy gói cước. Vui lòng thử lại sau.');
    } finally {
      setCancelling(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Đã đăng xuất.');
    navigate('/login');
  };

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{
          width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #0891B2', borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) return null;

  const avgMood = moodHistory.length
    ? Math.round(moodHistory.reduce((s, m) => s + m.score, 0) / moodHistory.length)
    : 0;

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      fontFamily: '"Noto Sans", sans-serif', color: '#1e293b',
    }}>
      {/* ── Top Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #164E63 0%, #0891B2 60%, #059669 100%)',
        height: '200px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', filter: 'blur(25px)' }} />

        {/* Back nav */}
        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            Quay về trang chủ
          </Link>
        </div>



        {/* Logout top-right */}
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem' }}>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px',
            color: 'white', padding: '0.5rem 1rem', fontSize: '0.875rem',
            cursor: 'pointer', transition: 'all 200ms', fontWeight: 500,
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.25)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Đăng xuất
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>

        {/* ── Profile Card ── */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '1.75rem 2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginTop: '-60px', position: 'relative', zIndex: 10,
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <Avatar name={user.displayName || user.email} size={80} />
          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
              <h1 style={{ margin: 0, fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#164E63' }}>
                {isAnonymous ? 'Người dùng ẩn danh' : (user.displayName || 'Người dùng')}
              </h1>
              {isAnonymous && (
                <span style={{ background: '#f1f5f9', color: '#64748b', borderRadius: '100px', padding: '0.2rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="21" x2="21" y2="3"/></svg>
                  Ẩn danh
                </span>
              )}
            </div>
            <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>{user.email}</p>
            <span style={{
              display: 'inline-block', marginTop: '0.5rem',
              background: user.role === 'ADMIN' ? '#fef3c7' : '#ecfdf5',
              color: user.role === 'ADMIN' ? '#92400e' : '#065f46',
              borderRadius: '100px', padding: '0.2rem 0.75rem',
              fontSize: '0.75rem', fontWeight: 600,
            }}>
              {user.role === 'ADMIN' ? 'Quản trị viên' : 'Sinh viên'}
            </span>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>}
            label="Lịch sử tâm trạng"
            value={moodHistory.length}
            color="#0891B2"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" fill="currentColor"/></svg>}
            label="Tâm trạng trung bình"
            value={avgMood ? `${avgMood}/5` : '—'}
            color="#059669"
          />
          <StatCard
            icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="Ngày tham gia"
            value={new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            color="#f59e0b"
          />
        </div>

        {/* ── Settings ── */}
        <div style={{ marginTop: '1.5rem', background: 'white', borderRadius: '20px', padding: '1.75rem 2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#164E63' }}>
            Cài đặt tài khoản
          </h2>

          {/* ── Anonymous Toggle ── */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem',
            padding: '1.25rem', borderRadius: '14px',
            background: isAnonymous ? '#f0f9ff' : '#fafafa',
            border: `1.5px solid ${isAnonymous ? '#bae6fd' : '#f1f5f9'}`,
            transition: 'all 250ms ease',
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                background: isAnonymous ? '#0891B2' : '#e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 250ms',
              }}>
                {isAnonymous
                  ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="2"/></svg>
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </div>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 600, fontSize: '0.9375rem', color: '#164E63' }}>
                  Chế độ ẩn danh
                </p>
                <p style={{ margin: 0, fontSize: '0.8375rem', color: '#64748b', lineHeight: 1.55, maxWidth: '420px' }}>
                  {isAnonymous
                    ? 'Đang bật: Tên của bạn được ẩn khỏi tất cả báo cáo và hoạt động cộng đồng. Dữ liệu vẫn được lưu để phân tích cá nhân.'
                    : 'Tên của bạn sẽ hiển thị bình thường. Bật chế độ ẩn danh để ẩn danh tính khỏi hệ thống.'}
                </p>
                {isAnonymous && (
                  <div style={{ marginTop: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0891B2' }} />
                    <span style={{ fontSize: '0.78rem', color: '#0891B2', fontWeight: 500 }}>Đang hoạt động</span>
                  </div>
                )}
              </div>
            </div>
            <Toggle checked={isAnonymous} onChange={handleToggleAnonymous} disabled={anonymousLoading} />
          </div>

          {/* Account info row */}
          <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Email', value: user.email, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
              { label: 'Vai trò', value: user.role === 'ADMIN' ? 'Quản trị viên' : 'Sinh viên', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            ].map((item) => (
              <div key={item.label} style={{ padding: '0.875rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: 500 }}>
                  {item.icon}
                  {item.label}
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Mood History ── */}
        <div style={{ marginTop: '1.5rem', background: 'white', borderRadius: '20px', padding: '1.75rem 2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ margin: 0, fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#164E63' }}>
              Lịch sử tâm trạng gần đây
            </h2>
            <Link to="/" style={{ fontSize: '0.8375rem', color: '#0891B2', fontWeight: 600, textDecoration: 'none' }}>Xem tất cả →</Link>
          </div>

          {moodLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ height: '64px', borderRadius: '12px', background: '#f1f5f9', animation: 'pulse 1.5s ease-in-out infinite' }} />
              ))}
            </div>
          ) : moodHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#0891B2' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
              </div>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Chưa có dữ liệu tâm trạng. Hãy bắt đầu check-in hôm nay!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {moodHistory.slice(0, 5).map((m) => (
                <div key={m.id} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.875rem 1rem', borderRadius: '12px',
                  background: '#fafafa', border: '1px solid #f1f5f9',
                  transition: 'box-shadow 150ms',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  {/* Score badge */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: moodColor(m.score) + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem', fontWeight: 700, color: moodColor(m.score),
                    fontFamily: '"Figtree", sans-serif',
                  }}>
                    {m.score}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>{moodLabel(m.score)}</p>
                    {m.tags && m.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {m.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '0.7rem', background: '#f0f9ff', color: '#0e7490', borderRadius: '100px', padding: '0.1rem 0.5rem', fontWeight: 500 }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {new Date(m.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Subscription Management ── */}
        <div style={{ marginTop: '1.5rem', background: 'white', borderRadius: '20px', padding: '1.75rem 2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#164E63' }}>
            Quản lý gói cước
          </h2>

          <div style={{
            padding: '1.25rem', borderRadius: '14px',
            background: subscription?.active ? '#ecfdf5' : '#f8fafc',
            border: `1.5px solid ${subscription?.active ? '#a7f3d0' : '#f1f5f9'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: subscription?.active ? '#059669' : '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: '1.05rem', color: '#164E63' }}>
                  {subLoading ? 'Đang tải...' : (subscription?.active ? `UniCare ${subscription.planName}` : 'Chưa đăng ký gói')}
                </p>
                {subscription?.active && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#065f46' }}>
                    Hết hạn: {new Date(subscription.endDate).toLocaleDateString('vi-VN')}
                  </p>
                )}
              </div>
            </div>

            {subscription?.active ? (
              <button 
                onClick={handleCancelSubscription}
                disabled={cancelling}
                style={{
                  padding: '0.625rem 1.25rem', borderRadius: '8px', border: '1px solid #fca5a5',
                  background: 'white', color: '#dc2626', fontSize: '0.875rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 200ms', opacity: cancelling ? 0.7 : 1
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff1f2'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
              >
                {cancelling ? 'Đang xử lý...' : 'Hủy gói cước'}
              </button>
            ) : (
              <Link to="/#pricing-section" style={{
                padding: '0.625rem 1.25rem', borderRadius: '8px', border: 'none',
                background: '#164E63', color: 'white', fontSize: '0.875rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 200ms'
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0891B2'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#164E63'; }}
              >
                Nâng cấp ngay
              </Link>
            )}
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div style={{ marginTop: '1.5rem', background: 'white', borderRadius: '20px', padding: '1.75rem 2rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #fee2e2' }}>
          <h2 style={{ margin: '0 0 0.625rem', fontFamily: '"Figtree", sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#dc2626' }}>
            Đăng xuất
          </h2>
          <p style={{ margin: '0 0 1.25rem', color: '#64748b', fontSize: '0.9rem' }}>
            Phiên làm việc của bạn sẽ kết thúc và token xác thực sẽ bị xóa.
          </p>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem', borderRadius: '10px', cursor: 'pointer',
            border: '1.5px solid #fca5a5', background: '#fff1f2', color: '#dc2626',
            fontSize: '0.9rem', fontWeight: 600, transition: 'all 200ms',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fee2e2'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff1f2'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Đăng xuất khỏi tài khoản
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

export default ProfilePage;
