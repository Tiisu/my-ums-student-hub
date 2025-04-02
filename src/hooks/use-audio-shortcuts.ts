import { useEffect } from 'react';

interface AudioShortcutsProps {
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onMuteToggle: () => void;
}

export function useAudioShortcuts({
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  onVolumeUp,
  onVolumeDown,
  onMuteToggle,
}: AudioShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onPlayPause();
          break;
        case 'ArrowRight':
          if (e.altKey) onNextTrack();
          break;
        case 'ArrowLeft':
          if (e.altKey) onPrevTrack();
          break;
        case 'ArrowUp':
          if (e.altKey) {
            e.preventDefault();
            onVolumeUp();
          }
          break;
        case 'ArrowDown':
          if (e.altKey) {
            e.preventDefault();
            onVolumeDown();
          }
          break;
        case 'KeyM':
          if (e.altKey) onMuteToggle();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onPlayPause, onNextTrack, onPrevTrack, onVolumeUp, onVolumeDown, onMuteToggle]);
}