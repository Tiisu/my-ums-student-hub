
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurahInfo } from '@/data/quranData';
import { Slider } from '@/components/ui/slider';

interface QuranAudioPlayerProps {
  currentSurah: SurahInfo;
  audioUrl: string;
  onNextSurah: () => void;
  onPrevSurah: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
}

const QuranAudioPlayer = forwardRef<HTMLAudioElement, QuranAudioPlayerProps>(({
  currentSurah,
  audioUrl,
  onNextSurah,
  onPrevSurah,
  isPlaying,
  onPlayPause,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle
}, ref) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  }, [audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t shadow-lg z-50 ">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNextSurah}
      />
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Surah Info */}
          <div className="flex-shrink-0 text-center md:text-left">
            <h3 className="text-lg font-semibold text-islamic-navy">
              {currentSurah.name} - {currentSurah.englishName}
            </h3>
            <p className="text-sm text-islamic-charcoal/70">
              {currentSurah.versesCount} verses • {currentSurah.revelationType}
            </p>
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevSurah}
              className="rounded-full"
            >
              <SkipBack size={18} />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={onPlayPause}
              className="bg-islamic-green hover:bg-islamic-darkGreen rounded-full h-12 w-12"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextSurah}
              className="rounded-full"
            >
              <SkipForward size={18} />
            </Button>
          </div>

          {/* Progress and Volume */}
          <div className="flex-grow max-w-md flex items-center gap-4">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 1}
              step={1}
              onValueChange={handleSeek}
              className="flex-grow"
            />
            <span className="text-xs">{formatTime(duration)}</span>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMuteToggle}
                className="rounded-full"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(value) => onVolumeChange(value[0])}
                className="w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

QuranAudioPlayer.displayName = 'QuranAudioPlayer';

export default QuranAudioPlayer;
