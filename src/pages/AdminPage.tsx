import { Shield } from 'lucide-react';

/** Placeholder — will be migrated from admin.ts in a later phase. Full-screen layout (no navbar/footer). */
export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background">
      <Shield className="w-12 h-12 text-peace-serene mb-4" />
      <h1 className="font-heading text-h1 text-[var(--color-text)] mb-2">Bảng điều khiển Quản trị</h1>
      <p className="text-body text-[var(--color-text-muted)]">Trang toàn màn hình — đang chờ di chuyển (Giai đoạn 2).</p>
    </div>
  );
}
