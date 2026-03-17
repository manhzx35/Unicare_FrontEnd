import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight,
  Lock
} from 'lucide-react';
import paymentService from '../services/paymentService';

/**
 * CheckoutPage — Minimalist premium checkout experience.
 * Left: Value proposition & features.
 * Right: Plan summary & Payment method (VNPay).
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | null>('vnpay');
  const [loading, setLoading] = useState(false);

  // Get plan from state or default to Premium
  const tier = location.state?.tier || { 
    id: 'premium', 
    name: 'UNICARE Premium', 
    price: '99000đ' 
  };

  const amount = parseInt(tier.price.replace(/[^0-9]/g, '')) || 99000;

  const features = [
    { title: '50,000+ phút nội dung Premium', desc: 'Truy cập toàn bộ thư viện thiền, âm thanh giấc ngủ và âm nhạc thư giãn.' },
    { title: 'Nội dung mới mỗi ngày', desc: 'Các bài hướng dẫn mới giúp bạn đối phó với mọi áp lực trong cuộc sống.' },
    { title: 'Hủy bất cứ lúc nào', desc: 'Không ràng buộc, không phí ẩn. Bạn hoàn toàn làm chủ gói cước của mình.' },
    { title: 'Tư vấn chuyên gia', desc: 'Giảm giá đặc biệt cho các buổi trị liệu 1-1 với đội ngũ chuyên gia tâm lý.' },
  ];

  const handleStartTrial = async () => {
    if (paymentMethod === 'vnpay') {
      try {
        setLoading(true);
        const data = await paymentService.createPayment(amount, tier.id.toUpperCase());
        if (data && data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          alert('Không thể khởi tạo thanh toán. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Đã xảy ra lỗi khi kết nối với máy chủ thanh toán.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1A1A2E] font-body flex flex-col">
      {/* ── Top Bar ── */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-[#E0DED7] bg-white">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#4C6F87] hover:text-[#1A1A2E] transition-colors font-medium text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại</span>
        </button>
        <Link to="/" className="font-heading text-xl font-bold text-[#1A1A2E]">
          UniCare
        </Link>
        <div className="w-20" /> {/* Spacer */}
      </nav>

      {/* ── Main Content ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 lg:grid lg:grid-cols-2 lg:gap-20">
        
        {/* Left Column: Value Prop */}
        <section className="mb-12 lg:mb-0">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-heading mb-6 leading-tight">
              Bắt đầu hành trình <br className="hidden md:block" />
              <span className="text-[#4C6F87]">{tier.name}</span> ngay hôm nay.
            </h1>
            <p className="text-[#4A5568] text-lg mb-8">
              Tham gia cùng hàng triệu người đã tìm thấy sự bình yên và cân bằng thông qua nền tảng của chúng tôi.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#A4D0A4]/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-[#5A9A5A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-[#4A5568] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-2xl border border-[#E0DED7] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FEFDE0] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#4C6F87]" />
            </div>
            <p className="text-xs text-[#4A5568] leading-normal italic">
              "Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn với tiêu chuẩn bảo mật y tế cao nhất."
            </p>
          </div>
        </section>

        {/* Right Column: Checkout Form */}
        <section>
          <div className="bg-white rounded-3xl p-8 shadow-soft-xl border border-white sticky top-24">
            <h2 className="text-xl font-heading mb-8">Thông tin đăng ký</h2>

            {/* Plan Card */}
            <div className="p-5 rounded-2xl bg-[#F0F4F8] border border-[#B2C9E1] mb-8 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-[#1A1A2E] uppercase">{tier.name}</h4>
                  <p className="text-xs text-[#6B7280]">Thanh toán theo tháng</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{tier.price}/tháng</div>
                  <div className="text-xs text-[#4C6F87] font-semibold">Tự động gia hạn</div>
                </div>
              </div>
              <div className="h-0.5 bg-[#B2C9E1]/30 my-4" />
              <div className="flex justify-between items-center font-medium">
                <span>Tổng thanh toán</span>
                <span className="text-[#5A9A5A] text-lg">{tier.price}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#6B7280] mb-4">
                Chọn phương thức thanh toán
              </h3>
              
              <div 
                className={`
                  flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${paymentMethod === 'vnpay' ? 'border-[#4C6F87] bg-[#4C6F87]/5' : 'border-[#E0DED7] hover:border-[#B2C9E1]'}
                `}
                onClick={() => setPaymentMethod('vnpay')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg border border-[#E0DED7] flex items-center justify-center p-1">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_VNPAY.png" 
                      alt="VNPay" 
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        (e.target as any).src = 'https://vn.all-biz.info/img/vn/catalog/129759.jpeg';
                      }}
                    />
                  </div>
                  <div>
                    <span className="font-bold">Cổng thanh toán VNPay</span>
                    <p className="text-[10px] text-[#6B7280]">Ngân hàng nội địa, Visa, Mastercard, JCB, QR Code</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'vnpay' ? 'border-[#4C6F87]' : 'border-[#E0DED7]'}`}>
                  {paymentMethod === 'vnpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#4C6F87]" />}
                </div>
              </div>
              
              <p className="mt-4 text-[11px] text-[#6B7280] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Dữ liệu thanh toán của bạn được mã hóa an toàn.
              </p>
            </div>

            {/* Final CTA */}
            <button 
              onClick={handleStartTrial}
              disabled={loading}
              className={`w-full bg-[#1A1A2E] text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <span>{loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}</span>
              {!loading && <ChevronRight className="w-5 h-5" />}
            </button>

            <p className="mt-6 text-center text-[10px] text-[#9CA3AF] leading-relaxed">
              Bằng cách nhấn nút bắt đầu, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của UniCare. 
              Gói dịch vụ sẽ được gia hạn hàng tháng với mức phí {tier.price} trừ khi bạn hủy trước đó.
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-[#E0DED7] text-center text-xs text-[#9CA3AF]">
        <div className="flex items-center justify-center gap-6 mb-4">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Bảo mật bởi Norton</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Mã hóa SSL</span>
        </div>
        &copy; {new Date().getFullYear()} UniCare Mental Health. Bảo lưu mọi quyền.
      </footer>
    </div>
  );
}
