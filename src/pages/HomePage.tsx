import {
  HeroSection,
  FeaturesSection,
  MoodCheckin,
  PHQ9Assessment,
  TestimonialsSection,
  PricingCTA,
  BlogSection,
} from '../components/home';
import { useAuth } from '../context/AuthContext';

/**
 * HomePage — composed from all home sections.
 * Mirrors the original vanilla TS home page exactly.
 *
 * No pt-24 here because the Hero is full-screen and goes behind the navbar.
 */
export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isAuthenticated ? <MoodCheckin /> : <PHQ9Assessment />}
      </div>
      <TestimonialsSection />
      <PricingCTA />
      <BlogSection />
    </>
  );
}
