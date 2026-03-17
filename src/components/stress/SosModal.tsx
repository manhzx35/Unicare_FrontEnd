import { PhoneCall, AlertTriangle, X } from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SosModal({ isOpen, onClose }: SosModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - Red Warning Theme */}
        <div className="bg-red-600 p-6 flex items-center justify-between text-white relative">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-xl font-bold">Thông báo Quan trọng</h2>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <p className="text-lg font-medium text-gray-900 mb-4">
            MSG07: Cảnh báo: Điểm số của bạn cho thấy mức độ căng thẳng cao.
          </p>
          <p className="text-gray-600 mb-8">
            Vui lòng đừng ngần ngại tìm kiếm sự giúp đỡ chuyên nghiệp. Bạn không hề đơn độc, luôn có những người sẵn sàng hỗ trợ bạn 24/7.
          </p>

          <a 
            href="tel:111" 
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 active:bg-red-800 transition-colors shadow-lg shadow-red-600/30"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            Gọi Hotline Khẩn cấp
          </a>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            Nếu bạn đang ở trong tình trạng nguy hiểm tức thời, hãy gọi ngay cho các dịch vụ cấp cứu.
          </p>
        </div>
      </div>
    </div>
  );
}
