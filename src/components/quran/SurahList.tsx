
import { useState } from 'react';
import { Search, Heart, Book, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SurahInfo } from '@/data/quranData';

interface SurahListProps {
  surahs: SurahInfo[];
  currentSurah: SurahInfo;
  favorites: number[];
  onSurahSelect: (surah: SurahInfo) => void;
  onToggleFavorite: (surahId: number) => void;
}

const SurahList = ({ 
  surahs, 
  currentSurah, 
  favorites, 
  onSurahSelect, 
  onToggleFavorite 
}: SurahListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'favorites' | 'meccan' | 'medinan'>('all');

  // Filter surahs based on search query and filter type
  const filteredSurahs = surahs.filter(surah => {
    // Text search filter
    const matchesSearch = 
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.id.toString().includes(searchQuery);
    
    // Category filter
    const matchesFilter = 
      (filterType === 'all') ||
      (filterType === 'favorites' && favorites.includes(surah.id)) ||
      (filterType === 'meccan' && surah.revelationType === 'Meccan') ||
      (filterType === 'medinan' && surah.revelationType === 'Medinan');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-6">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-charcoal/50" />
          <Input
            type="text"
            placeholder="Search for surah..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className={filterType === 'all' ? 'bg-islamic-green hover:bg-islamic-darkGreen' : ''}
          >
            <Book className="mr-1 h-4 w-4" />
            All
          </Button>
          <Button
            variant={filterType === 'favorites' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('favorites')}
            className={filterType === 'favorites' ? 'bg-islamic-green hover:bg-islamic-darkGreen' : ''}
          >
            <Heart className="mr-1 h-4 w-4" />
            Favorites
          </Button>
          <Button
            variant={filterType === 'meccan' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('meccan')}
            className={filterType === 'meccan' ? 'bg-islamic-green hover:bg-islamic-darkGreen' : ''}
          >
            <Clock className="mr-1 h-4 w-4" />
            Meccan
          </Button>
          <Button
            variant={filterType === 'medinan' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('medinan')}
            className={filterType === 'medinan' ? 'bg-islamic-green hover:bg-islamic-darkGreen' : ''}
          >
            <Clock className="mr-1 h-4 w-4" />
            Medinan
          </Button>
        </div>
      </div>
      
      {/* Surah Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSurahs.map((surah) => (
          <div
            key={surah.id}
            onClick={() => onSurahSelect(surah)}
            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
              currentSurah.id === surah.id
                ? 'bg-islamic-green/5 border-islamic-green'
                : 'hover:bg-islamic-green/5 border-border'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-islamic-blue/10 flex items-center justify-center text-islamic-blue font-medium">
                  {surah.id}
                </div>
                <div>
                  <h4 className="font-medium text-islamic-navy">{surah.englishName}</h4>
                  <p className="text-xs text-islamic-charcoal/70">{surah.englishNameTranslation}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-arabic text-2xl mb-1">{surah.name}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(surah.id);
                  }}
                  className={`p-1 h-6 ${
                    favorites.includes(surah.id) ? 'text-red-500' : 'text-islamic-charcoal/50 hover:text-islamic-charcoal'
                  }`}
                >
                  <Heart size={16} fill={favorites.includes(surah.id) ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahList;
