import {
  ForumSidebarLeft,
  ForumSidebarRight,
  ForumFeed,
} from '../components/forum';

/**
 * Mindfulness Community Forum Page
 * 3-Column Layout: Left Sidebar (Nav) | Feed | Right Sidebar (Mentor/Online)
 */
export default function MindfulnessPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-8"
      style={{
        background:
          'linear-gradient(135deg, rgba(244,241,234,1) 0%, #FFFFFF 50%, rgba(149,185,199,0.1) 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr_280px] gap-6">
          <ForumSidebarLeft />
          <ForumFeed />
          <ForumSidebarRight />
        </div>
      </div>
    </div>
  );
}
