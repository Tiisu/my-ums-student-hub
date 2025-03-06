
import { useState, useEffect } from 'react';
import { Quote, ArrowRight } from 'lucide-react';

// Sample data for daily quotes
const quotes = [
  {
    text: "The best among you are those who have the best manners and character.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  },
  {
    text: "Indeed, Allah will not change the condition of a people until they change what is in themselves.",
    source: "Quran 13:11",
    type: "quran"
  },
  {
    text: "Speak good or remain silent.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  },
  {
    text: "And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
    source: "Quran 2:186",
    type: "quran"
  },
  {
    text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.",
    source: "Prophet Muhammad (PBUH)",
    type: "hadith"
  }
];

const DailyQuote = () => {
  const [quote, setQuote] = useState<typeof quotes[0] | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Get a deterministic "random" quote based on the date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    setQuote(quotes[quoteIndex]);
  }, []);

  const changeQuote = () => {
    setFadeOut(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
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
    </section>
  );
};

export default DailyQuote;
