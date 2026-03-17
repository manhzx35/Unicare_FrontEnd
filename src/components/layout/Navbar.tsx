import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Navbar — transparent at top → solid white on scroll.
 */
export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  /* Pages with light backgrounds need dark navbar text when NOT scrolled */
  const lightPages = ['/stress-anxiety', '/calm-health', '/mindfulness'];
  const isLightPage = lightPages.includes(location.pathname);

  /* Determine text color mode: dark text when scrolled OR on light pages */
  const useDarkText = scrolled || isLightPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      id="main-navbar"
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-[350ms] ease-out
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.08)]' : 'bg-transparent'}
      `}
    >
      <div 
        className={`flex items-center justify-between max-w-[1400px] mx-auto px-6 transition-all duration-[350ms] ease-out ${scrolled ? 'py-3' : 'py-5'}`}
      >
        {/* ── Left: Logo + Desktop Nav Links ── */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span
              className={`font-heading text-2xl font-bold transition-colors duration-[350ms] ${
                useDarkText ? 'text-[#1A1A2E]' : 'text-white'
              }`}
            >
              UniCare
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink
              to="/stress-anxiety"
              label="Căng thẳng & Lo âu"
              active={isActive('/stress-anxiety')}
              darkText={useDarkText}
            />
            <NavLink
              to="/mindfulness"
              label="Chánh niệm"
              active={isActive('/mindfulness')}
              darkText={useDarkText}
            />
          </div>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-5">
          <NavLink
            to="/calm-health"
            label="UniCare Health"
            active={isActive('/calm-health')}
            darkText={useDarkText}
            className="hidden md:flex"
          />
          <NavLink
            to="/app"
            label="Vào ứng dụng"
            active={isActive('/app')}
            darkText={useDarkText}
            className="hidden md:flex"
          />

          {/* CTA Button */}
          <Link to="/calm-health#pricing-section">
            <button
              className={`
                px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer
                transition-all duration-base
                ${
                  scrolled
                    ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white border-transparent shadow-[0_4px_14px_rgba(102,126,234,0.35)] hover:shadow-[0_4px_14px_rgba(102,126,234,0.5)]'
                    : useDarkText
                      ? 'bg-transparent border-2 border-[rgba(26,26,46,0.3)] text-[#1A1A2E] hover:border-[#1A1A2E] hover:bg-[rgba(26,26,46,0.05)]'
                      : 'bg-transparent border-2 border-white/80 text-white hover:bg-white/15 hover:border-white'
                }
              `}
            >
              Dùng thử miễn phí
            </button>
          </Link>

          {/* Profile button container with hover menu */}
          <div 
            className="relative"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button
              aria-label="Profile"
              onClick={() => navigate('/profile')}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-base cursor-pointer bg-transparent border-none
                ${
                  useDarkText
                    ? 'text-[rgba(26,26,46,0.7)] hover:text-[#1A1A2E] hover:bg-[rgba(26,26,46,0.05)]'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {isAuthenticated && user?.displayName ? (
                <div className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center text-xs font-bold border border-white/20">
                  {user.displayName[0].toUpperCase()}
                </div>
              ) : (
                <User className="w-6 h-6" />
              )}
            </button>

            {/* Hover Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full pt-2 w-48 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1">
                  {!isAuthenticated ? (
                    <Link 
                      to="/login"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#1A1A2E] hover:bg-gray-50 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="font-semibold">Đăng nhập</span>
                    </Link>
                  ) : (
                    <>
                      <Link 
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-[#1A1A2E] hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span className="font-semibold">Tài khoản</span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="font-semibold">Đăng xuất</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`
              lg:hidden w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-base cursor-pointer bg-transparent border-none
              ${
                useDarkText
                  ? 'text-[rgba(26,26,46,0.7)] hover:text-[#1A1A2E]'
                  : 'text-white/85 hover:text-white'
              }
            `}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E7EB] shadow-soft-md animate-in slide-in-from-top">
          <div className="flex flex-col px-6 py-4 gap-1">
            <MobileNavLink to="/" label="Trang chủ" active={isActive('/')} />
            <MobileNavLink to="/stress-anxiety" label="Căng thẳng & Lo âu" active={isActive('/stress-anxiety')} />
            <MobileNavLink to="/mindfulness" label="Chánh niệm" active={isActive('/mindfulness')} />
            <MobileNavLink to="/calm-health" label="UniCare Health" active={isActive('/calm-health')} />
            <MobileNavLink to="/app" label="Vào ứng dụng" active={isActive('/app')} />
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Desktop NavLink ── */
interface NavLinkProps {
  to: string;
  label: string;
  active: boolean;
  darkText: boolean;
  className?: string;
}

function NavLink({ to, label, active, darkText, className = '' }: NavLinkProps) {
  const colorClass = darkText
    ? active
      ? 'text-[#1A1A2E]'
      : 'text-[rgba(26,26,46,0.7)] hover:text-[#1A1A2E]'
    : active
      ? 'text-white'
      : 'text-white/85 hover:text-white';

  return (
    <Link
      to={to}
      className={`
        px-3 py-2 rounded-lg text-[0.9375rem] font-medium
        inline-flex items-center cursor-pointer no-underline
        transition-all duration-base
        ${colorClass} ${className}
      `}
    >
      {label}
    </Link>
  );
}

/* ── Mobile NavLink ── */
function MobileNavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`
        px-4 py-3 rounded-xl text-base font-medium transition-colors duration-base
        ${active ? 'text-peace-trust bg-peace-trust/5' : 'text-[#1A1A2E] hover:bg-[#F9FAFB]'}
      `}
    >
      {label}
    </Link>
  );
}
