import { useState } from 'react';
import {
  ChevronDown,
  Headphones,
  Share2,
  Play,
  Volume2,
} from 'lucide-react';

/* ── Category tab data ── */
const TABS = ['Công cụ Thực tế', 'Giải tỏa Nhanh', 'Bài tập Tĩnh tâm', 'Luyện thở', 'Khóa học'];

/**
 * Tools Section — "Stress relief and anxiety tools for real life."
 * Category tabs + featured content card with audio player.
 */
export default function ToolsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-heading text-peace-trust text-center mb-10">
          Công cụ giải tỏa căng thẳng và lo âu cho cuộc sống thực.
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium border cursor-pointer
                transition-all duration-base
                ${
                  activeTab === i
                    ? 'bg-[#2C3E50] border-[#2C3E50] text-white'
                    : 'border-[#D1D5DB] bg-white text-[#374151] hover:border-[#2C3E50] hover:bg-[rgba(44,62,80,0.05)]'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text side */}
            <div className="order-2 md:order-1 text-center md:text-left">
              <h3 className="font-heading text-xl md:text-2xl text-[#1A1A2E] mb-4">
                Giải tỏa tức thì
              </h3>
              <p className="text-[#4A5568] mb-6 leading-relaxed">
                Các chuyên gia lâm sàng và giáo viên chánh niệm của chúng tôi sẵn sàng hỗ trợ bạn với hàng loạt chương trình về căng thẳng công việc, lo âu cấp tính, suy nghĩ tiêu cực và hơn thế nữa.
              </p>
              <div className="inline-block mb-4">
                <span className="px-3 py-1 rounded-full border border-[#E5E7EB] text-xs text-[#4A5568]">
                  Dùng thử miễn phí
                </span>
              </div>
              <div className="mb-4">
                <h4 className="font-heading text-lg text-[#1A1A2E]">
                  Vượt qua Căng thẳng và Lo âu
                </h4>
                <p className="text-sm text-[#9CA3AF]">Thuyết minh bởi TS. Julie Smith</p>
              </div>

              {/* Audio player */}
              <div className="flex items-center gap-3 p-3 bg-[#F3F4F6] rounded-full">
                <button className="w-9 h-9 rounded-full bg-peace-trust text-white flex items-center justify-center cursor-pointer border-none flex-shrink-0 hover:bg-peace-serene hover:scale-105 transition-all duration-base">
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
                <span className="text-sm text-[#4A5568]">0:00 / 0:00</span>
                <div className="flex-1 h-1 bg-[#D1D5DB] rounded-sm overflow-hidden">
                  <div className="h-full w-0 bg-peace-trust" />
                </div>
                <button className="text-[#6B7280] cursor-pointer bg-transparent border-none">
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image side */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop"
                  alt="Vượt qua Căng thẳng"
                  className="w-full h-80 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center cursor-pointer border-none">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center cursor-pointer border-none">
                    <Headphones className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center cursor-pointer border-none">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="font-heading text-lg">Vượt qua Căng thẳng và Lo âu</h4>
                  <p className="text-sm text-white/80">11 công cụ để lấy lại sự bình tĩnh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
