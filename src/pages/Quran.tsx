
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { QURAN_CHAPTERS, RECITERS, SAMPLE_VERSES } from '@/data/quranData';
import { getFavoriteSurahs, toggleFavoriteSurah, getAudioUrl } from '@/services/quranService';
import QuranAudioPlayer from '@/components/quran/QuranAudioPlayer';
import SurahList from '@/components/quran/SurahList';
import QuranTranslation from '@/components/quran/QuranTranslation';
import { useToast } from '@/components/ui/use-toast';

const Quran = () => {
  const [currentSurah, setCurrentSurah] = useState(QURAN_CHAPTERS[0]);
  const [currentReciter, setCurrentReciter] = useState(RECITERS[0]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [audioUrl, setAudioUrl] = useState(QURAN_CHAPTERS[0].audioUrl || '');
  const { user } = useAuth();
  const { toast } = useToast();

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

  // Handle reciter change
  const handleReciterChange = (reciterId: number) => {
    const reciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0];
    setCurrentReciter(reciter);
  };

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-islamic-navy mb-6">Quran</h1>
        
        <Tabs defaultValue="recitations" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="recitations">Recitations</TabsTrigger>
            <TabsTrigger value="translation">Quran with Translation</TabsTrigger>
          </TabsList>
          
          {/* Recitations Tab */}
          <TabsContent value="recitations" className="animate-fade-in">
            <div className="glass-card p-6 md:p-8 mb-8">
              {/* Reciter selection */}
              <div className="mb-6">
                <label htmlFor="reciter-select" className="block text-islamic-navy font-medium mb-2">
                  Select Reciter
                </label>
                <select
                  id="reciter-select"
                  className="w-full md:w-1/2 rounded-md border border-input bg-background px-3 py-2"
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
              />
              
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
              verses={SAMPLE_VERSES}
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
