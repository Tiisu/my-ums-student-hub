
import { useState } from 'react';
import { Heart, Share2, BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Verse, SurahInfo } from '@/data/quranData';
import { useToast } from '@/components/ui/use-toast';

interface QuranTranslationProps {
  currentSurah: SurahInfo;
  verses: Verse[];
  onSurahChange: (surahId: number) => void;
}

const QuranTranslation = ({ currentSurah, verses, onSurahChange }: QuranTranslationProps) => {
  const [searchText, setSearchText] = useState('');
  const [favoriteVerses, setFavoriteVerses] = useState<number[]>([]);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const { toast } = useToast();

  if (verses.length === 0) {
    return (
      <div className="glass-card p-6 md:p-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green"></div>
        </div>
      </div>
    );
  }

  const filteredVerses = verses.filter(verse => 
    verse.arabic.includes(searchText) || 
    verse.english.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePrevSurah = () => {
    if (currentSurah.id > 1) {
      onSurahChange(currentSurah.id - 1);
    }
  };

  const handleNextSurah = () => {
    if (currentSurah.id < 114) {
      onSurahChange(currentSurah.id + 1);
    }
  };

  const toggleFavoriteVerse = (verseId: number) => {
    setFavoriteVerses(prev => 
      prev.includes(verseId) 
        ? prev.filter(id => id !== verseId)
        : [...prev, verseId]
    );
    
    toast({
      title: favoriteVerses.includes(verseId) ? "Removed from favorites" : "Added to favorites",
      description: `Verse has been ${favoriteVerses.includes(verseId) ? "removed from" : "added to"} your favorites.`,
    });
  };

  const shareVerse = (verse: Verse) => {
    if (navigator.share) {
      navigator.share({
        title: `Quran - Surah ${currentSurah.englishName}, Verse ${verse.verseNumber}`,
        text: `${verse.arabic}\n\n${verse.english}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: "The verse has been shared.",
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        toast({
          title: "Sharing failed",
          description: "There was a problem sharing the verse.",
          variant: "destructive"
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(`${verse.arabic}\n\n${verse.english}`);
      toast({
        title: "Copied to clipboard",
        description: "The verse has been copied to your clipboard.",
      });
    }
  };

  // Add scroll into view for verses
  const scrollToVerse = (verseId: number) => {
    const element = document.getElementById(`verse-${verseId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-islamic-navy mb-3 md:mb-0">
          Surah {currentSurah.englishName}
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevSurah}
            disabled={currentSurah.id === 1}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextSurah}
            disabled={currentSurah.id === 114}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-charcoal/50" />
        <Input
          type="text"
          placeholder="Search within this surah..."
          className="pl-10"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      <div className="space-y-6">
        {filteredVerses.map(verse => (
          <div
            key={verse.id}
            className={`p-4 rounded-lg transition-colors ${
              activeVerse === verse.id ? 'bg-islamic-green/5' : 'hover:bg-islamic-green/5'
            }`}
            onClick={() => setActiveVerse(verse.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-islamic-green/10 flex items-center justify-center text-islamic-green text-sm font-medium">
                  {verse.verseNumber}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToVerse(verse.id)}
                  className="text-islamic-charcoal/50 hover:text-islamic-charcoal h-7"
                >
                  <BookOpen size={16} />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => shareVerse(verse)}
                  className="text-islamic-charcoal/50 hover:text-islamic-charcoal h-7 w-7 p-0"
                >
                  <Share2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavoriteVerse(verse.id)}
                  className={`text-islamic-charcoal/50 hover:text-islamic-charcoal h-7 w-7 p-0 ${
                    favoriteVerses.includes(verse.id) ? 'text-red-500' : ''
                  }`}
                >
                  <Heart size={16} fill={favoriteVerses.includes(verse.id) ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>
            <p className="font-arabic text-right leading-loose mb-4 text-2xl">
              {verse.arabic}
            </p>
            <p className="text-islamic-charcoal/80 leading-relaxed">
              {verse.english}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuranTranslation;
