import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './Theme-Toggle';
import { useTheme } from '../../context/Theme-Provider';

const Header = () => {
  const { theme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 h-16">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className={` ${theme === 'dark' ? 'text-white text-2xl' : 'text-black text-2xl'}`}>
          <Link to="dashboard">ITC Smart Card</Link>
        </div>
        <div className='mt-4'>
        <ThemeToggle />
        </div>
       
      </div>
    </header>
  );
};

export default Header;