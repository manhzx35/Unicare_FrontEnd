import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/**
 * Stress & Anxiety Hero — split layout (text left, image right).
 * Background: Warmth & Care gradient (#FEFDE0 → #FBE0DE).
 */
export default function StressHero() {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        background: 'linear-gradient(135deg, #FEFDE0 0%, #FBE0DE 30%, #F4F1EA 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading text-[#1A1A2E] leading-tight mb-6">
              Giải tỏa lo âu và căng thẳng bất cứ khi nào bạn cần
            </h1>
            <p className="text-[#4A5568] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Tìm hiểu cách xoa dịu lo âu và sở hữu các công cụ giải tỏa căng thẳng tức thì.
              Các chuyên gia lâm sàng và giáo viên thiền định của chúng tôi sẵn sàng hỗ trợ bạn với đa dạng các
              chương trình giải tỏa căng thẳng, bài thiền trị liệu lo âu và nội dung hướng dẫn để giúp
              bạn bình tâm và cảm thấy tốt hơn.
            </p>
            <Link to="/calm-health#pricing-section">
              <button className="calm-cta-btn text-base cursor-pointer">
                Giải tỏa căng thẳng miễn phí
              </button>
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&h=800&fit=crop"
              alt="Woman relaxing with eyes closed"
              className="w-full h-[500px] object-cover rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#9CA3AF]" />
      </div>
    </section>
  );
}
