
import { Mail, Phone } from 'lucide-react';

// Sample data for executives
const executives = [
  {
    id: 1,
    name: "Ahmad Mahmoud",
    position: "President",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop",
    email: "ahmad@gmsauds.org",
    phone: "+233 55 123 4567"
  },
  {
    id: 2,
    name: "Mahama Ibrahim",
    position: "Vice President",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop",
    email: "fatima@gmsauds.org",
    phone: "+233 55 234 5678"
  },
  {
    id: 3,
    name: "Omar Hassan",
    position: "General Secretary",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=774&auto=format&fit=crop",
    email: "omar@gmsauds.org",
    phone: "+233 55 345 6789"
  },
  {
    id: 4,
    name: "Kofi Mohammed",
    position: "Treasurer",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop",
    email: "aisha@gmsauds.org",
    phone: "+233 55 456 7890"
  }
];

const ExecutiveCards = () => {
  return (
    <section id="executives" className="py-20 px-6 bg-white relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-islamic-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h6 className="text-islamic-green text-sm font-medium uppercase mb-3 tracking-wider">Leadership</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-islamic-navy mb-6">Meet Our Executives</h2>
          <p className="text-islamic-charcoal/70">
            Get to know the dedicated team leading GMSA UDS Nyankpala Campus, working to serve our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div 
              key={executive.id} 
              className="executive-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                <img 
                  src={executive.imageUrl} 
                  alt={executive.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <h3 className="text-xl font-bold text-islamic-navy mb-1">{executive.name}</h3>
              <p className="text-islamic-green text-sm font-medium mb-4">{executive.position}</p>
              
              <div className="flex flex-col gap-2 text-islamic-charcoal/80">
                <a 
                  href={`mailto:${executive.email}`}
                  className="flex items-center gap-2 hover:text-islamic-green transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{executive.email}</span>
                </a>
                <a 
                  href={`tel:${executive.phone}`}
                  className="flex items-center gap-2 hover:text-islamic-green transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{executive.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-islamic-navy text-white rounded-lg font-medium transition-all hover:bg-islamic-charcoal hover:shadow-lg">
            View All Executives
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCards;
