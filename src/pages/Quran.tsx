
import { useState, useRef } from 'react';
import { Search, Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for recitations
const RECITERS = [
  { id: 1, name: "Mishari Rashid al-Afasy", language: "Arabic" },
  { id: 2, name: "Abdul Rahman Al-Sudais", language: "Arabic" },
  { id: 3, name: "Saud Al-Shuraim", language: "Arabic" },
  { id: 4, name: "Abu Bakr Al-Shatri", language: "Arabic" },
];

// Sample data for surahs
const SURAHS = [
  { id: 1, name: "Al-Fatihah", englishName: "The Opening", versesCount: 7, audioUrl: "https://server8.mp3quran.net/afs/001.mp3" },
  { id: 2, name: "Al-Baqarah", englishName: "The Cow", versesCount: 286, audioUrl: "https://server8.mp3quran.net/afs/002.mp3" },
  { id: 3, name: "Ali 'Imran", englishName: "Family of Imran", versesCount: 200, audioUrl: "https://server8.mp3quran.net/afs/003.mp3" },
  { id: 4, name: "An-Nisa", englishName: "The Women", versesCount: 176, audioUrl: "https://server8.mp3quran.net/afs/004.mp3" },
  { id: 5, name: "Al-Ma'idah", englishName: "The Table Spread", versesCount: 120, audioUrl: "https://server8.mp3quran.net/afs/005.mp3" },
];

// Sample verses data
const SAMPLE_VERSES = [
  { id: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", surahId: 1, verseNumber: 1 },
  { id: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", english: "All praise is due to Allah, Lord of the worlds -", surahId: 1, verseNumber: 2 },
  { id: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", english: "The Entirely Merciful, the Especially Merciful,", surahId: 1, verseNumber: 3 },
  { id: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", english: "Sovereign of the Day of Recompense.", surahId: 1, verseNumber: 4 },
  { id: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", english: "It is You we worship and You we ask for help.", surahId: 1, verseNumber: 5 },
];

const Quran = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentReciter, setCurrentReciter] = useState(RECITERS[0]);
  const [currentSurah, setCurrentSurah] = useState(SURAHS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSurahs = SURAHS.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleNextSurah = () => {
    const currentIndex = SURAHS.findIndex(s => s.id === currentSurah.id);
    const nextIndex = (currentIndex + 1) % SURAHS.length;
    setCurrentSurah(SURAHS[nextIndex]);
    setIsPlaying(false);
  };

  const handlePrevSurah = () => {
    const currentIndex = SURAHS.findIndex(s => s.id === currentSurah.id);
    const prevIndex = (currentIndex - 1 + SURAHS.length) % SURAHS.length;
    setCurrentSurah(SURAHS[prevIndex]);
    setIsPlaying(false);
  };

  const toggleFavorite = (surahId: number) => {
    setFavorites(prev => 
      prev.includes(surahId) 
        ? prev.filter(id => id !== surahId)
        : [...prev, surahId]
    );
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
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-charcoal/50" />
                    <Input
                      type="text"
                      placeholder="Search for surah..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-auto">
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={currentReciter.id}
                    onChange={(e) => setCurrentReciter(RECITERS.find(r => r.id === Number(e.target.value)) || RECITERS[0])}
                  >
                    {RECITERS.map(reciter => (
                      <option key={reciter.id} value={reciter.id}>
                        {reciter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Audio Player */}
              <div className="glass-card bg-islamic-navy/5 p-4 rounded-xl mb-8">
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-bold text-islamic-navy">
                    {currentSurah.name} - {currentSurah.englishName}
                  </h3>
                  <div className="text-sm text-islamic-charcoal/70 mb-4">
                    {currentSurah.versesCount} verses • {currentReciter.name}
                  </div>
                  
                  <audio 
                    ref={audioRef}
                    src={currentSurah.audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full mb-4"
                    controls={false}
                  />
                  
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevSurah}
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
                      onClick={handleNextSurah}
                      className="rounded-full"
                    >
                      <SkipForward size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Surah List */}
              <div className="space-y-2">
                {filteredSurahs.map(surah => (
                  <div 
                    key={surah.id}
                    className={`p-4 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                      currentSurah.id === surah.id 
                        ? 'bg-islamic-green/10 border border-islamic-green/20' 
                        : 'hover:bg-islamic-cream'
                    }`}
                    onClick={() => {
                      setCurrentSurah(surah);
                      setIsPlaying(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-islamic-blue/10 flex items-center justify-center text-islamic-blue font-medium">
                        {surah.id}
                      </div>
                      <div>
                        <h4 className="font-medium text-islamic-navy">{surah.name}</h4>
                        <p className="text-sm text-islamic-charcoal/70">{surah.englishName} • {surah.versesCount} verses</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(surah.id);
                      }}
                      className={`${
                        favorites.includes(surah.id) ? 'text-red-500' : 'text-islamic-charcoal/50 hover:text-islamic-charcoal'
                      }`}
                    >
                      <Heart size={18} fill={favorites.includes(surah.id) ? 'currentColor' : 'none'} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Translation Tab */}
          <TabsContent value="translation" className="animate-fade-in">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-islamic-navy text-center mb-6">
                Surah Al-Fatihah
              </h2>
              
              <div className="space-y-6">
                {SAMPLE_VERSES.map(verse => (
                  <div key={verse.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-6 w-6 rounded-full bg-islamic-green/10 flex items-center justify-center text-islamic-green text-sm font-medium">
                        {verse.verseNumber}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {}}
                        className="text-islamic-charcoal/50 hover:text-islamic-charcoal"
                      >
                        <Heart size={16} />
                      </Button>
                    </div>
                    <p className="text-xl text-right font-arabic leading-loose mb-2">
                      {verse.arabic}
                    </p>
                    <p className="text-islamic-charcoal/80">
                      {verse.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Quran;
