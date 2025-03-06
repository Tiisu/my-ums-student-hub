
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('prayer-times');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-islamic-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-islamic-blue/10 rounded-full blur-3xl"></div>
      
      <div className="container px-6 md:px-12 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-islamic-green animate-fade-down px-4 py-1.5 rounded-full border border-islamic-green/30 bg-islamic-green/10 text-sm font-medium uppercase mb-6">
            UDS Nyankpala Campus
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold animate-fade-up text-islamic-navy mb-6 leading-tight">
            Ghana Muslim Students' Association
          </h1>
          
          <p className="text-lg text-islamic-charcoal/80 animate-fade-up animation-delay-200 max-w-2xl mb-10">
            Strengthening faith, fostering community, and providing essential Islamic resources for Muslim students at the University for Development Studies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <button className="px-8 py-3 bg-islamic-green text-white rounded-lg font-medium transition-all hover:bg-islamic-darkGreen hover:shadow-lg">
              Join Our Community
            </button>
            <button className="px-8 py-3 bg-white border border-islamic-navy/20 text-islamic-navy rounded-lg font-medium transition-all hover:bg-islamic-navy hover:text-white hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce p-2 rounded-full bg-white/80 border border-gray-200 shadow-sm"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} className="text-islamic-navy" />
      </button>
    </section>
  );
};

export default Hero;
