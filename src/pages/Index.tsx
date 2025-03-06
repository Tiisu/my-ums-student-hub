
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PrayerTimes from '@/components/PrayerTimes';
import DailyQuote from '@/components/DailyQuote';
import ExecutiveCards from '@/components/ExecutiveCards';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Function to handle scroll animations
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fancy-entrance');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.8) {
          element.classList.add('active');
        }
      });
    };
    
    // Initialize animations
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <PrayerTimes />
        <DailyQuote />
        <ExecutiveCards />
        
        {/* Features Preview Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h6 className="text-islamic-green text-sm font-medium uppercase mb-3 tracking-wider">Coming Soon</h6>
              <h2 className="text-3xl md:text-4xl font-bold text-islamic-navy mb-6">More Features on the Way</h2>
              <p className="text-islamic-charcoal/70">
                We're working on building more features to enhance your experience with GMSA UDS.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quran Recitations",
                  description: "Listen to beautiful recitations from various reciters, with playback controls and favorites."
                },
                {
                  title: "Islamic Articles",
                  description: "Access a rich collection of Islamic knowledge, categorized for easy navigation and search."
                },
                {
                  title: "Donation Platform",
                  description: "Support GMSA initiatives through our secure and convenient donation system."
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card p-8 fancy-entrance" style={{ transitionDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-bold text-islamic-navy mb-4">{feature.title}</h3>
                  <p className="text-islamic-charcoal/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
