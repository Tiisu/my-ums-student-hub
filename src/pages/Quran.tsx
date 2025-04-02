
import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { QURAN_CHAPTERS, RECITERS, SAMPLE_VERSES, Verse } from '@/data/quranData';
import { getFavoriteSurahs, toggleFavoriteSurah, getAudioUrl, getVersesByChapter } from '@/services/quranService';
import QuranAudioPlayer from '@/components/quran/QuranAudioPlayer';
import SurahList from '@/components/quran/SurahList';
import QuranTranslation from '@/components/quran/QuranTranslation';
import { useToast } from '@/components/ui/use-toast';
import { useAudioShortcuts } from '@/hooks/use-audio-shortcuts';

const Quran = () => {
  const [currentSurah, setCurrentSurah] = useState(QURAN_CHAPTERS[0]);
  const [currentVerses, setCurrentVerses] = useState<Verse[]>([]);
  const [currentReciter, setCurrentReciter] = useState(RECITERS[0]);
  const [audioUrl, setAudioUrl] = useState(QURAN_CHAPTERS[0].audioUrl || '');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

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

  // Handle volume up
  const handleVolumeUp = () => {
    if (audioRef.current) {
      const newVolume = Math.min(1, volume + 0.1);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
      setIsMuted(false);
    }
  };

  // Handle volume down
  const handleVolumeDown = () => {
    if (audioRef.current) {
      const newVolume = Math.max(0, volume - 0.1);
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
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

  // Handle next surah
  const handleNextSurah = () => {
    const currentIndex = QURAN_CHAPTERS.findIndex(s => s.id === currentSurah.id);
    const nextIndex = (currentIndex + 1) % QURAN_CHAPTERS.length;
    setCurrentSurah(QURAN_CHAPTERS[nextIndex]);
  };

  // Handle previous surah
  const handlePrevSurah = () => {
    const currentIndex = QURAN_CHAPTERS.findIndex(s => s.id === currentSurah.id);
    const prevIndex = (currentIndex - 1 + QURAN_CHAPTERS.length) % QURAN_CHAPTERS.length;
    setCurrentSurah(QURAN_CHAPTERS[prevIndex]);
  };

  // Add keyboard shortcuts
  useAudioShortcuts({
    onPlayPause: handlePlayPause,
    onNextTrack: handleNextSurah,
    onPrevTrack: handlePrevSurah,
    onVolumeUp: handleVolumeUp,
    onVolumeDown: handleVolumeDown,
    onMuteToggle: handleMuteToggle,
  });

  // Load favorites on component mount
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  // Update audio URL when surah or reciter changes
  useEffect(() => {
    const url = getAudioUrl(currentReciter.id, currentSurah.id);
    setAudioUrl(url);
    setIsPlaying(false); // Reset playing state when audio changes
  }, [currentSurah, currentReciter]);

  // Load favorites from Supabase
  const loadFavorites = async () => {
    if (user) {
      const favs = await getFavoriteSurahs(user.id);
      setFavorites(favs);
    }
  };

  // Handle surah selection
  const handleSurahSelect = (surah: typeof QURAN_CHAPTERS[0]) => {
    setCurrentSurah(surah);
  };

  // Handle favorite toggle
  const handleToggleFavorite = async (surahId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      return;
    }

    const success = await toggleFavoriteSurah(user.id, surahId);
    if (success) {
      setFavorites(prev => [...prev, surahId]);
    } else {
      setFavorites(prev => prev.filter(id => id !== surahId));
    }
  };

  // Handle reciter change
  const handleReciterChange = (reciterId: number) => {
    const reciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0];
    setCurrentReciter(reciter);
  };

  // Load verses when surah changes
  useEffect(() => {
    const loadVerses = async () => {
      const verses = await getVersesByChapter(currentSurah.id);
      setCurrentVerses(verses);
    };
    loadVerses();
  }, [currentSurah.id]);

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl text-center md:text-4xl font-bold font-serif text-islamic-navy mb-6 mt-10">Quran</h1>
        
        {/* Move AudioPlayer outside of Tabs */}
        <div className="glass-card p-6 md:p-8 mb-8">
          {/* Reciter selection */}
          <div className="mb-10">
            <label htmlFor="reciter-select" className="block text-islamic-navy font-medium mb-2">
              Select Reciter
            </label>
            <select
              id="reciter-select"
              className="w-full md:w-1/2 rounded-md border border-input bg-background px-3 py-2 mb-4"
              value={currentReciter.id}
              onChange={(e) => handleReciterChange(Number(e.target.value))}
            >
              {RECITERS.map(reciter => (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Audio Player */}
          <QuranAudioPlayer
            currentSurah={currentSurah}
            audioUrl={audioUrl}
            onNextSurah={handleNextSurah}
            onPrevSurah={handlePrevSurah}
            ref={audioRef}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={(newVolume) => {
              setVolume(newVolume);
              if (audioRef.current) {
                audioRef.current.volume = newVolume;
              }
            }}
            onMuteToggle={handleMuteToggle}
          />
        </div>

        <Tabs defaultValue="recitations" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="recitations">Recitations</TabsTrigger>
            <TabsTrigger value="translation">Quran with Translation</TabsTrigger>
          </TabsList>
          
          {/* Recitations Tab */}
          <TabsContent value="recitations" className="animate-fade-in">
            <div className="glass-card p-6 md:p-8 mb-8">
              {/* Surah List */}
              <SurahList
                surahs={QURAN_CHAPTERS}
                currentSurah={currentSurah}
                favorites={favorites}
                onSurahSelect={handleSurahSelect}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </TabsContent>
          
          {/* Translation Tab */}
          <TabsContent value="translation" className="animate-fade-in">
            <QuranTranslation
              currentSurah={currentSurah}
              verses={currentVerses}
              onSurahChange={(surahId) => {
                const surah = QURAN_CHAPTERS.find(s => s.id === surahId) || QURAN_CHAPTERS[0];
                setCurrentSurah(surah);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Quran;
