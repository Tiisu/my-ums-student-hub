
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-islamic-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6">GMSA UDS</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The Ghana Muslim Students' Association at University for Development Studies, Nyankpala Campus, 
              dedicated to fostering spiritual growth and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-islamic-green transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-islamic-green transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-islamic-green transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Prayer Times', 'Articles', 'Quran Recitations', 'News & Updates', 'Donate'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-islamic-green transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-islamic-green mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  GMSA Office, UDS Nyankpala Campus, Tamale, Northern Region, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-islamic-green flex-shrink-0" />
                <a href="tel:+233551234567" className="text-gray-300 hover:text-islamic-green transition-colors">
                  +233 55 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-islamic-green flex-shrink-0" />
                <a href="mailto:info@gmsauds.org" className="text-gray-300 hover:text-islamic-green transition-colors">
                  info@gmsauds.org
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Subscribe</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news and announcements.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-islamic-green"
                required
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-islamic-green text-white rounded-lg font-medium transition-all hover:bg-islamic-darkGreen"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GMSA UDS Nyankpala Campus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
