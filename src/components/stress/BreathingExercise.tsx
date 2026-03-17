import { useState, useEffect } from 'react';
import { VolumeX } from 'lucide-react';

type BreathingPhase = 'inhale' | 'hold' | 'exhale';

/**
 * Breathing Exercise — animated circle with phase cycling.
 * Converts imperative setInterval/DOM manipulation to React state + useEffect.
 */
export default function BreathingExercise() {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const phaseText = phase === 'inhale' ? 'Hít vào' : phase === 'hold' ? 'Giữ' : 'Thở ra';

  const circleScale =
    phase === 'inhale' || phase === 'hold' ? 'scale-[1.15]' : 'scale-100';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-center text-[#4A5568] text-lg mb-8">
          Hãy thử một bài tập thở nhanh để giải tỏa căng thẳng.
        </p>

        {/* Breathing container */}
        <div
          className="relative w-full max-w-[500px] h-[350px] mx-auto flex items-center justify-center rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #6495ED 50%, #9370DB 100%)',
          }}
        >
          {/* Outer ring */}
          <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-white/20 animate-[breathingRingPulse_12s_ease-in-out_infinite]" />
          {/* Middle ring */}
          <div className="absolute w-[240px] h-[240px] rounded-full border-2 border-white/20 animate-[breathingRingPulse_12s_ease-in-out_infinite_0.5s]" />

          {/* Main breathing circle */}
          <div
            className={`relative z-10 w-[180px] h-[180px] rounded-full bg-white/95 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-transform duration-[4000ms] ease-in-out ${circleScale}`}
          >
            <span className="font-heading text-xl text-[#4A5568]">{phaseText}</span>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-[15%] right-[35%] w-3 h-3 rounded-full bg-white/80 animate-[breathingDot_12s_ease-in-out_infinite]" />
          <div className="absolute bottom-[20%] left-[30%] w-3 h-3 rounded-full bg-white/80 animate-[breathingDot_12s_ease-in-out_infinite_2s]" />

          {/* Sound toggle */}
          <button
            aria-label="Toggle sound"
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center cursor-pointer border-none hover:bg-black/50 transition-colors duration-base"
          >
            <VolumeX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
