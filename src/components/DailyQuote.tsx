
import { useState, useEffect } from 'react';
import { Quote, ArrowRight, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

// Sample data for daily quotes
const quotes = [
  {
    id: 1,
    text: "The best among you are those who have the best manners and character.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  },
  {
    id: 2,
    text: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
    source: "Quran 13:11",
    type: "quran"
  },
  {
    id: 3,
    text: "Speak good or remain silent.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  },
  {
    id: 4,
    text: "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    source: "Quran 2:186",
    type: "quran"
  },
  {
    id: 5,
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  }
];

const DailyQuote = () => {
  const [quote, setQuote] = useState<typeof quotes[0] | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Get a deterministic "random" quote based on the date
  useEffect(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    // Convert difference in milliseconds to days
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    const dailyQuote = quotes[quoteIndex];
    setQuote(dailyQuote);
    
    // Check if this quote is in user's favorites
    if (user) {
      checkIfFavorite(dailyQuote.id);
    }
  }, [user]);

  const checkIfFavorite = async (quoteId: number) => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('favorite_quotes')
        .select('*')
        .eq('user_id', user.id)
        .eq('quote_id', quoteId)
        .single();
      
      setIsFavorite(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      });
      return;
    }
    
    if (!quote) return;
    
    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('favorite_quotes')
          .delete()
          .eq('user_id', user.id)
          .eq('quote_id', quote.id);
        
        setIsFavorite(false);
        toast({
          title: "Quote removed from favorites",
        });
      } else {
        // Add to favorites
        await supabase
          .from('favorite_quotes')
          .insert({
            user_id: user.id,
            quote_id: quote.id,
            quote_text: quote.text,
            quote_source: quote.source,
            quote_type: quote.type,
          });
        
        setIsFavorite(true);
        toast({
          title: "Quote saved to favorites",
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  };

  const changeQuote = () => {
    setFadeOut(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const newQuote = quotes[randomIndex];
      setQuote(newQuote);
      checkIfFavorite(newQuote.id);
      setFadeOut(false);
    }, 500);
  };

  if (!quote) return null;

  return (
    <section className="py-20 px-6 bg-islamic-cream">
      <div className="container mx-auto max-w-4xl">
        <div 
          className={`glass-card p-8 md:p-12 relative transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="absolute -top-6 left-8 bg-islamic-green text-white p-3 rounded-lg shadow-lg">
            <Quote className="h-6 w-6" />
          </div>
          
          <div className="pt-6">
            <span className="inline-block px-3 py-1 bg-islamic-blue/10 text-islamic-blue text-xs font-medium rounded-full mb-4">
              Daily {quote.type === 'hadith' ? 'Hadith' : 'Quran Verse'}
            </span>
            
            <blockquote className="text-xl md:text-2xl font-serif text-islamic-navy leading-relaxed mb-6">
              "{quote.text}"
            </blockquote>
            
            <div className="flex justify-between items-center">
              <cite className="not-italic text-islamic-charcoal/70 font-medium">
                — {quote.source}
              </cite>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 transition-colors ${
                    isFavorite 
                      ? 'text-islamic-blue hover:text-islamic-navy' 
                      : 'text-islamic-charcoal/60 hover:text-islamic-charcoal'
                  }`}
                  aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
                >
                  {isFavorite ? (
                    <BookmarkCheck className="h-5 w-5" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </button>
                
                <button 
                  onClick={changeQuote}
                  className="flex items-center gap-2 text-islamic-green hover:text-islamic-darkGreen transition-colors"
                  aria-label="Show another quote"
                >
                  <span className="text-sm font-medium">Next quote</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyQuote;
