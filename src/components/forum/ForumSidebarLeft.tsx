import { Home, MessageSquare, Bookmark, ChevronDown, Plus } from 'lucide-react';

/* ── Mock Data ── */
const NAV_LINKS = [
  { id: 'home', label: 'Trang chủ', icon: Home, active: true },
  { id: 'threads', label: 'Chủ đề của bạn', icon: MessageSquare },
  { id: 'saved', label: 'Đã lưu', icon: Bookmark },
];

const TOPICS = [
  { id: 1, name: 'Quản lý Căng thẳng', code: 'SM101', count: 5, color: 'bg-peace-trust' },
  { id: 2, name: 'Cơ bản về Thiền', code: 'MB102', count: 3, color: 'bg-nature-fresh', active: true },
  { id: 3, name: 'Sức khỏe Giấc ngủ', code: 'SW103', count: 2, color: 'bg-sleep-deep' },
  { id: 4, name: 'Giảm bớt Lo âu', code: 'AR104', count: 0, color: 'bg-peace-serene' },
  { id: 5, name: 'Ăn uống Chánh niệm', code: 'ME105', count: 1, color: 'bg-warmth-care' },
];

export default function ForumSidebarLeft() {
  return (
    <aside className="hidden md:block sticky top-24 h-fit bg-white p-6 rounded-2xl shadow-soft-sm">
      {/* Navigation */}
      <nav className="mb-6 space-y-1">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer border-none text-left
                transition-colors duration-base
                ${
                  link.active
                    ? 'bg-peace-serene/15 text-peace-trust font-semibold'
                    : 'bg-white text-peace-trust hover:bg-peace-serene/10'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Current Topics */}
      <div className="mb-6">
        <button className="flex items-center justify-between w-full text-sm font-medium text-[#1A1A2E] mb-3 cursor-pointer bg-white border-none py-1">
          <span>Chủ đề Hiện tại ({TOPICS.length})</span>
          <ChevronDown className="w-4 h-4 text-peace-safe" />
        </button>

        <div className="space-y-1">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              className={`
                flex items-center gap-3 w-full px-3 py-2.5 rounded-xl cursor-pointer border-none text-left
                transition-colors duration-base
                ${
                  topic.active
                    ? 'bg-peace-trust text-white'
                    : 'bg-transparent hover:bg-peace-serene/10'
                }
              `}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${topic.color}`} />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm truncate font-medium ${
                    topic.active ? 'text-white' : 'text-[#1A1A2E]'
                  }`}
                >
                  {topic.name}
                </div>
                <div
                  className={`text-xs ${
                    topic.active ? 'text-white/80' : 'text-peace-safe'
                  }`}
                >
                  {topic.code}
                </div>
              </div>
              {topic.count > 0 && (
                <span
                  className={`
                  px-2 py-0.5 rounded-full text-[10px] font-bold
                  ${
                    topic.active
                      ? 'bg-white/30 text-white'
                      : 'bg-peace-serene text-white'
                  }
                `}
                >
                  {topic.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Join Button */}
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-peace-trust text-white rounded-xl font-medium border-none cursor-pointer hover:bg-peace-serene transition-colors duration-base">
        <Plus className="w-5 h-5" />
        <span className="text-sm">Tham gia chủ đề mới</span>
      </button>

      {/* Archives */}
      <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
        <button className="flex items-center justify-between w-full text-sm text-peace-safe hover:text-peace-trust cursor-pointer bg-white border-none py-1 transition-colors">
          <span>Chủ đề 2025/2026</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-between w-full text-sm text-peace-safe hover:text-peace-trust cursor-pointer bg-white border-none py-1 mt-2 transition-colors">
          <span>Chủ đề 2024/2025</span>
          <span className="text-xs">28</span>
        </button>
      </div>
    </aside>
  );
}
