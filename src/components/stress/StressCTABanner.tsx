import { Link } from 'react-router-dom';
/**
 * CTA Banner — purple/blue gradient with content thumbnails.
 */

const THUMBNAILS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=200&h=250&fit=crop',
];

export default function StressCTABanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />

      {/* Right-side content thumbnails */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:grid grid-cols-3 gap-3 p-6 opacity-80">
        {THUMBNAILS.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden">
            <img src={img} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-md">
          <h2 className="text-2xl md:text-3xl font-heading text-white mb-4 leading-tight">
            Tìm thấy sự giải tỏa mà bạn hằng mong đợi.
          </h2>
          <p className="text-white/80 mb-8">
            Lựa chọn từ danh mục phong phú, từ các bài tập thở 2 phút đến các chương trình 7 ngày.
          </p>
          <Link to="/calm-health#pricing-section">
            <button className="bg-white text-[#1A1A2E] font-medium px-8 py-3 rounded-full cursor-pointer hover:shadow-lg transition-all duration-base border-none">
              Mở khóa thêm nội dung miễn phí
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
