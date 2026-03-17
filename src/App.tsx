import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout';
import ScrollToHash from './components/common/ScrollToHash';

// ── Page imports (lazy-loadable in a later phase) ──
import HomePage from './pages/HomePage';
import StressAnxietyPage from './pages/StressAnxietyPage';
import MindfulnessPage from './pages/MindfulnessPage';
import CalmHealthPage from './pages/CalmHealthPage';
import AppPlayerPage from './pages/AppPlayerPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyOtpPage from './pages/VerifyOtpPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResultPage from './pages/PaymentResultPage';

/**
 * App — root component with route definitions.
 *
 * Route mapping (mirrors the original hash-based router):
 *   /                → HomePage        (Navbar + Footer)
 *   /stress-anxiety  → StressAnxiety   (Navbar + Footer)
 *   /mindfulness     → Mindfulness     (Navbar only, no Footer)
 *   /calm-health     → CalmHealth      (Navbar + Footer)
 *   /app             → AppPlayer       (full-screen, no layout)
 *   /admin           → AdminDashboard  (full-screen, no layout)
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        {/* ── Pages wrapped in shared layout (Navbar + Footer) ── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/stress-anxiety" element={<StressAnxietyPage />} />
          <Route path="/mindfulness" element={<MindfulnessPage />} />
          <Route path="/calm-health" element={<CalmHealthPage />} />
        </Route>

        {/* ── Full-screen pages (no shared layout) ── */}
        <Route path="/app" element={<AppPlayerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-result" element={<PaymentResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
