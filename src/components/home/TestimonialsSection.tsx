import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

/* ── Testimonial data ── */
const TESTIMONIALS = [
  {
    quote: 'Mỗi khi không thể chợp mắt, tôi bật ứng dụng này lên và chìm vào giấc ngủ chỉ trong 5 phút.',
    author: 'Brandy từ Houston',
    rating: 5,
  },
  {
    quote:
      'Đầu óc tôi lúc nào cũng bận rộn và rất khó để thư giãn. Giờ đây, việc luyện tập hàng ngày thực sự tuyệt vời và giúp tôi chữa lành.',
    author: 'John từ Chicago',
    rating: 5,
  },
  {
    quote:
      'UniCare đã thay đổi cuộc đời tôi theo những cách không thể đong đếm được. Tôi kiên cường hơn và cảm thấy kết nối nhiều hơn với chính mình.',
    author: 'Allison từ San Jose',
    rating: 5,
  },
  {
    quote:
      "Bất cứ khi nào cần thư giãn sau một ngày làm việc căng thẳng, tôi lại thiền với những âm thanh của UniCare, nó đưa tôi đến nơi hạnh phúc của riêng mình.",
    author: 'Jasmine từ Bend',
    rating: 4,
  },
  {
    quote:
      'Gia đình tôi rất yêu UniCare! Trong số ba ứng dụng thiền trên điện thoại, UniCare là ứng dụng duy nhất tôi thực sự sử dụng.',
    author: 'Kristie từ Irvine',
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-white/30'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] text-center mb-12">
          Hơn 2 triệu đánh giá 5 sao.
        </h2>

        {/* Scrollable testimonial cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] min-h-[280px] rounded-[1.25rem] p-7 flex flex-col snap-start transition-transform duration-base hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
              }}
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white text-base leading-relaxed mb-6 flex-1">{t.quote}</p>
              <p className="text-white/70 text-sm mb-3">{t.author}</p>
              <StarRating rating={t.rating} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer text-[#9CA3AF] hover:border-[#D1D5DB] hover:text-[#374151] transition-all duration-base"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-full border border-[#2C3E50] bg-white flex items-center justify-center cursor-pointer text-[#2C3E50] hover:border-[#D1D5DB] hover:text-[#374151] transition-all duration-base"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
