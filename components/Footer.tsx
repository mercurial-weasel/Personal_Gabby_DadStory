
import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Users, Heart } from 'lucide-react';
import { THEME } from '@/themes';

const Footer: React.FC = () => {
  return (
    <footer className={`flex flex-col gap-6 px-10 py-12 text-center border-t border-solid ${THEME.border.standard} ${THEME.bg.footer}`}>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <a className={`${THEME.text.muted} hover:text-primary text-sm font-medium transition-colors tracking-widest uppercase flex items-center gap-2`} href="#">
          <PenTool className="w-4 h-4" />
          Archive
        </a>
        <Link className={`${THEME.text.muted} hover:text-primary text-sm font-medium transition-colors tracking-widest uppercase flex items-center gap-2`} to="/family">
          <Users className="w-4 h-4" />
          Family Tree
        </Link>
      </div>
      <div className="space-y-4">
        <p className={`${THEME.text.muted} text-sm font-normal`}>Dad's Story &copy; {new Date().getFullYear()} — Made for Gabby</p>
        <div className="flex justify-center gap-4 text-[#957350]/60">
          <Heart className="w-5 h-5 animate-pulse" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
