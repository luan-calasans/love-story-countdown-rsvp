import React, { useState, useEffect } from 'react';
import { ArrowUp, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Início',      href: '#inicio' },
  { label: 'Galeria',     href: '#galeria' },
  { label: 'Nossa História', href: '#historia' },
  { label: 'Nossa Jornada', href: '#timeline' },
  { label: 'Cerimônia',  href: '#cerimonia' },
  { label: 'Localização', href: '#localizacao' },
  { label: 'Presentes',  href: '#presentes' },
  { label: 'Confirmar',  href: '#rsvp' },
];

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border',
          'bg-wedding-cream/95 dark:bg-[#3F3A34]/95 backdrop-blur-sm',
          scrolled ? 'shadow-md py-3' : 'py-4'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center pb-1">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="font-playfair text-lg md:text-xl text-foreground dark:text-white hover:text-wedding-gold transition-colors"
            >
              Luan & Cauane
            </button>

            {/* Links desktop */}
            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:text-wedding-gold dark:hover:text-wedding-gold transition-colors rounded-md hover:bg-wedding-gold/10 font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Botão hamburguer mobile */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-wedding-gold hover:bg-wedding-gold/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile dropdown */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <ul className="flex flex-col border-t border-wedding-gold/20 bg-wedding-cream/98 dark:bg-[#3F3A34]/98 px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-3 text-base text-gray-700 dark:text-gray-200 hover:text-wedding-gold dark:hover:text-wedding-gold transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0 font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          'fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/70 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 border border-gray-300 dark:border-wedding-olive shadow-lg transition-all duration-300',
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        )}
      >
        <ArrowUp className="w-6 h-6 text-wedding-olive" />
      </button>
    </>
  );
};

export default NavBar;
