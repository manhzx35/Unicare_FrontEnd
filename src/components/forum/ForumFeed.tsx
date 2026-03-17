import { useState } from 'react';
import { Plus } from 'lucide-react';
import ForumPostCard, { type Post } from './ForumPostCard';

const INTIAL_POSTS: Post[] = [
  {
    id: 1,
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      role: 'Huấn luyện viên Sức khỏe',
    },
    time: '2 giờ trước',
    tags: ['Cơ bản về Thiền'],
    title: 'Cập nhật Vòng tròn Thiền hàng tuần',
    content: "Chào mọi người, tôi muốn chia sẻ một tin vui về buổi thiền định có hướng dẫn sắp tới vào thứ Bảy này. Chúng ta sẽ tập trung vào kỹ thuật quét cơ thể mà Tiến sĩ Thompson đã đề cập là đặc biệt hiệu quả cho người mới bắt đầu. Vui lòng mang theo gối ngồi thoải mái và sẵn sàng cho 30 phút thực hành.",
    responses: 8,
    saved: false,
    responders: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 2,
    author: {
      name: 'Dr. Michael Torres',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      role: 'Giảng viên chính',
    },
    time: '5 giờ trước',
    tags: ['Quản lý Căng thẳng', 'Cơ bản về Thiền'],
    title: 'Hội thảo Kỹ thuật Thở mới',
    content: "Cộng đồng thân mến, tôi rất vui mừng thông báo về hội thảo hít thở 4-7-8 mới của chúng ta bắt đầu vào tuần tới. Kỹ thuật này đã cho thấy kết quả rõ rệt trong việc giảm căng thẳng cấp tính. Chúng ta cũng sẽ tìm hiểu về thở hộp cho những ai quan tâm đến các phương pháp nâng cao. Đăng ký đã mở!",
    responses: 12,
    saved: true,
    responders: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 3,
    author: {
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Thành viên Cộng đồng',
    },
    time: '1 ngày trước',
    tags: ['Sức khỏe Giấc ngủ'],
    title: 'Đề xuất thiền ngủ?',
    content: "Có ai đã thử tính năng truyện ngủ mới chưa? Dạo này tôi gặp khó khăn với chứng mất ngủ và rất muốn nhận được lời khuyên từ cộng đồng. Những bài thực hành nào hiệu quả nhất với bạn?",
    responses: 15,
    saved: false,
    responders: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 4,
    author: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: 'Thành viên',
    },
    time: '2 ngày trước',
    tags: ['Ăn uống Chánh niệm'],
    title: 'Làm thế nào để bắt đầu ăn uống chánh niệm?',
    content: "Tôi nhận thấy mình thường ăn rất nhanh khi bị căng thẳng. Tôi muốn xây dựng mối quan hệ tốt hơn với thực phẩm. Bước đầu tiên tốt nhất để thực hành ăn uống chánh niệm là gì?",
    responses: 5,
    saved: false,
    responders: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 5,
    author: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      role: 'Chuyên gia trị liệu',
    },
    time: '3 ngày trước',
    tags: ['Giảm bớt Lo âu'],
    title: 'Kỹ thuật tĩnh tâm cho cơn hoảng loạn đột ngột',
    content: "Chỉ là một lời nhắc về kỹ thuật **5-4-3-2-1**. Khi bạn cảm thấy bị choáng ngợp, hãy tìm 5 thứ bạn có thể nhìn thấy, 4 thứ có thể chạm vào, 3 thứ có thể nghe thấy, 2 thứ có thể ngửi thấy và 1 thứ có thể nếm thấy. Nó giúp bạn kết nối lại với khoảnh khắc hiện tại.",
    responses: 32,
    saved: true,
    responders: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face',
    ],
  },
];

export default function ForumFeed() {
  const [newThreadInput, setNewThreadInput] = useState('');

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadInput.trim()) return;
    console.log('Creating thread:', newThreadInput);
    setNewThreadInput(''); // Form reset
  };

  return (
    <main className="min-w-0">
      {/* Create Thread Bar */}
      <form
        onSubmit={handleCreateThread}
        className="flex items-center gap-3 p-3 pl-5 bg-white rounded-2xl shadow-soft-sm mb-6 border border-[#E5E7EB] hover:shadow-soft-md transition-shadow duration-base focus-within:ring-[3px] focus-within:ring-peace-trust/20 focus-within:border-peace-trust"
      >
        <input
          type="text"
          value={newThreadInput}
          onChange={(e) => setNewThreadInput(e.target.value)}
          placeholder="Thêm một chủ đề mới..."
          className="flex-1 border-none bg-transparent font-medium text-peace-trust outline-none placeholder:text-peace-safe/70 placeholder:font-normal"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-peace-trust text-white flex items-center justify-center cursor-pointer border-none hover:bg-peace-serene hover:scale-105 transition-all duration-base flex-shrink-0"
          aria-label="Tạo chủ đề"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Posts Feed */}
      <div className="space-y-6">
        {INTIAL_POSTS.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
