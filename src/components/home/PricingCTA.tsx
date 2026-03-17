import { Link } from 'react-router-dom';
/**
 * Pricing CTA — "Start your free trial of UniCare Premium."
 * Ocean background image with pricing card overlay.
 */
export default function PricingCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
          alt="Ocean waves"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(244,241,234,0.98) 0%, rgba(244,241,234,0.85) 30%, rgba(178,201,225,0.3) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] mb-2">
          Bắt đầu dùng thử miễn phí
        </h2>
        <h3 className="text-3xl md:text-4xl font-heading text-[#1A1A2E] mb-8">
          UniCare Premium.
        </h3>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E5E7EB] mb-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="font-medium text-[#1A1A2E]">UNICARE Premium</div>
              <div className="text-sm text-[#6B7280]">99.000đ/tháng</div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-peace-trust text-white text-xs font-medium mb-1">
                Ưu đãi nhất
              </span>
              <div className="text-sm text-[#1A1A2E] font-medium">Theo dõi chuyên sâu</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#6B7280] mb-6">
          Nâng cấp lên Premium để mở khóa sàng lọc nâng cao và hỗ trợ chuyên gia.{' '}
          <a href="#" className="underline">
            Điều khoản
          </a>{' '}
          |{' '}
          <a href="#" className="underline">
            Hủy bất kỳ lúc nào
          </a>
        </p>

        <Link to="/calm-health#pricing-section" className="w-full">
          <button className="calm-cta-btn w-full max-w-sm mx-auto cursor-pointer">
            Tiếp tục
          </button>
        </Link>
      </div>
    </section>
  );
}
