import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * MainLayout — wraps pages that share the floating Navbar + Footer.
 *
 * Some routes (e.g. /app, /admin) are "full-screen" and render
 * WITHOUT this layout (they are defined outside this wrapper in the router).
 *
 * - `pt-24` ensures content isn't hidden behind the floating navbar.
 * - Footer is hidden on /mindfulness to match the original behavior.
 */
export default function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/mindfulness';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
