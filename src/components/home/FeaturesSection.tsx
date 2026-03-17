import { Link } from 'react-router-dom';

/**
 * "We're here to help you feel better." — 3-column feature grid.
 * Stress Less, Sleep More, Live Mindfully.
 */

/* ── Custom SVG icons matching the original design ── */
function StressIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <rect x="4" y="8" width="16" height="22" rx="3" stroke="#95B9C7" strokeWidth="2" />
      <rect x="26" y="14" width="16" height="16" rx="3" stroke="#95B9C7" strokeWidth="2" />
      <line x1="8" y1="18" x2="16" y2="18" stroke="#95B9C7" strokeWidth="2" />
      <line x1="8" y1="22" x2="14" y2="22" stroke="#95B9C7" strokeWidth="2" />
      <circle cx="34" cy="22" r="3" stroke="#95B9C7" strokeWidth="2" fill="none" />
    </svg>
  );
}

function SleepIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <path
        d="M24 8C18 8 13 13 13 19c0 6 5 11 11 11s11-5 11-11"
        stroke="#B4BCC8"
        strokeWidth="2"
        fill="none"
      />
      <text x="20" y="24" fontSize="10" fill="#B4BCC8" fontFamily="sans-serif">z</text>
      <text x="26" y="20" fontSize="8" fill="#B4BCC8" fontFamily="sans-serif">z</text>
      <text x="30" y="16" fontSize="6" fill="#B4BCC8" fontFamily="sans-serif">z</text>
    </svg>
  );
}

function MindfulnessIcon() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
      <path d="M24 12c-8 0-14 6-14 14" stroke="#95B9C7" strokeWidth="2" fill="none" />
      <path d="M24 12c8 0 14 6 14 14" stroke="#95B9C7" strokeWidth="2" fill="none" />
      <path d="M20 26c0 0 2 4 4 4s4-4 4-4" stroke="#95B9C7" strokeWidth="2" fill="none" />
      <circle cx="24" cy="34" r="2" fill="#95B9C7" />
    </svg>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTo: string;
  linkLabel: string;
}

function FeatureCard({ icon, title, description, linkTo, linkLabel }: FeatureCardProps) {
  return (
    <div>
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl md:text-2xl font-heading text-[#1A1A2E] mb-3">{title}</h3>
      <p className="text-[#4A5568] leading-relaxed mb-4">{description}</p>
      <Link
        to={linkTo}
        className="text-[#1A1A2E] font-medium underline underline-offset-4 cursor-pointer hover:text-peace-trust transition-colors duration-base"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-heading text-[#1A1A2E] text-center mb-16">
          Chúng tôi ở đây để giúp bạn cảm thấy tốt hơn.
        </h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <FeatureCard
            icon={<StressIcon />}
            title="Giảm căng thẳng."
            description="Giải tỏa căng thẳng và lo âu tức thì để bạn tận hưởng cuộc sống trọn vẹn hơn."
            linkTo="/stress-anxiety"
            linkLabel="Tìm hiểu thêm"
          />
          <FeatureCard
            icon={<SleepIcon />}
            title="Ngủ ngon hơn."
            description="Đi vào giấc ngủ (và ngủ sâu) một cách tự nhiên và bình yên với các bài hướng dẫn."
            linkTo="/mindfulness"
            linkLabel="Tìm hiểu thêm"
          />
          <FeatureCard
            icon={<MindfulnessIcon />}
            title="Sống tỉnh thức."
            description="Vượt qua những thăng trầm của cuộc sống với sự kiên cường, tự tin và sự hỗ trợ hướng dẫn."
            linkTo="/mindfulness"
            linkLabel="Tìm hiểu thêm"
          />
        </div>
      </div>
    </section>
  );
}
