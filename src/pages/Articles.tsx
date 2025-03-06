
import { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample articles data
const ARTICLES = [
  {
    id: 1,
    title: "Understanding the Five Pillars of Islam",
    excerpt: "The five pillars of Islam are the foundation of Muslim life. These are Shahada, Salah, Zakat, Sawm, and Hajj...",
    category: "Aqidah",
    author: "Imam Abdullah",
    publishedAt: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1564769625688-6e092db09202?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Importance of Salah in Daily Life",
    excerpt: "Prayer (Salah) is the second pillar of Islam and is a vital practice for every Muslim. This article explores...",
    category: "Fiqh",
    author: "Sheikh Mohammed",
    publishedAt: "2023-06-22",
    imageUrl: "https://images.unsplash.com/photo-1619897916722-86c81e93df8b?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Life of Prophet Muhammad (PBUH)",
    excerpt: "Prophet Muhammad (PBUH) was born in Mecca in the year 570. His father died before his birth and his mother...",
    category: "Seerah",
    author: "Dr. Ibrahim Ali",
    publishedAt: "2023-07-10",
    imageUrl: "https://images.unsplash.com/photo-1543357230-c796deff5bcf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Understanding Ramadan and Its Blessings",
    excerpt: "Ramadan is the ninth month of the Islamic calendar and is observed by Muslims worldwide as a month of fasting...",
    category: "Fiqh",
    author: "Ustadha Aminah",
    publishedAt: "2023-08-05",
    imageUrl: "https://images.unsplash.com/photo-1559564067-f35a4e09139d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Concept of Tawheed in Islam",
    excerpt: "Tawheed is the indivisible oneness concept of monotheism in Islam. It is the religion's central and single most...",
    category: "Aqidah",
    author: "Sheikh Yusuf",
    publishedAt: "2023-09-18",
    imageUrl: "https://images.unsplash.com/photo-1563939859-79e8255bd0ea?q=80&w=1858&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "Aqidah", "Fiqh", "Seerah", "History", "Ethics"];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mt-10 items-center gap-3 mb-8">
          <BookOpen className="h-8 w-8 text-islamic-green" />
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-islamic-navy">Islamic Articles</h1>
        </div>
        
        <div className="glass-card p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-islamic-charcoal/50" />
              <Input
                type="text"
                placeholder="Search for articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-islamic-charcoal/70" />
              <span className="text-sm">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-islamic-green hover:bg-islamic-darkGreen' 
                      : 'hover:bg-islamic-cream'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <div key={article.id} className="glass-card hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden rounded-t-xl">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-islamic-blue/10 text-islamic-blue hover:bg-islamic-blue/20">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-islamic-charcoal/60">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-islamic-navy hover:text-islamic-green transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-islamic-charcoal/70 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-islamic-charcoal/70">
                        By {article.author}
                      </span>
                      <Button variant="link" className="text-islamic-green p-0 h-auto">
                        Read more
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-islamic-charcoal/70">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
