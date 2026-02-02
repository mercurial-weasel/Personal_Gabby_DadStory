
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Sun, Moon } from 'lucide-react';
import { THEME } from '@/themes';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Letters', path: '/letters', active: location.pathname.includes('/letter') },
    { name: 'Chapters', path: '/chapters', active: location.pathname.includes('/chapter') },
    { name: 'Family', path: '/family' },
    { name: 'Updates', path: '/updates' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-solid ${THEME.border.standard} bg-background-light/70 dark:bg-background-dark/70 backdrop-blur-xl transition-all duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="text-primary transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            <Library className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-light italic tracking-tight font-display text-primary/90">
            Our Shared Story
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = link.active ?? location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-1 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 group
                  ${isActive ? 'text-primary' : 'text-[#957350]/70 hover:text-primary'}
                `}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 transform scale-0 group-hover:scale-100 ${isActive ? 'scale-100 opacity-100' : 'opacity-0'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300 text-primary/80 hover:text-primary active:scale-95"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative group">
            <div
              className="bg-center bg-cover rounded-full size-10 border-2 border-primary/20 transition-all duration-500 group-hover:border-primary/50 group-hover:scale-105 shadow-sm"
              style={{ backgroundImage: `url('https://picsum.photos/id/64/100/100')` }}
            />
            <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-white dark:border-background-dark rounded-full shadow-sm" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
