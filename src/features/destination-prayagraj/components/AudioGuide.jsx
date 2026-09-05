import React, { useState, useRef } from 'react';
import { Headphones, MessageSquare, ChevronDown, Volume2, VolumeX } from '../../../components/icons';
import { cn } from '../../../utils/cn';
import { getAudioGuide } from '../../../data/prayagraj';

/**
 * Dual-Language (English & Hindi) Studio Heritage Audio Guide for Prayagraj.
 * 
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function AudioGuide({ place }) {
  const [selectedLang, setSelectedLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(140);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  const guideData = place?.slug ? getAudioGuide(place.slug) : null;
  const currentTrack = guideData?.[selectedLang] || {
    title: `Heritage Narrative of ${place?.name || 'Destination'}`,
    duration: '02:15',
    audioUrl: `/audio/prayagraj/${place?.slug || 'place'}-${selectedLang}.mp3`,
    voice: selectedLang === 'hi' ? 'हिंदी (स्टूडियो न्यूरल)' : 'Indian English (Studio Neural)',
    transcript: place?.description?.about || place?.description?.short || 'Authentic audio narration available on-site.',
  };

  const handleLanguageChange = (lang) => {
    if (lang === selectedLang) return;
    const wasPlaying = isPlaying;
    setSelectedLang(lang);
    setCurrentTime(0);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (wasPlaying) {
          audioRef.current.play().catch((e) => console.warn('Audio switch play interrupted:', e));
        }
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocks audio without explicit file, toggle simulated playback
          setIsPlaying(true);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds == null) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-6">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* 1. Header Bar: Title, Category Badge, Dual Language Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <Headphones size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="type-h3 font-display text-text-high">
                Studio Heritage Audio Guide
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Prayagraj Studio
              </span>
            </div>
            <p className="text-xs text-text-mid font-mono mt-0.5">
              Dual-Language Documentary Narration
            </p>
          </div>
        </div>

        {/* Exact Dual Language Toggle: English / हिंदी */}
        <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-fast cursor-pointer',
              selectedLang === 'en'
                ? 'bg-amber-500 text-bg-base shadow-sm'
                : 'text-text-mid hover:text-text-high'
            )}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('hi')}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-fast cursor-pointer',
              selectedLang === 'hi'
                ? 'bg-amber-500 text-bg-base shadow-sm'
                : 'text-text-mid hover:text-text-high'
            )}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* 2. Main Player Control Hub */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Track metadata */}
          <div className="space-y-1">
            <div className="text-sm font-display font-bold text-text-high">
              {currentTrack.title}
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-text-low">
              <span>Voice: {currentTrack.voice}</span>
              <span>•</span>
              <span>Total: {currentTrack.duration}</span>
            </div>
          </div>

          {/* Primary Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-400 text-bg-base transition-transform duration-fast active:scale-95 shadow-lifted cursor-pointer"
              aria-label={isPlaying ? 'Pause Audio Guide' : 'Play Audio Guide'}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10">
              <button
                type="button"
                onClick={toggleMute}
                className="text-text-mid hover:text-amber-400 transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume Slider"
                className="w-16 accent-amber-500 h-1 rounded-full cursor-pointer bg-white/20"
              />
            </div>
          </div>
        </div>

        {/* 3. Scrubbable Timeline Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <input
            type="range"
            min="0"
            max={duration || 140}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Timeline seek slider"
            className="w-full accent-amber-500 h-1.5 rounded-full cursor-pointer bg-white/20 hover:bg-white/30 transition-colors"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-text-low">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* 4. Dynamic Transcript Accordion */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setShowTranscript((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 text-xs font-mono font-bold text-text-high hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <MessageSquare size={14} className="text-amber-400" />
            <span>{selectedLang === 'hi' ? 'पूर्ण ऑडियो विवरण (ट्रांसक्रिप्ट)' : 'Full Narrative Transcript'}</span>
          </span>
          <ChevronDown
            size={14}
            className={cn('transition-transform duration-fast', showTranscript && 'rotate-180 text-amber-400')}
          />
        </button>

        {showTranscript && (
          <div className="p-5 pt-1 text-xs text-text-mid leading-relaxed font-sans border-t border-white/5 whitespace-pre-line max-h-64 overflow-y-auto">
            {currentTrack.transcript}
          </div>
        )}
      </div>
    </div>
  );
}

export default AudioGuide;
