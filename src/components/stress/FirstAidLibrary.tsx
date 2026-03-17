import { useState } from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
import { useRecommendations } from '../../hooks/useRecommendations';

/* ── Data ── */
const EXERCISES = [
  { id: 1, title: 'Thở hộp', description: 'Kỹ thuật giữ bình tĩnh được lực lượng Hải quân SEAL sử dụng', duration: '3 phút', category: 'breathing', thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop' },
  { id: 2, title: 'Thư giãn 4-7-8', description: 'Hít thở sâu để lấy lại bình tĩnh tức thì', duration: '4 phút', category: 'breathing', thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
  { id: 3, title: 'Quét cơ thể', description: 'Giải tỏa căng thẳng từ đầu đến chân', duration: '10 phút', category: 'meditation', thumbnail: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop' },
  { id: 4, title: 'Tĩnh tâm 5-4-3-2-1', description: 'Sử dụng các giác quan để kết nối với hiện tại', duration: '5 phút', category: 'mindfulness', thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&h=300&fit=crop' },
  { id: 5, title: 'Tâm từ bi', description: 'Nuôi dưỡng lòng trắc ẩn đối với bản thân', duration: '8 phút', category: 'meditation', thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop' },
  { id: 6, title: 'Thư giãn lũy tiến', description: 'Giải phóng căng thẳng cơ bắp có hệ thống', duration: '12 phút', category: 'relaxation', thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop' },
];

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'breathing', label: 'Luyện thở' },
  { id: 'meditation', label: 'Thiền định' },
  { id: 'mindfulness', label: 'Chánh niệm' },
];

const CATEGORY_COLORS: Record<string, string> = {
  breathing: 'bg-peace-serene/15 text-peace-trust',
  meditation: 'bg-nature-balance/20 text-[#3D5A80]',
  mindfulness: 'bg-nature-fresh/15 text-[#2D5A2D]',
  relaxation: 'bg-sleep-restful/15 text-sleep-restful',
};

/**
 * First-Aid Library — filterable grid of exercise cards with play buttons.
 * All filter logic uses React useState (no DOM manipulation).
 */
export default function FirstAidLibrary() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { recommendations, isLoading } = useRecommendations();

  const enrichRecommendation = (title: string) => {
    const found = EXERCISES.find(
      (ex) => ex.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(ex.title.toLowerCase())
    );
    if (found) return found;
    return {
      id: crypto.randomUUID(),
      title: title,
      description: 'Được đề xuất cho trạng thái tâm trạng hiện tại của bạn.',
      duration: '5 phút',
      category: title.toLowerCase().includes('breath') ? 'breathing' : 'relaxation',
      thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&h=300&fit=crop',
    };
  };

  const displayList = recommendations && recommendations.length > 0 
    ? recommendations.map(enrichRecommendation)
    : [];

  const filtered = activeFilter === 'all'
    ? displayList
    : displayList.filter((ex) => ex.category === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-white" id="first-aid-library">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header + Filters */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-peace-trust bg-peace-trust/10 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3" /> Sơ cứu tâm lý
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E]">
              Thư viện Sơ cứu Cảm xúc
            </h2>
            <p className="text-[#4A5568] mt-2">
              Các bài tập nhanh để xoa dịu tâm trí bạn trong tức khắc
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                  border cursor-pointer transition-all duration-base
                  ${
                    activeFilter === f.id
                      ? 'bg-peace-trust border-peace-trust text-white hover:bg-peace-serene hover:border-peace-serene'
                      : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-peace-serene hover:bg-peace-serene/5'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty / Data States */}
        {isLoading ? (
           <div className="text-center py-10 text-[#4A5568]">Đang tải các đề xuất cho bạn...</div>
        ) : recommendations.length === 0 ? (
           <div className="bg-white rounded-2xl p-10 text-center shadow-soft-sm border border-gray-100">
             <div className="w-16 h-16 bg-peace-trust/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <Sparkles className="w-8 h-8 text-peace-trust" />
             </div>
             <p className="text-[#1A1A2E] font-medium text-lg">
               MSG01: Không tìm thấy dữ liệu. Hãy bắt đầu hành trình bằng cách kiểm tra tâm trạng ngay hôm nay!
             </p>
           </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((ex) => (
              <div
                key={ex.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-base cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden">
                  <img
                    src={ex.thumbnail}
                    alt={ex.title}
                    className="w-full h-44 object-cover transition-transform duration-slow group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play button overlay */}
                  <button
                    aria-label={`Phát bài ${ex.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-base cursor-pointer border-none"
                  >
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-base">
                      <Play className="w-6 h-6 text-peace-trust ml-0.5" />
                    </div>
                  </button>
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                    <Clock className="w-3 h-3" /> {ex.duration}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-heading text-lg text-[#1A1A2E] mb-1">{ex.title}</h3>
                  <p className="text-sm text-[#4A5568]">{ex.description}</p>
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[ex.category] || ''}`}
                    >
                      {ex.category.charAt(0).toUpperCase() + ex.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
