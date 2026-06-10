import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // Se já está na página inicial, apenas faz scroll para o topo
      scrollToTop();
    } else {
      // Se está em outra página, redireciona para a página inicial
      navigate('/');
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 border-b border-border',
          'bg-wedding-cream/95 dark:bg-[#111827]/95',
          scrolled ? 'shadow-md py-2' : 'py-4'
        )}
      >
        <div className='container mx-auto px-4'>
          <div className='flex justify-center items-center'>
            <button
              onClick={handleLogoClick}
              className='font-playfair text-lg md:text-xl text-foreground dark:text-white hover:text-wedding-gold transition-colors'
            >
              Luan & Cauane
            </button>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border border-gray-300 dark:border-wedding-gold shadow-lg transition-all duration-300',
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <ArrowUp className='w-6 h-6 text-wedding-gold' />
      </button>
    </>
  );
};

export default NavBar;
