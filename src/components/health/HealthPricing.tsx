import { Check, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRICING_TIERS = [
  {
    id: 'free',
    name: 'UNICARE Free',
    price: '0đ',
    period: '/ tháng',
    description: 'Phù hợp cho: người mới, muốn trải nghiệm ẩn danh, chưa sẵn sàng trả phí',
    cta: 'Bắt đầu miễn phí',
    ctaStyle: 'outline',
    badge: 'Dùng thử',
    features: [
      { text: 'Check-in cảm xúc cơ bản', included: true },
      { text: 'Thư viện chánh niệm (mức giới hạn)', included: true },
      { text: 'Cộng đồng ẩn danh (mức giới hạn)', included: true },
      { text: 'Tự đánh giá nhanh định kỳ (mức giới hạn)', included: true },
    ],
  },
  {
    id: 'basic',
    name: 'UNICARE Basic',
    price: '49000đ',
    period: '/ tháng',
    description: 'Phù hợp cho: sinh viên cần theo dõi cảm xúc và công cụ cơ bản hằng ngày',
    cta: 'Nâng cấp',
    ctaStyle: 'primary',
    badge: 'Bắt đầu tiết kiệm',
    features: [
      { text: 'Bao gồm Free', included: true },
      { text: 'Theo dõi cảm xúc & phân tích cơ bản', included: true },
      { text: 'Thang đo sàng lọc trầm cảm/lo âu: lưu lịch sử & nhắc lịch', included: true },
      { text: 'Thư viện chánh niệm (mở rộng)', included: true },
      { text: 'Cộng đồng đăng, bình luận không giới hạn', included: true },
    ],
  },
  {
    id: 'plus',
    name: 'UNICARE Plus',
    price: '79000đ',
    period: '/ tháng',
    description: 'Phù hợp cho: nhóm cần giải pháp nhanh 3-15 phút và duy trì thói quen',
    cta: 'Nâng cấp',
    ctaStyle: 'primary',
    badge: 'Phổ biến nhất',
    features: [
      { text: 'Bao gồm Basic', included: true },
      { text: 'Cá nhân hóa theo hành vi/triệu chứng', included: true },
      { text: 'Sơ cứu cảm xúc 3-5 phút', included: true },
      { text: 'Báo cáo tiến triển hằng tuần', included: true },
      { text: 'Hỗ trợ ưu tiên: Chatbot/FAQ & chuyển tuyến khi cần', included: true },
    ],
  },
  {
    id: 'premium',
    name: 'UNICARE Premium',
    price: '99000đ',
    period: '/ tháng',
    description: 'Phù hợp cho: Người cần hỗ trợ nâng cao, chuẩn bị gặp chuyên gia, theo dõi sâu',
    cta: 'Nâng cấp',
    ctaStyle: 'primary',
    badge: 'Phổ biến nhất',
    features: [
      { text: 'Bao gồm Plus', included: true },
      { text: 'Sàng lọc (triage) nâng cao & điều hướng hỗ trợ', included: true },
      { text: 'Báo cáo chuẩn hóa cho chuyên gia', included: true },
      { text: 'Tài nguyên hỗ trợ khẩn cấp: hướng dẫn an toàn', included: true },
      { text: 'Cá nhân hóa nâng cao 7-14 ngày', included: true },
    ],
  },
];

/**
 * HealthPricing - Professional pricing table comparing plans.
 * Styled purely with Tailwind CSS, utilizing the Warmth & Care palette where appropriate,
 * though defaults to clean SaaS aesthetic with clear CTAs.
 */
export default function HealthPricing() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFBFC]" id="pricing-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1473B6] bg-[#1473B6]/10 px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Gói giá dịch vụ
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-[#1A1A2E] mb-4">
            Chọn gói giải pháp phù hợp với bạn
          </h2>
          <p className="text-[#4A5568] max-w-xl mx-auto text-base">
            Bắt đầu với gói miễn phí và nâng cấp bất cứ lúc nào. Tất cả gói trả phí bao gồm cam kết hoàn tiền trong 14 ngày.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PRICING_TIERS.map((tier) => {
            return (
              <div
                key={tier.id}
                className={`
                  relative bg-white rounded-2xl overflow-hidden transition-all duration-300
                  ${
                    tier.id === 'premium'
                      ? 'border-2 border-[#D97706] shadow-[0_8px_30px_rgba(217,119,6,0.15)] hover:shadow-[0_16px_40px_rgba(217,119,6,0.2)] md:-translate-y-2 lg:-translate-y-4'
                      : tier.id === 'plus'
                        ? 'border border-[#22D3EE] shadow-soft-sm hover:shadow-soft-md'
                        : tier.id === 'basic'
                          ? 'border border-[#A78BFA] shadow-soft-sm hover:shadow-soft-md'
                          : 'border border-[#E5E7EB] shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1'
                  }
                `}
              >
                {/* Badge */}
                {tier.badge && (
                  <div
                    className={`
                      absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold text-white
                      ${
                        tier.id === 'plus' 
                          ? 'bg-[#1473B6]' 
                          : tier.id === 'premium'
                            ? 'bg-gradient-to-br from-[#FFB74D] to-[#FF9800]'
                            : tier.id === 'basic'
                              ? 'bg-[#7C3AED]'
                              : 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]'
                      }
                    `}
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="font-heading text-xl text-[#1A1A2E] mb-2">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl md:text-4xl font-heading text-[#1A1A2E]">{tier.price}</span>
                      <span className="text-sm font-medium text-[#9CA3AF]">{tier.period}</span>
                    </div>
                    <p className="text-sm text-[#4A5568]">{tier.description}</p>
                  </div>

                  {/* CTA Button */}
                  <div className="mb-8">
                    <Link 
                      to="/checkout" 
                      state={{ tier: { id: tier.id, name: tier.name, price: tier.price } }}
                      className="block w-full"
                    >
                      <button
                        className={`
                          w-full flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer border-none
                          ${
                            tier.id === 'premium'
                              ? 'bg-[#D97706] text-white hover:bg-[#B45309]'
                              : tier.id === 'plus'
                                ? 'bg-[#06B6D4] text-white hover:bg-[#0891B2]'
                                : tier.id === 'basic'
                                  ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                                  : 'bg-[#D1D5DB] text-[#1A1A2E] hover:bg-[#9CA3AF]'
                          }
                        `}
                      >
                        {tier.cta}
                      </button>
                    </Link>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mt-auto">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {feature.included ? (
                            <div className="w-5 h-5 rounded-full bg-[#A4D0A4]/20 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-[#5A9A5A]" strokeWidth={3} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                              <X className="w-3.5 h-3.5 text-[#D1D5DB]" strokeWidth={2.5} />
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-[0.875rem] leading-snug ${
                            feature.included ? 'text-[#374151] font-medium' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
