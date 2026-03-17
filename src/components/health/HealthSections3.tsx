import { useState } from 'react';

const WHY_FEATURES = [
  {
    id: 'support',
    title: 'Hỗ trợ',
    desc: 'Kết nối cá nhân với các nguồn lực phù hợp dựa trên mục tiêu và kết quả sàng lọc',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&fit=crop',
  },
  {
    id: 'expertise',
    title: 'Chuyên môn',
    desc: 'Cung cấp các chương trình lâm sàng do các nhà tâm lý học phát triển nhằm giải quyết các thách thức sức khỏe tâm thần thường bị bỏ qua',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop',
  },
  {
    id: 'guidance',
    title: 'Hướng dẫn',
    desc: 'Hướng dẫn cá nhân đến các lợi ích và nguồn lực khác do nhà tuyển dụng hoặc chương trình bảo hiểm y tế tài trợ',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&fit=crop',
  },
  {
    id: 'engagement',
    title: 'Sự tương tác',
    desc: "Mang lại tỷ lệ tương tác hàng đầu trong ngành — thúc đẩy sự tham gia vào các lợi ích và dịch vụ khác của tổ chức bạn",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop',
  }
];

export function HealthWhy() {
  const [activeFeature, setActiveFeature] = useState('expertise');
  
  const current = WHY_FEATURES.find(f => f.id === activeFeature) || WHY_FEATURES[1];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#F3F4F6]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[2rem] md:text-[2.5rem] font-heading text-[#1473B6] italic mb-4">Tại sao chọn UniCare Health?</h2>
          <p className="text-[#5A6B7A] max-w-2xl mx-auto">
            Các chương trình lâm sàng và nội dung chánh niệm của chúng tôi thúc đẩy sự tương tác trong UniCare Health và hệ sinh thái lợi ích của bạn, tạo ra tác động ý nghĩa cho tổ chức của bạn.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-[1000px] mx-auto">
          {/* Image */}
          <div className="relative rounded-[2rem] overflow-hidden shadow-lg h-[400px]">
            <img 
              key={current.id}
              src={current.image} 
              alt={current.title}
              className="w-full h-full object-cover animate-in fade-in duration-500" 
            />
            {/* Overlay card - static to match the original layout from project_final */}
            <div className="absolute bottom-6 right-6 w-[120px] bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E7EB] p-3 text-left">
              <div className="w-full h-10 rounded-lg overflow-hidden mb-2">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=80&fit=crop" className="w-full h-full object-cover" alt="" />
              </div>
              <p className="text-[0.4rem] text-[#9CA3AF] mb-0.5">7 Phiên</p>
              <p className="text-[0.5rem] text-[#1473B6] mb-0.5">Thiền định</p>
              <p className="text-[0.625rem] font-medium text-[#1A1A2E]">Quét cơ thể</p>
              <p className="text-[0.5rem] text-[#9CA3AF]">Tamara Levitt</p>
            </div>
          </div>
          {/* Features */}
          <div className="space-y-2">
            {WHY_FEATURES.map((feature) => {
              const isActive = feature.id === activeFeature;
              return (
                <div 
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isActive 
                      ? 'bg-[#F8FAFC] rounded-r-lg border-l-[3px] border-[#1473B6]' 
                      : 'border-l-[3px] border-transparent hover:bg-gray-50'
                  }`}
                >
                  <h4 className="font-heading text-[#003145] text-[1.125rem] mb-1">{feature.title}</h4>
                  <p className="text-[0.875rem] text-[#5A6B7A] leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HealthAction() {
  return (
    <section className="relative overflow-hidden w-full">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1920&h=600&fit=crop" 
          alt="Person running in nature"
          className="w-full h-[480px] md:h-[520px] object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1200px] mx-auto px-6 w-full">
            <div className="max-w-[480px]">
              <h2 className="text-2xl md:text-[2.25rem] font-heading text-white leading-[1.2] mb-6">
                Thực hiện bước tiếp theo để nâng cao mức độ tương tác với sức khỏe tâm thần
              </h2>
              <button className="px-6 py-2.5 rounded-full border-white text-white border-2 bg-transparent font-medium hover:bg-white/10 transition-colors cursor-pointer w-fit text-sm">
                Liên hệ với chúng tôi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
