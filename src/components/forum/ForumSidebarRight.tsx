import { Users, Phone, Mail, ChevronDown } from 'lucide-react';

/* ── Mock Data ── */
const FEATURED_MENTOR = {
  name: 'Dr. Michael Torres',
  role: 'Lead Instructor',
  avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face',
  phone: '+1 (555) 234-5678',
  email: 'dr.torres@unicare.com',
  topic: 'Meditation Basics',
};

const ONLINE_USERS = [
  { name: 'Leslie Alexander', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face', online: true },
  { name: 'Darlene Robertson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', online: true },
  { name: 'Albert Flores', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', online: true },
  { name: 'Jane Cooper', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face', online: false },
  { name: 'Brooklyn Simmons', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop&crop=face', online: true },
  { name: 'Cameron Wilson', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face', online: false },
  { name: 'Jenny Wilson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face', online: true },
];

export default function ForumSidebarRight() {
  const onlineCount = ONLINE_USERS.filter((u) => u.online).length;

  return (
    <aside className="hidden xl:block sticky top-24 h-fit bg-white p-6 rounded-2xl shadow-soft-sm">
      {/* Topic Header */}
      <div className="text-center mb-6">
        <h3 className="font-heading text-lg text-[#1A1A2E]">{FEATURED_MENTOR.topic}</h3>
        <p className="text-xs text-peace-safe mt-1">Nhóm: MB102</p>
      </div>

      {/* Mentor Card */}
      <div
        className="p-5 rounded-2xl text-center"
        style={{
          background:
            'linear-gradient(135deg, rgba(149, 185, 199, 0.15) 0%, rgba(164, 208, 164, 0.15) 100%)',
        }}
      >
        <img
          src={FEATURED_MENTOR.avatar}
          alt={FEATURED_MENTOR.name}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-soft-sm"
        />
        <h4 className="font-heading text-lg text-[#1A1A2E]">{FEATURED_MENTOR.name}</h4>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-nature-fresh text-white rounded-full text-xs font-semibold mt-2 shadow-sm">
          <Users className="w-3.5 h-3.5" />
          {FEATURED_MENTOR.role === 'Lead Instructor' ? 'Giảng viên chính' : FEATURED_MENTOR.role}
        </div>

        <div className="mt-5 space-y-2">
          <a
            href={`tel:${FEATURED_MENTOR.phone}`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-peace-trust hover:bg-white/60 transition-colors duration-base no-underline text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            <span>{FEATURED_MENTOR.phone}</span>
          </a>
          <a
            href={`mailto:${FEATURED_MENTOR.email}`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-peace-trust hover:bg-white/60 transition-colors duration-base no-underline text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">{FEATURED_MENTOR.email}</span>
          </a>
        </div>
      </div>

      {/* Online Users */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm font-semibold text-[#1A1A2E]">
            {onlineCount} đang trực tuyến
          </span>
          <ChevronDown className="w-4 h-4 text-peace-safe" />
        </div>

        <div className="space-y-3">
          {ONLINE_USERS.map((user, i) => (
            <div key={i} className="flex items-center gap-3 px-1">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-nature-fresh border-2 border-white rounded-full translate-x-1/4 translate-y-1/4" />
                )}
              </div>
              <span className="text-sm font-medium text-[#1A1A2E] truncate">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
