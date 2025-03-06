
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SurahInfo } from '@/data/quranData';
import { Slider } from '@/components/ui/slider';

interface QuranAudioPlayerProps {
  currentSurah: SurahInfo;
  audioUrl: string;
  onNextSurah: () => void;
  onPrevSurah: () => void;
}

const QuranAudioPlayer = ({ currentSurah, audioUrl, onNextSurah, onPrevSurah }: QuranAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update audio src when audioUrl changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioUrl]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Format time (seconds to mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle seek
  const handleSeek = (value: number[]) => {
    const seekTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  return (
    <div className="glass-card bg-islamic-navy/5 p-4 rounded-xl mb-8">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-islamic-navy">
          {currentSurah.name} - {currentSurah.englishName}
        </h3>
        <div className="text-sm text-islamic-charcoal/70 mb-4">
          {currentSurah.versesCount} verses • {currentSurah.revelationType}
        </div>
        
        <audio 
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
        
        {/* Progress bar */}
        <div className="w-full mb-2">
          <div className="flex justify-between text-xs text-islamic-charcoal/70 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 1}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="rounded-full"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
          
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
              onClick={handlePlayPause}
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
          
          <div className="w-24">
            {/* placeholder for symmetry */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuranAudioPlayer;
