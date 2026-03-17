import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight, Home } from 'lucide-react';
import paymentService from '../services/paymentService';

export default function PaymentResultPage() {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await paymentService.verifyPayment(location.search);
        if (result === 'Payment Success') {
          setStatus('success');
          setMessage('Cảm ơn bạn đã tin tưởng UniCare. Gói dịch vụ Premium của bạn đã được kích hoạt thành công!');
        } else {
          setStatus('error');
          setMessage('Thanh toán không thành công hoặc đã bị hủy. Vui lòng kiểm tra lại số dư tài khoản hoặc thử phương thức khác.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Đã xảy ra lỗi khi xác thực giao dịch. Đừng lo lắng, nếu tiền đã bị trừ, hãy liên hệ hỗ trợ UniCare ngay.');
      }
    };

    if (location.search) {
      verify();
    } else {
      setStatus('error');
      setMessage('Không tìm thấy thông tin giao dịch.');
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-soft-xl border border-white text-center">
        {status === 'loading' && (
          <div className="space-y-6 py-8">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-[#4C6F87] animate-spin" />
            </div>
            <div>
              <h2 className="text-2xl font-heading mb-2">Đang xác thực...</h2>
              <p className="text-[#4A5568]">Vui lòng chờ trong giây lát trong khi chúng tôi kiểm tra giao dịch của bạn.</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#A4D0A4]/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-[#5A9A5A]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-[#1A1A2E] mb-3">Thanh toán thành công!</h2>
              <p className="text-[#4A5568] leading-relaxed">
                {message}
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <Link to="/app" className="block w-full bg-[#1A1A2E] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 group shadow-lg">
                <span className="text-white">Vào ứng dụng ngay</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/" className="flex items-center justify-center gap-2 text-sm text-[#4C6F87] font-medium py-2">
                <Home className="w-4 h-4" />
                <span>Quay về trang chủ</span>
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-[#1A1A2E] mb-3">Thanh toán thất bại</h2>
              <p className="text-[#4A5568] leading-relaxed">
                {message}
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <Link to="/checkout" className="block w-full bg-[#1A1A2E] text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg">
                <span className="text-white">Thử lại thanh toán</span>
              </Link>
              <Link to="/#pricing-section" className="flex items-center justify-center gap-2 text-sm text-[#4C6F87] font-medium py-2">
                <Home className="w-4 h-4" />
                <span>Xem lại các gói cước</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
