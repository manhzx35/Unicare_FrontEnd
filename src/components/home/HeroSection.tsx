import { Link } from 'react-router-dom';

/**
 * Hero Section — full-screen greeting with primary CTA.
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
          alt="Serene mountain landscape"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(25,25,112,0.25) 0%, rgba(25,25,112,0.1) 30%, rgba(25,25,112,0.15) 50%, rgba(244,241,234,0.85) 80%, rgba(244,241,234,0.98) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-[3.25rem] font-heading text-white leading-tight mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          Gác lại âu lo, tâm trí tự do.
        </h1>
        <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
          Chăm sóc sức khỏe tinh thần không nhất thiết phải khó khăn. UniCare cung cấp các công cụ giúp bạn cảm thấy tốt hơn ngay trong tầm tay, với nội dung cá nhân hóa để quản lý căng thẳng, cải thiện giấc ngủ và sống trọn vẹn hơn mỗi ngày.
        </p>
        <div className="flex items-center justify-center">
          <Link to="/calm-health#pricing-section">
            <button className="calm-cta-btn cursor-pointer">Dùng thử miễn phí</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
