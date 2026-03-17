import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart, List, Volume2, Timer } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  category: string;
  duration: string;
  durationSec: number;
  artwork: string;
  locked: boolean;
}

const currentTrack: Track = {
  id: 1,
  title: 'Sóng biển đêm',
  artist: 'Âm thanh UniCare',
  category: 'Giấc ngủ',
  duration: '45:00',
  durationSec: 2700,
  artwork: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=600&fit=crop',
  locked: false
};

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Mock progress

  const progressPercentage = (currentTime / currentTrack.durationSec) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-8 rounded-[2rem] bg-gradient-to-b from-[#191970] to-[#0D0D3A] shadow-soft-xl border border-white/5">
      
      {/* Centered Artwork */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <img 
          src={currentTrack.artwork} 
          alt={currentTrack.title} 
          className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`} 
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Track Info */}
      <div className="text-center mb-8 w-full flex flex-col items-center relative">
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#AAB8C2] hover:text-white transition-colors cursor-pointer"
          aria-label="Yêu thích"
        >
          <Heart className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-heading text-[#F0F4F8] mb-1.5 font-medium tracking-tight">
          {currentTrack.title}
        </h2>
        <p className="text-[#AAB8C2] text-[0.9375rem]">
          {currentTrack.artist} • {currentTrack.category}
        </p>
      </div>

      {/* Timeline Scrubber */}
      <div className="w-full flex items-center gap-4 mb-8">
        <span className="text-xs font-medium text-[#6A7F93] w-10 text-right">
          {formatTime(currentTime)}
        </span>
        <div 
          className="flex-1 h-2 bg-[#6A7F93]/30 rounded-full relative cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setCurrentTime(pct * currentTrack.durationSec);
          }}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-[#AAB8C2] rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${progressPercentage}% - 6px)` }}
          ></div>
        </div>
        <span className="text-xs font-medium text-[#6A7F93] w-10">
          {formatTime(currentTrack.durationSec)}
        </span>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-6 md:gap-8 w-full">
        <button 
          className="p-2 text-[#6A7F93] hover:text-[#AAB8C2] transition-colors cursor-pointer outline-none hidden sm:block"
          aria-label="Trộn bài"
        >
          <Shuffle className="w-5 h-5" />
        </button>
        
        <button 
          className="p-3 text-[#AAB8C2] hover:text-white transition-colors cursor-pointer outline-none"
          aria-label="Lùi lại"
        >
          <SkipBack className="w-8 h-8 fill-current" />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 md:w-20 md:h-20 bg-white text-[#191970] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-transform duration-200 cursor-pointer outline-none"
          aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          ) : (
            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
          )}
        </button>

        <button 
          className="p-3 text-[#AAB8C2] hover:text-white transition-colors cursor-pointer outline-none"
          aria-label="Tiếp theo"
        >
          <SkipForward className="w-8 h-8 fill-current" />
        </button>

        <button 
          className="p-2 text-[#6A7F93] hover:text-[#AAB8C2] transition-colors cursor-pointer outline-none hidden sm:block"
          aria-label="Lặp lại"
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>

      {/* Secondary Controls (Volume / Timer / Queue) */}
      <div className="flex items-center justify-between w-full mt-10 pt-6 border-t border-white/10">
        <button 
          className="p-2 text-[#6A7F93] hover:text-[#AAB8C2] transition-colors cursor-pointer flex items-center gap-2 text-sm"
          aria-label="Hẹn giờ ngủ"
        >
          <Timer className="w-5 h-5" />
          <span className="hidden sm:inline">Hẹn giờ ngủ</span>
        </button>
        
        <div className="flex items-center gap-3 w-1/3 max-w-[150px]">
          <Volume2 className="w-4 h-4 text-[#6A7F93]" />
          <div className="flex-1 h-1.5 bg-[#6A7F93]/30 rounded-full cursor-pointer relative">
            <div className="absolute top-0 left-0 h-full w-[70%] bg-[#AAB8C2] rounded-full"></div>
          </div>
        </div>

        <button 
          className="p-2 text-[#6A7F93] hover:text-[#AAB8C2] transition-colors cursor-pointer flex items-center gap-2 text-sm"
          aria-label="Danh sách chờ"
        >
          <List className="w-5 h-5" />
          <span className="hidden sm:inline">Tiếp theo</span>
        </button>
      </div>

    </div>
  );
}
