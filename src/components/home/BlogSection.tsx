/**
 * Blog Section — "Check out our blog" with 4-column card grid.
 */

const BLOGS = [
  {
    title: 'Cách rèn luyện tư duy tích cực',
    category: 'Chăm sóc bản thân',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
  },
  {
    title: 'Sử dụng thiền giữa trưa để vượt qua cơn buồn ngủ buổi chiều',
    category: 'Thiền định & Chánh niệm',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  },
  {
    title: "Làm sao để ngừng kiểm soát (và tại sao điều đó lại khó)",
    category: 'Phát triển cá nhân',
    img: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop',
  },
  {
    title: 'Những dấu hiệu của kiểu gắn bó thiếu an toàn là gì?',
    category: 'Mối quan hệ',
    img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=300&fit=crop',
  },
];

export default function BlogSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{ background: 'linear-gradient(180deg, #F4F1EA 0%, #FFFFFF 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] text-center mb-4">
          Khám phá blog của chúng tôi để tìm hiểu thêm về thiền định,
        </h2>
        <p className="text-2xl md:text-3xl font-heading text-[#1A1A2E] text-center mb-12">
          giấc ngủ, căng thẳng và các tài nguyên sức khỏe tâm thần.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOGS.map((blog) => (
            <div key={blog.title} className="cursor-pointer group">
              <div className="overflow-hidden rounded-2xl mb-4">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-slow group-hover:scale-105"
                />
              </div>
              <span className="text-sm text-peace-trust font-medium">{blog.category}</span>
              <h4 className="font-heading text-[#1A1A2E] mt-1 leading-snug">{blog.title}</h4>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="text-[#1A1A2E] font-medium underline underline-offset-4 hover:text-peace-trust transition-colors duration-base cursor-pointer"
          >
            Xem tất cả bài viết
          </a>
        </div>
      </div>
    </section>
  );
}
