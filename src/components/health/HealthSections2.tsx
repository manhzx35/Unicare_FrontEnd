
import partnerVideo from '../../assets/Yêu_cầu_video_theo_mẫu.mp4';

/* ── "A proven partner for the journey ahead" ── */
export function HealthPartner() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <h2 className="text-[1.75rem] md:text-[2.5rem] font-heading text-[#003145] leading-[1.2] mb-4">
          Đối tác tin cậy trên hành trình phía trước
        </h2>
        <p className="text-[#5A6B7A] text-base md:text-[1.0625rem] mb-12">
          Khám phá cách UniCare Health hướng dẫn mọi người đến với sự hỗ trợ sức khỏe tâm thần phù hợp và duy trì sự gắn kết trên suốt hành trình.
        </p>
        
        {/* Video Showcase */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)] aspect-video bg-gray-100">
          <video 
            src={partnerVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          >
            Trình duyệt của bạn không hỗ trợ tag video.
          </video>
        </div>
      </div>
    </section>
  );
}

/* ── "Best-in-class engagement" (Concentric Gradient Orbs) ── */
const STATS = [
  {
    value: '38%',
    label: 'số người đăng ký tham gia các chương trình lâm sàng',
    outerRing: { background: 'linear-gradient(180deg, #E0EFFF 0%, #C7DFFC 100%)' },
    midRing: { background: 'linear-gradient(180deg, #A8D0F8 0%, #7BB8F0 100%)' },
    innerCircle: { background: 'linear-gradient(180deg, #4A9DE8 0%, #1473B6 100%)' },
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
  {
    value: '77%',
    label: 'số người đăng ký đã hoàn thành bài kiểm tra sức khỏe tâm thần',
    outerRing: { background: 'linear-gradient(180deg, #EDE9FE 0%, #DDD6FE 100%)' },
    midRing: { background: 'linear-gradient(180deg, #C4B5FD 0%, #A78BFA 100%)' },
    innerCircle: { background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 100%)' },
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
        <path d="M12 18v-5" />
      </svg>
    ),
  },
  {
    value: '37%',
    label: 'người dùng có kết quả kiểm tra lo âu hoặc trầm cảm từ trung bình đến nặng đã tham gia trị liệu*',
    outerRing: { background: 'linear-gradient(180deg, #FFE4E1 0%, #FDD5CF 100%)' },
    midRing: { background: 'linear-gradient(180deg, #FBB5A5 0%, #F8967F 100%)' },
    innerCircle: { background: 'linear-gradient(180deg, #F97066 0%, #EF5744 100%)' },
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export function HealthEngagement() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="text-[1.75rem] md:text-[2.5rem] font-heading text-[#1473B6] italic mb-4">
          Sự gắn kết hàng đầu
        </h2>
        <p className="text-[#5A6B7A] text-[0.9375rem] mb-16 max-w-2xl mx-auto">
          UniCare Health mang lại những trải nghiệm thúc đẩy sự kích hoạt, tham gia và kết quả kinh doanh
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-[900px] mx-auto mb-8">
          {STATS.map((s, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 pt-8 pb-7 border border-[#E5E7EB] flex flex-col items-center text-center transition-all duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] group"
              >
                {/* Concentric Orbs */}
                <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                  {/* Outer */}
                  <div className="rounded-full w-[180px] h-[180px] flex items-center justify-center opacity-60" style={s.outerRing}>
                    {/* Mid */}
                    <div className="w-[130px] h-[130px] rounded-full flex items-center justify-center opacity-85" style={s.midRing}>
                      {/* Inner */}
                      <div className="w-[85px] h-[85px] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.15)]" style={s.innerCircle}>
                        {s.icon}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[2.25rem] font-heading text-[#003145] mb-2 mt-6 leading-none">
                  {s.value}
                </p>
                <p className="text-sm text-[#5A6B7A] leading-relaxed">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-[0.75rem] text-[#9CA3AF] text-right max-w-[900px] mx-auto mb-8">
          *Kết quả từ một đơn vị bảo hiểm quốc gia
        </p>

        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#003145] text-[#003145] font-medium text-sm bg-transparent hover:bg-[#003145]/5 transition-all cursor-pointer no-underline">
          Tìm hiểu thêm
        </a>
      </div>
    </section>
  );
}
