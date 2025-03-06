
import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  BookOpen, 
  BookText, 
  Calendar, 
  Mail, 
  Clock, 
  DollarSign, 
  Users, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

// const SIDEBAR_LINKS = [
//   { name: 'Prayer Times', path: '/prayer-times', icon: Clock },
//   { name: 'Quran', path: '/quran', icon: BookText },
//   { name: 'Articles', path: '/articles', icon: BookOpen },
//   { name: 'News', path: '/news', icon: Calendar },
//   { name: 'Executives', path: '/executives', icon: Users },
//   { name: 'Donate', path: '/donate', icon: DollarSign },
//   { name: 'Message Imam', path: '/message-imam', icon: Mail },
// ];

const AppLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setCurrentPath(path);
    setIsSidebarOpen(false); // Close sidebar on mobile when navigating
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-islamic-green text-white p-3 rounded-full shadow-lg"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex flex-1">
        {/* Sidebar */}
        {/* <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-40 lg:relative w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 pt-16",
            isSidebarOpen ? "translate-x-0" : "translate-x-0" // This was -translate-x-full
          )}
        >
          {user && (
            <div className="p-4 border-b">
              <div className="font-semibold text-islamic-navy">{user.user_metadata.username || 'User'}</div>
              <div className="text-sm text-islamic-charcoal/70">{user.email}</div>
            </div>
          )} */}

          {/* <nav className="p-4"> */}
            {/* <ul className="space-y-2">
              {SIDEBAR_LINKS.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors",
                      currentPath === link.path
                        ? "bg-islamic-green/10 text-islamic-green"
                        : "hover:bg-islamic-cream text-islamic-charcoal"
                    )}
                  >
                    <link.icon size={18} />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-4 border-t mt-4">
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </li>
            </ul>
          </nav> */}
        {/* </aside> */}

        {/* Main content */}
        <main className={cn(
          "flex-1 transition-all",
          isSidebarOpen ? "lg:ml-0" : "lg:ml-0"
        )}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AppLayout;
