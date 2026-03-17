import { useState, useCallback } from 'react';
import { useMoodSubmit } from '../../hooks/useMoodSubmit';
import { useRecommendations } from '../../hooks/useRecommendations';

/* ── Mood data ── */
const MOODS = [
  {
    value: 1,
    label: 'Rất tệ',
    paths: ['M16 16s-1.5-2-4-2-4 2-4 2', 'M9 9h.01', 'M15 9h.01'],
    selectedColor: 'bg-[#E57373] border-[#E57373]',
    selectedShadow: '0 4px 14px rgba(229, 115, 115, 0.4)',
  },
  {
    value: 2,
    label: 'Tệ',
    paths: ['M8 15h8', 'M9 9h.01', 'M15 9h.01'],
    selectedColor: 'bg-[#FFB74D] border-[#FFB74D]',
    selectedShadow: '0 4px 14px rgba(255, 183, 77, 0.4)',
  },
  {
    value: 3,
    label: 'Bình thường',
    paths: ['M8 15h8', 'M9 9h.01', 'M15 9h.01'],
    selectedColor: 'bg-peace-safe border-peace-safe',
    selectedShadow: '',
  },
  {
    value: 4,
    label: 'Tốt',
    paths: ['M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
    selectedColor: 'bg-nature-balance border-nature-balance',
    selectedShadow: '',
  },
  {
    value: 5,
    label: 'Tuyệt vời',
    paths: ['M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01'],
    selectedColor: 'bg-nature-fresh border-nature-fresh',
    selectedShadow: '0 4px 14px rgba(164, 208, 164, 0.4)',
  },
];

const STRESS_TAGS = [
  'Hạn chót',
  'Tài chính',
  'Mối quan hệ',
  'Công việc',
  'Sức khỏe',
  'Giấc ngủ',
  'Gia đình',
  'Cô đơn',
];

export default function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const { fetchRecommendations } = useRecommendations();
  const { submitMood, isLoading } = useMoodSubmit(() => {
    setSaved(true);
    fetchRecommendations();
    setTimeout(() => {
      setSelectedMood(null);
      setSelectedTags([]);
      setNote('');
      setSaved(false);
    }, 1500);
  });

  const handleSave = useCallback(async () => {
    if (!selectedMood) {
      alert('Vui lòng chọn tâm trạng của bạn trước');
      return;
    }
    
    await submitMood({
      score: selectedMood,
      tags: selectedTags,
      note,
    });

  }, [selectedMood, selectedTags, note, submitMood]);

  return (
    <section
      className="py-16 md:py-20"
      style={{
        background:
          'linear-gradient(135deg, rgba(164,208,164,0.08) 0%, rgba(178,201,225,0.12) 50%, rgba(244,241,234,1) 100%)',
      }}
    >
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #A4D0A4, #B2C9E1)' }}
            >
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" x2="9.01" y1="9" y2="9" />
                <line x1="15" x2="15.01" y1="9" y2="9" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-lg text-[#1A1A2E]">Theo dõi tâm trạng</h3>
              <p className="text-sm text-[#4A5568]">Hôm nay bạn cảm thấy thế nào?</p>
            </div>
          </div>

          {/* Mood Icons */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#1A1A2E] mb-4">
              Chọn tâm trạng
            </label>
            <div className="flex justify-between gap-2">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood.value;
                return (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    title={mood.label}
                    aria-label={mood.label}
                    className={`
                      flex items-center justify-center w-14 h-14 rounded-2xl border-2
                      cursor-pointer transition-all duration-base
                      ${
                        isSelected
                          ? `${mood.selectedColor} text-white`
                          : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] hover:border-peace-serene hover:text-peace-trust hover:-translate-y-0.5 hover:shadow-soft-md'
                      }
                    `}
                    style={isSelected && mood.selectedShadow ? { boxShadow: mood.selectedShadow } : undefined}
                  >
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      {mood.paths.map((d, i) => (
                        <path key={i} d={d} />
                      ))}
                    </svg>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-[#9CA3AF] mt-2 px-1">
              <span>Rất tệ</span>
              <span>Rất tốt</span>
            </div>
          </div>

          {/* Stress Tags */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#1A1A2E] mb-4">
              Bạn đang nghĩ gì?
            </label>
            <div className="flex flex-wrap gap-2">
              {STRESS_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                      border cursor-pointer transition-all duration-base
                      ${
                        isSelected
                          ? 'bg-peace-trust border-peace-trust text-white hover:bg-peace-serene hover:border-peace-serene'
                          : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#374151] hover:border-peace-serene hover:bg-[rgba(149,185,199,0.08)]'
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#1A1A2E] mb-2">
              Thêm ghi chú (tùy chọn)
            </label>
            <textarea
              className="w-full p-3 rounded-soft bg-[#F9FAFB] border border-[#E5E7EB] text-[#1A1A2E] font-body resize-none h-20 transition-all duration-base placeholder:text-[#9CA3AF] focus:outline-none focus:border-peace-trust focus:ring-[3px] focus:ring-peace-trust/15"
              placeholder="Viết về rảm giác của bạn..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`calm-cta-btn w-full ${isLoading || saved ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
            disabled={isLoading || saved}
          >
            {isLoading ? 'Đang lưu...' : saved ? '✓ Đã lưu!' : 'Lưu thông tin'}
          </button>
        </div>
      </div>
    </section>
  );
}
