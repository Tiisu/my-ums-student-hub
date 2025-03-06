
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  // Define navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Prayer Times', path: '/prayer-times' },
    { name: 'Quran', path: '/quran' },
    { name: 'Articles', path: '/articles' },
    { name: 'News', path: '/news' },
   
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/90 backdrop-blur-lg shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-islamic-navy">GMSA <span className="text-islamic-green">UDS</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link to="/profile">
                <Button variant="outline" className="border-islamic-blue text-islamic-blue">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/donate">
                <Button className="bg-islamic-green text-white hover:bg-islamic-darkGreen">
                  {/* <LogIn className="mr-2 h-4 w-4" /> */}
                  Donate Now
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-islamic-navy"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-islamic-navy py-2 ${
                    isActive(item.path) ? 'font-semibold text-islamic-green' : ''
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center py-2 text-islamic-blue"
                  onClick={closeMobileMenu}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/donate"
                  className="flex items-center py-2 text-islamic-green"
                  onClick={closeMobileMenu}
                >
                  {/* <LogIn className="mr-2 h-4 w-4" /> */}
                  Donate
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
