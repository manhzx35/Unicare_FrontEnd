import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Headphones, Moon, Music, Briefcase, Compass, Heart, 
  Baby, Activity, User, Search, Image as ImageIcon,
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, 
  List, Volume2, Volume1, VolumeX, Timer, ChevronLeft, ChevronRight,
  ArrowLeft, Sparkles, Lock
} from 'lucide-react';
import './player.css';

// Audio imports
import meditationAudio from '../../assets/Bài Thiền 5 phút- Thiền Thư Giãn Cơ thể.mp3';
import sleepAudio from '../../assets/Bản nhạc giúp ngủ ngon sau 15 phút.mp3';

// ---- Navigation items ----
interface NavItem {
  id: string;
  label: string;
  icon: any;
  color: string;
}

const sidebarNav: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: Home, color: '#4DD4AC' },
  { id: 'meditate', label: 'Thiền định', icon: Headphones, color: '#4AB8C7' },
  { id: 'sleep', label: 'Giấc ngủ', icon: Moon, color: '#9B7CCB' },
  { id: 'music', label: 'Âm nhạc', icon: Music, color: '#D77BA0' },
  { id: 'for-work', label: 'Công việc', icon: Briefcase, color: '#E8A55A' },
  { id: 'wisdom', label: 'Trí tuệ', icon: Compass, color: '#E07C54' },
  { id: 'calm-kids', label: 'Trẻ em', icon: Baby, color: '#DA7E4A' },
  { id: 'movement', label: 'Vận động', icon: Activity, color: '#E8A040' },
  { id: 'profile', label: 'Hồ sơ', icon: User, color: '#5BBF7A' },
];

// ---- Track data ----
interface Track {
  id: number;
  title: string;
  artist: string;
  category: string;
  duration: string;
  durationSec: number;
  artwork: string;
  locked: boolean;
  url?: string;
}

const tracks: Track[] = [
  { id: 1, title: 'Sóng biển đêm', artist: 'Âm thanh UniCare', category: 'Giấc ngủ', duration: '45:00', durationSec: 2700, artwork: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=600&fit=crop', locked: false },
  { id: 2, title: 'Tập trung sóng não Alpha', artist: 'UniCare Thần kinh', category: 'Tập trung', duration: '30:00', durationSec: 1800, artwork: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=600&fit=crop', locked: false },
  { id: 3, title: 'Mưa đêm', artist: 'Âm thanh Thiên nhiên', category: 'Giấc ngủ', duration: '60:00', durationSec: 3600, artwork: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=600&fit=crop', locked: false },
  { id: 4, title: 'Thiền Theta sâu', artist: 'UniCare Thần kinh', category: 'Thiền định', duration: '20:00', durationSec: 1200, artwork: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&h=600&fit=crop', locked: true },
  { id: 5, title: 'Sáng trong rừng', artist: 'Âm thanh Thiên nhiên', category: 'Thư giãn', duration: '35:00', durationSec: 2100, artwork: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=600&fit=crop', locked: false },
  { id: 6, title: 'Cực quang', artist: 'UniCare Không gian', category: 'Giấc ngủ', duration: '50:00', durationSec: 3000, artwork: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=600&fit=crop', locked: true },
  { id: 7, title: 'Piano và Mưa', artist: 'Nhạc chữa lành', category: 'Thư giãn', duration: '15:15', durationSec: 915, artwork: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=600&fit=crop', locked: false, url: sleepAudio },
  { id: 8, title: 'Không gian hít thở', artist: 'Phiên hướng dẫn', category: 'Thiền định', duration: '05:48', durationSec: 348, artwork: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop', locked: false, url: meditationAudio },
];

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Chào buổi sáng';
  if (h < 17) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export default function PlayerLayout() {
  const [activeSidebarItem, setActiveSidebarItem] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showSleepTimer, setShowSleepTimer] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState(0);
  
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const timerTimeoutRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync state with audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onEnded = () => {
    handleNext();
  };

  // Handle Play/Pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    if (idx < tracks.length - 1) {
      setCurrentTrack(tracks[idx + 1]);
      setCurrentTime(0);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    const idx = tracks.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) {
      setCurrentTrack(tracks[idx - 1]);
      setCurrentTime(0);
    }
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pct * currentTrack.durationSec;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newVol = Math.round(pct);
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol / 100;
    }
  };

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX className="w-4 h-4" />;
    if (volume < 50) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  const scrollPopular = (dir: 'left' | 'right') => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const handleTrackClick = (t: Track) => {
    setCurrentTrack(t);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const setTimer = (mins: number) => {
    setSleepTimerMinutes(mins);
    setShowSleepTimer(false);
    if (timerTimeoutRef.current) clearTimeout(timerTimeoutRef.current);
    if (mins > 0) {
      timerTimeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        setSleepTimerMinutes(0);
      }, mins * 60000);
    }
  };

  const renderTrackCard = (track: Track) => {
    const isActive = currentTrack.id === track.id;
    return (
      <div 
        key={track.id} 
        className={`app-track-card ${isActive ? 'app-track-card-active' : ''}`}
        onClick={() => handleTrackClick(track)}
      >
        <div className="relative overflow-hidden rounded-xl mb-3 group">
          <img src={track.artwork} alt={track.title} className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"/>
          {track.locked && (
            <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-white/80" />
            </div>
          )}
          <div className="app-track-play-overlay">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              {isActive && isPlaying ? <Pause className="w-5 h-5 text-[#0E0E2A]" /> : <Play className="w-5 h-5 text-[#0E0E2A] ml-0.5" />}
            </div>
          </div>
        </div>
        <h4 className="text-[13px] font-semibold text-white truncate leading-tight">{track.title}</h4>
        <p className="text-xs text-white/40 truncate mt-0.5">{track.category} · {track.duration}</p>
      </div>
    );
  };

  // Close timer dropdown on blur
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (!(e.target as Element).closest('#sleep-timer-container')) {
        setShowSleepTimer(false);
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="app-player-layout text-left w-full">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        muted={isMuted}
      />
      {/* ========== SIDEBAR ========== */}
      <aside className="app-sidebar hidden md:flex" id="app-sidebar">
        <div className="app-sidebar-logo">
          <a href="/" className="app-sidebar-logo-link">
            <span className="app-sidebar-logo-text">UniCare</span>
          </a>
        </div>

        <nav className="app-sidebar-nav">
          {sidebarNav.map(item => {
            const isActive = activeSidebarItem === item.id;
            const Icon = item.icon;
            return (
              <button 
                key={item.id} 
                className={`app-sidebar-link ${isActive ? 'app-sidebar-link-active' : ''}`} 
                onClick={() => setActiveSidebarItem(item.id)}
              >
                <span className={`app-sidebar-circle ${isActive ? 'app-sidebar-circle-active' : ''}`} 
                      style={{ '--ring-color': item.color, '--ring-bg': `${item.color}20`, '--ring-bg-active': `${item.color}30` } as any}>
                  <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                </span>
                <span className="app-sidebar-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="app-sidebar-bottom text-left">
          <p className="text-xs text-white/30">Chính sách bảo mật</p>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="app-main">
        {/* Top Bar */}
        <header className="app-topbar bg-transparent">
          <div className="flex items-center gap-4">
            <a href="/" className="app-icon-btn hidden md:flex" aria-label="Back to site">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="app-icon-btn" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button className="app-icon-btn" aria-label="Scenes">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="app-icon-btn" aria-label="Profile">
              <User className="w-5 h-5" />
            </button>
            <Link to="/calm-health#pricing-section">
              <button className="app-cta-btn-sm whitespace-nowrap">Dùng thử UniCare miễn phí</button>
            </Link>
          </div>
        </header>

        {/* Promo Banner */}
        <div className="app-promo-banner" id="promo-banner">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-white/90 truncate">Bạn đang bỏ lỡ trải nghiệm UniCare đầy đủ. Đăng ký ngay để nhận ưu đãi 40% và mở khóa hơn 50.000 phút nội dung.</p>
          </div>
          <button className="text-white/50 hover:text-white transition-colors flex-shrink-0 ml-2">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="app-content text-left">
          {/* Greeting */}
          <div className="mb-10 mt-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading text-white leading-tight">{getGreeting()}</h1>
            <p className="text-sm text-white/40 mt-2">Hôm nay bạn muốn nghe gì?</p>
          </div>

          {/* Popular Section */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-heading text-white">Phổ biến trên UniCare</h2>
              <div className="flex items-center gap-2">
                <button className="app-scroll-arrow hidden sm:flex" onClick={() => scrollPopular('left')}><ChevronLeft className="w-4 h-4" /></button>
                <button className="app-scroll-arrow hidden sm:flex" onClick={() => scrollPopular('right')}><ChevronRight className="w-4 h-4" /></button>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors ml-2 hidden sm:block">Xem tất cả</a>
              </div>
            </div>
            <div className="app-track-scroll" ref={popularScrollRef}>
              {tracks.map(renderTrackCard)}
            </div>
          </div>

          {/* Recently Played */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-heading text-white">Vừa nghe gần đây</h2>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">Xem tất cả</a>
            </div>
            <div className="app-track-scroll">
              {[...tracks].reverse().slice(0, 4).map(renderTrackCard)}
            </div>
          </div>

          {/* Sleep Sounds */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-heading text-white">Âm thanh giấc ngủ</h2>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">Xem tất cả</a>
            </div>
            <div className="app-track-scroll">
              {tracks.filter(t => t.category === 'Sleep' || t.category === 'Relax').map(renderTrackCard)}
            </div>
          </div>
        </div>

        {/* ========== NOW PLAYING BAR ========== */}
        <div className="app-now-playing">
          {/* Track Info */}
          <div className="app-np-info w-full text-left max-w-[200px] md:max-w-[300px]">
            <img src={currentTrack.artwork} alt={currentTrack.title} className="app-np-artwork"/>
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-white truncate">{currentTrack.title}</h4>
              <p className="text-xs text-white/50 truncate">{currentTrack.artist}</p>
            </div>
            <button className="app-icon-btn-sm ml-1 hidden md:flex" aria-label="Favorite">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Controls */}
          <div className="app-np-controls">
            <div className="flex items-center gap-3 mb-2">
              <button className="app-icon-btn-sm hidden md:flex" aria-label="Shuffle"><Shuffle className="w-4 h-4" /></button>
              <button className="app-icon-btn-sm" onClick={handlePrev} aria-label="Rewind"><SkipBack className="w-4 h-4 fill-current" /></button>
              <button className="app-play-btn" onClick={togglePlay} aria-label="Play/Pause">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
              </button>
              <button className="app-icon-btn-sm" onClick={handleNext} aria-label="Forward"><SkipForward className="w-4 h-4 fill-current" /></button>
              <button className="app-icon-btn-sm hidden md:flex" aria-label="Repeat"><Repeat className="w-4 h-4" /></button>
            </div>

            {/* Scrubber */}
            <div className="app-timeline hidden sm:flex">
              <span className="text-[10px] text-white/40 w-10 text-right">{formatTime(currentTime)}</span>
              <div className="app-scrubber" onClick={handleScrubberClick}>
                <div className="app-scrubber-track">
                  <div className="app-scrubber-fill" style={{ width: `${(currentTime / currentTrack.durationSec) * 100}%` }}></div>
                  <div className="app-scrubber-thumb" style={{ left: `${(currentTime / currentTrack.durationSec) * 100}%` }}></div>
                </div>
              </div>
              <span className="text-[10px] text-white/40 w-10">{formatTime(currentTrack.durationSec)}</span>
            </div>
          </div>

          {/* Secondary Controls */}
          <div className="app-np-secondary hidden sm:flex pt-1 md:pt-0">
            <button className="app-icon-btn-sm hidden lg:flex" aria-label="Queue"><List className="w-4 h-4" /></button>

            {/* Timer Dropdown */}
            <div className="relative" id="sleep-timer-container">
              <button 
                className={`app-icon-btn-sm ${sleepTimerMinutes > 0 ? 'text-[#667eea]' : ''}`} 
                onClick={() => setShowSleepTimer(!showSleepTimer)}
                aria-label="Sleep Timer"
              >
                <Timer className="w-4 h-4" />
              </button>
              <div className={`app-timer-dropdown ${showSleepTimer ? 'app-timer-dropdown-visible' : ''}`}>
                <p className="text-xs text-white/40 mb-2 px-2">Hẹn giờ ngủ</p>
                {[0, 5, 10, 15, 30, 45, 60].map(m => (
                  <button 
                    key={m} 
                    className={`app-timer-option ${sleepTimerMinutes === m ? 'app-timer-option-active' : ''}`} 
                    onClick={() => setTimer(m)}
                  >
                    {m === 0 ? 'Tắt' : `${m} phút`}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button className="app-icon-btn-sm" onClick={() => setIsMuted(!isMuted)}>
                {getVolumeIcon()}
              </button>
              <div className="app-volume-slider hidden md:flex" onClick={handleVolumeClick}>
                <div className="app-volume-track">
                  <div className="app-volume-fill" style={{ width: `${isMuted ? 0 : volume}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
