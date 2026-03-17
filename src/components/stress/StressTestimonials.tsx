import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { quote: "Tôi thức dậy với tâm trạng tốt hơn khi bắt đầu với 10 phút. Bây giờ tôi bình tĩnh hơn trong các tình huống căng thẳng.", author: 'Maya từ Denver', rating: 5 },
  { quote: "UniCare đã thay đổi cuộc đời tôi! Tôi đã thiền được 2 năm và nó thực sự giúp giảm bớt lo âu ảnh hưởng đến cuộc sống.", author: 'Alex từ Chicago', rating: 5 },
  { quote: 'UniCare đã thay đổi cuộc đời tôi theo những cách không thể đong đếm được. Tôi kiên cường hơn và cảm thấy kết nối nhiều hơn với bản thân.', author: 'Allison từ San Jose', rating: 5 },
  { quote: 'Bất cứ khi nào tôi cần thư giãn sau một ngày làm việc căng thẳng, tôi lại thiền và nó đưa tôi đến không gian hạnh phúc.', author: 'Jasmine từ Bend', rating: 4 },
  { quote: 'Tôi đã thoát khỏi những cơn hoảng loạn lo âu. Tôi chưa bao giờ biết cách đối phó với chúng, nhưng ứng dụng này đã thực sự giúp tôi.', author: 'Taylor từ Seattle', rating: 5 },
  { quote: 'Các bài thiền hàng ngày hầu như luôn chính xác là những gì tôi cần nghe. Nó giúp tôi nhìn nhận mọi thứ theo cách khác.', author: 'Chris từ Miami', rating: 4 },
];

export default function StressTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] text-center mb-4">
          Tham gia cùng hàng triệu người sử dụng UniCare để quản lý lo âu, xoa dịu căng thẳng và cảm thấy tốt hơn.
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 mt-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] min-h-[280px] rounded-[1.25rem] p-7 flex flex-col snap-start transition-transform duration-base hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-white/40" />
              </div>
              <p className="text-white text-base leading-relaxed mb-6 flex-1">{t.quote}</p>
              <p className="text-white/70 text-sm mb-3">{t.author}</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, j) => (
                  <span key={j} className={`text-lg ${j < t.rating ? 'text-yellow-400' : 'text-white/30'}`}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={() => scroll('left')} aria-label="Previous" className="w-11 h-11 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center cursor-pointer text-[#9CA3AF] hover:border-[#D1D5DB] hover:text-[#374151] transition-all duration-base">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} aria-label="Next" className="w-11 h-11 rounded-full border border-[#2C3E50] bg-white flex items-center justify-center cursor-pointer text-[#2C3E50] hover:border-[#D1D5DB] hover:text-[#374151] transition-all duration-base">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
