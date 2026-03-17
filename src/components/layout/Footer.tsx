import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

/**
 * Global footer — dark background, centered branding.
 * Follows the original Vanilla TS footer from main.ts.
 */
export default function Footer() {
  return (
    <footer className="py-12 bg-[#1A1A2E]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-peace-serene" />
          <span className="font-heading text-xl text-white">UniCare</span>
        </Link>
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} UniCare Mental Health. Sức khỏe của bạn, ưu tiên của chúng tôi.
        </p>
      </div>
    </footer>
  );
}
