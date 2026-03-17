import { Shield, Building, GraduationCap, Check } from 'lucide-react';

export function HealthHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-28 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="max-w-[520px]">
            <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.75rem] font-heading text-[#003145] leading-[1.15] mb-6">
              Giải pháp sức khỏe tinh thần được xây dựng dựa trên sự{' '}
              <span className="text-[#1473B6]">tương tác</span>
            </h1>
            <p className="text-[#5A6B7A] text-base md:text-[1.0625rem] leading-relaxed mb-8">
              UniCare Health hỗ trợ các cá nhân trên toàn cầu giải quyết các vấn đề khó khăn trong cuộc sống với các chương trình dựa trên bằng chứng khoa học và nội dung chánh niệm được thiết kế để tối đa hóa sự tương tác.
            </p>
            <button
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-[0.9375rem] font-semibold bg-[#1473B6] hover:bg-[#0D4F8B] text-white border-none cursor-pointer transition-all duration-200 shadow-[0_2px_8px_rgba(20,115,182,0.25)] hover:shadow-[0_4px_14px_rgba(20,115,182,0.35)] hover:-translate-y-[1px]"
              onClick={() => {
                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Yêu cầu tư vấn
            </button>
          </div>

          {/* Right: Circular Hero Image with floating cards */}
          <div className="relative hidden lg:flex justify-center">
            {/* Main circular image */}
            <div className="relative w-[440px] h-[440px]">
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces"
                  alt="Professional woman using wellness app"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card: top-left - app screenshot preview */}
              <div className="absolute -top-4 -left-10 bg-white rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[180px] animate-in slide-in-from-bottom flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#1473B6] flex items-center justify-center">
                    <span className="text-white text-[0.5rem] font-bold">UC</span>
                  </div>
                  <span className="text-[0.625rem] text-[#9CA3AF]">UniCare Lâm sàng • 9 Phiên</span>
                </div>
                <div className="w-full h-[60px] rounded-lg overflow-hidden mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=200&h=80&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-[#1A1A2E]">Sức khỏe tâm thần cho sinh viên</p>
                <p className="text-[0.625rem] text-[#9CA3AF]">Kate Johnson</p>
              </div>

              {/* Floating card: bottom-right - track card */}
              <div className="absolute -bottom-2 -right-8 bg-white rounded-xl p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[180px] animate-in slide-in-from-top flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#A4D0A4]"></div>
                  <span className="text-[0.625rem] text-[#9CA3AF]">Hành trình mỗi ngày</span>
                </div>
                <div className="w-full h-[60px] rounded-lg overflow-hidden mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=80&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-[#1A1A2E]">Vô cực về mọi hướng</p>
                    <p className="text-[0.625rem] text-[#9CA3AF]">Jeff Warren</p>
                  </div>
                  <button className="text-[#9CA3AF] hover:text-[#E57373] transition-colors bg-transparent border-none cursor-pointer">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Info Cards ── */
const CATEGORIES = [
  {
    title: 'Gói bảo hiểm',
    desc: 'Hỗ trợ các thành viên của bạn và tăng cường sự gắn kết với các lợi ích',
    icon: Shield,
  },
  {
    title: 'Doanh nghiệp',
    desc: 'Đầu tư vào đội ngũ của bạn và mở khóa các lợi ích cho toàn bộ tổ chức',
    icon: Building,
  },
  {
    title: 'Tư vấn viên',
    desc: 'Mang lại kết quả tốt hơn cho khách hàng của bạn và tối đa hóa giá trị',
    icon: GraduationCap,
  },
];

export function HealthCategories() {
  return (
    <section className="py-8 bg-white border-t border-[#F3F4F6]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] cursor-pointer"
              >
                <div className="mb-4 text-[#1473B6]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg text-[#003145] mb-1">{cat.title}</h3>
                <p className="text-sm text-[#5A6B7A] mb-3">{cat.desc}</p>
                <div className="inline-flex items-center text-[0.875rem] font-medium text-[#1473B6] hover:text-[#0D4F8B] hover:underline transition-colors">
                  Tìm hiểu thêm
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── "Get to know UniCare Health" ── */
const FEATURES_LIST = [
  'Các chương trình lâm sàng do chuyên gia tâm lý phát triển, giải quyết các trải nghiệm cuộc sống, tình trạng sức khỏe và các thách thức đặc thù nghề nghiệp',
  'Tài nguyên thiền định, giấc ngủ và chánh niệm đáng tin cậy từ UniCare',
  'Các bài kiểm tra sức khỏe tâm thần đơn giản, đã được xác thực cho trải nghiệm cá nhân hóa',
  'Kế hoạch hành động cá nhân hóa với các đề xuất về lợi ích và tài nguyên sức khỏe tâm thần liên quan do tổ chức của bạn cung cấp',
  'Dữ liệu mạnh mẽ cho các thông tin chi tiết có thể thực hiện được',
];

export function HealthBenefits() {
  return (
    <section className="py-20 md:py-28 bg-white" id="benefits-section">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text with checkmarks */}
          <div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-heading leading-[1.2] mb-10">
              <span className="text-[#1473B6]">Tìm hiểu về</span>
              <br />
              <span className="text-[#1473B6]">UniCare Health</span>
            </h2>
            <div className="space-y-5">
              {FEATURES_LIST.map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#22C55E] to-[#16A34A]">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <p className="text-[#374151] text-[0.9375rem] leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: App Mockup Collage */}
          <div className="relative hidden lg:block">
            <div className="relative flex justify-center">
              {/* Main phone mockup */}
              <div className="relative z-10 w-[260px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-[#E5E7EB]">
                <div className="p-4 pb-2">
                  <p className="text-[0.6rem] text-[#9CA3AF] mb-0.5">Chào buổi sáng</p>
                  <p className="text-sm font-heading text-[#1A1A2E] font-semibold mb-3">
                    Bắt đầu bước tiếp theo hôm nay
                  </p>
                  <div className="bg-[#EEF2FF] rounded-xl p-3 mb-3">
                    <p className="text-[0.625rem] text-[#6B7280] mb-1">
                      Tham gia chương trình Vượt qua Trầm cảm với Công cụ Thực tế để bắt đầu.
                    </p>
                    <button className="bg-[#1473B6] text-white text-[0.625rem] px-3 py-1.5 rounded-full font-medium border-none cursor-pointer">
                      Tham gia ngay
                    </button>
                  </div>
                  <p className="text-[0.6rem] text-[#9CA3AF] mb-2">Dành cho bạn</p>
                  <div className="flex items-center gap-2 p-2 bg-[#F9FAFB] rounded-lg">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[0.625rem] text-[#9CA3AF]">Chuyện ngủ</p>
                      <p className="text-xs font-medium text-[#1A1A2E]">Chuyến tàu đêm Nordland</p>
                      <p className="text-[0.5rem] text-[#9CA3AF]">Erik Braa</p>
                    </div>
                  </div>
                </div>
                {/* Daily Calm bar */}
                <div className="bg-[#EBF5FF] p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">☀</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#1A1A2E]">Phút tĩnh lặng</p>
                    <p className="text-[0.5rem] text-[#6B7280]">Tamara Levitt</p>
                  </div>
                </div>
              </div>

              {/* Side card: left */}
              <div className="absolute left-0 top-10 w-[140px] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] overflow-hidden border border-[#E5E7EB] z-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=120&fit=crop"
                  alt=""
                  className="w-full h-[70px] object-cover"
                />
                <div className="p-2">
                  <p className="text-[0.5rem] text-[#9CA3AF]">Bậc thầy Chánh niệm</p>
                  <p className="text-[0.625rem] font-medium text-[#1A1A2E]">Quét cơ thể</p>
                </div>
              </div>

              {/* Side cards: right stack */}
              <div className="absolute right-0 top-4 flex flex-col gap-3 z-0">
                <div className="w-[120px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-3">
                  <p className="text-[0.625rem] text-[#1A1A2E] font-medium mb-1">Lo âu</p>
                  <div className="h-[40px] flex items-end gap-1">
                    <div className="w-3 bg-[#1473B6]/30 rounded-sm" style={{ height: '60%' }}></div>
                    <div className="w-3 bg-[#1473B6]/30 rounded-sm" style={{ height: '80%' }}></div>
                    <div className="w-3 bg-[#1473B6]/30 rounded-sm" style={{ height: '45%' }}></div>
                    <div className="w-3 bg-[#1473B6]/30 rounded-sm" style={{ height: '90%' }}></div>
                    <div className="w-3 bg-[#1473B6]/30 rounded-sm" style={{ height: '50%' }}></div>
                  </div>
                </div>
                <div className="w-[120px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-3">
                  <p className="text-[0.625rem] text-[#1A1A2E] font-medium mb-1">Trầm cảm</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-[0.625rem] text-[#9CA3AF] leading-tight">
                      Vượt qua Trầm cảm<br />Với Công cụ Thực tế
                    </p>
                  </div>
                </div>
                <div className="w-[120px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-[#1473B6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
                    <p className="text-[0.625rem] text-[#1A1A2E] font-medium">Xu hướng dữ liệu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
