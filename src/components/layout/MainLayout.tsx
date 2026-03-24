import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';


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
