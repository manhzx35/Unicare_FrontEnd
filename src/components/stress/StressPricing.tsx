import { Link } from 'react-router-dom';
/**
 * Stress Pricing CTA — ocean background w/ pricing card.
 * Same structure as home PricingCTA but with Warmth palette gradient overlay.
 */
export default function StressPricing() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
          alt="Ocean"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(254,253,224,0.95) 0%, rgba(251,224,222,0.85) 30%, rgba(178,201,225,0.3) 100%)',
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
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E5E7EB] mb-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="font-medium text-[#1A1A2E]">Hàng năm</div>
              <div className="text-sm text-[#6B7280]">1.750.000đ/năm.</div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-peace-trust text-white text-xs font-medium mb-1">
                Dùng thử 14 ngày miễn phí
              </span>
              <div className="text-sm text-[#1A1A2E] font-medium">145.000đ/tháng</div>
            </div>
          </div>
        </div>
        <Link to="/calm-health#pricing-section" className="w-full">
          <button className="calm-cta-btn w-full max-w-sm mx-auto cursor-pointer">
            Tiếp tục
          </button>
        </Link>
      </div>
    </section>
  );
}
