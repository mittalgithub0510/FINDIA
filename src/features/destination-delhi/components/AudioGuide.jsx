import React, { useState, useRef, useEffect } from 'react';
import { Headphones, MessageSquare, ChevronDown } from '../../../components/icons';
import { cn } from '../../../utils/cn';
import { getAudioGuide } from '../../../data/delhi';

/**
 * Dual-Language (English & Hindi) Studio Heritage Audio Guide.
 * 
 * Features:
 * - Exactly 2 language options: English and Hindi
 * - Plays real, ultra-realistic 2+ minute studio documentary audio narrations
 * - Interactive Scrubbable progress bar with real-time seeking
 * - Accurate elapsed & total duration display (mm:ss)
 * - Seamless language switching with state preservation
 * - Dynamic transcript drawer displaying the selected language script
 * - Animated acoustic waveform visualization during playback
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function AudioGuide({ place }) {
  const [selectedLang, setSelectedLang] = useState('en'); // 'en' or 'hi'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(135); // default ~2m 15s
  const [showTranscript, setShowTranscript] = useState(false);

  const audioRef = useRef(null);

  // Retrieve canonical dual-language guide for this place
  const guideData = place?.slug ? getAudioGuide(place.slug) : null;
  const currentTrack = guideData?.[selectedLang] || {
    title: `Heritage Narrative of ${place?.name || 'Destination'}`,
    duration: '02:15',
    audioUrl: `/audio/delhi/${place?.slug || 'place'}-${selectedLang}.mp3`,
    voice: selectedLang === 'hi' ? 'हिंदी (स्टूडियो न्यूरल)' : 'Indian English (Studio Neural)',
    transcript: place?.description || 'Authentic audio narration coming soon.'
  };

  // Switch language track
  const handleLanguageChange = (lang) => {
    if (lang === selectedLang) return;
    const wasPlaying = isPlaying;
    setSelectedLang(lang);
    setCurrentTime(0);

    // Give state a tick to update src before continuing playback if it was playing
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (wasPlaying) {
          audioRef.current.play().catch((e) => console.warn('Audio switch play interrupted:', e));
        }
      }
    }, 50);
  };

  // Toggle play / pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  // Update time as audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // When audio file loads its real duration
  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  // Scrub progress bar
  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * (duration || 135);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  // Format seconds into mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs == null) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const prevSlugRef = useRef(place?.slug);
  if (prevSlugRef.current !== place?.slug) {
    prevSlugRef.current = place?.slug;
    if (isPlaying) setIsPlaying(false);
    if (currentTime !== 0) setCurrentTime(0);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!place) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-bg-surface/95 to-amber-950/20 shadow-card space-y-4">
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        preload="metadata"
      />

      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={cn(
            "p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-bg-base shadow-md shrink-0 transition-transform duration-base",
            isPlaying && "scale-105 shadow-amber-500/30 ring-2 ring-amber-400/50"
          )}>
            <Headphones size={24} />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 uppercase font-mono tracking-wider flex items-center gap-2">
              <span>FINDIA Studio Audio Guide</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-[10px] font-mono">
                {currentTrack.duration || '02:15'}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-text-high mt-0.5">
              {currentTrack.title}
            </h4>
          </div>
        </div>

        {/* Right Controls: Exactly 2 Languages (English & Hindi) + Play Button */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* 2 Language Option Buttons: English and Hindi */}
          <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none",
                selectedLang === 'en'
                  ? "bg-amber-500 text-bg-base shadow-sm font-extrabold"
                  : "text-text-mid hover:text-white"
              )}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>

            <button
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none",
                selectedLang === 'hi'
                  ? "bg-amber-500 text-bg-base shadow-sm font-extrabold"
                  : "text-text-mid hover:text-white"
              )}
            >
              <span>🇮🇳</span>
              <span>हिंदी</span>
            </button>
          </div>

          {/* Primary Play / Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={cn(
              "px-5 py-2.5 rounded-xl text-bg-base text-xs font-bold transition-all cursor-pointer flex items-center gap-2 select-none shadow-md",
              isPlaying
                ? "bg-amber-400 hover:bg-amber-300 ring-2 ring-amber-400/40"
                : "bg-amber-500 hover:bg-amber-400"
            )}
          >
            <span>{isPlaying ? '⏸ Pause Audio' : '▶ Play Audio Guide'}</span>
          </button>
        </div>
      </div>

      {/* Voice Badge & Narration Info */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-low pt-0.5">
        <div className="flex items-center gap-2">
          <span className="text-text-mid font-semibold">Narrator:</span>
          <span className="text-amber-300 font-medium">{currentTrack.voice}</span>
        </div>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          Ultra-Realistic Studio Narration (2+ Minutes)
        </span>
      </div>

      {/* Timeline Scrubber & Controls */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-text-low">
          <span className="text-amber-300 font-bold">{formatTime(currentTime)}</span>
          <span className="text-text-mid truncate max-w-[200px] sm:max-w-none">
            {isPlaying ? 'Playing authentic historical documentary...' : 'Click Play to listen to full guide'}
          </span>
          <span>{formatTime(duration || 135)}</span>
        </div>

        {/* Interactive Progress Bar */}
        <div
          className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden cursor-pointer relative group"
          onClick={handleScrub}
          role="slider"
          aria-valuenow={currentTime}
          aria-valuemin={0}
          aria-valuemax={duration || 135}
          tabIndex={0}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-base',
              isPlaying
                ? 'bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 shadow-sm'
                : 'bg-amber-500/70'
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Live Animated Acoustic Waveform */}
        {isPlaying && (
          <div className="flex items-center gap-1.5 pt-1 text-[11px] text-amber-400 font-mono">
            <span className="w-1 h-3 bg-amber-400 animate-pulse rounded-full" />
            <span className="w-1 h-6 bg-amber-300 animate-pulse rounded-full" style={{ animationDelay: '120ms' }} />
            <span className="w-1 h-2.5 bg-amber-400 animate-pulse rounded-full" style={{ animationDelay: '240ms' }} />
            <span className="w-1 h-5 bg-amber-300 animate-pulse rounded-full" style={{ animationDelay: '60ms' }} />
            <span className="w-1 h-4 bg-amber-400 animate-pulse rounded-full" style={{ animationDelay: '180ms' }} />
            <span className="text-[11px] text-amber-200 ml-2">
              Playing in {selectedLang === 'hi' ? 'हिंदी' : 'English'}
            </span>
          </div>
        )}
      </div>

      {/* Transcript Drawer Toggle */}
      {currentTrack.transcript && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono transition-colors cursor-pointer"
          >
            <MessageSquare size={13} />
            <span>
              {showTranscript
                ? `Hide ${selectedLang === 'hi' ? 'हिंदी' : 'English'} Transcript`
                : `Read ${selectedLang === 'hi' ? 'हिंदी' : 'English'} Narration Script`}
            </span>
            <ChevronDown
              size={13}
              className={cn('transition-transform duration-base', showTranscript && 'rotate-180')}
            />
          </button>

          {showTranscript && (
            <div className="mt-3 p-4 rounded-2xl bg-black/50 border border-amber-500/20 text-xs text-text-mid leading-relaxed font-sans animate-fade-in space-y-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-mono text-[10px] text-amber-300 uppercase tracking-wider">
                  {selectedLang === 'hi' ? 'आधिकारिक हिंदी पटकथा' : 'Official Historical Script'}
                </span>
                <span className="text-[10px] text-text-low font-mono">
                  {currentTrack.duration} Narration
                </span>
              </div>
              <p className="text-text-high select-text leading-relaxed">
                {currentTrack.transcript}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AudioGuide;
