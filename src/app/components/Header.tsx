import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import weddwoodLogo from '../../assets/weddwood-logo.png';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.16, delayChildren: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm"
    >
      <nav className="mx-auto flex max-w-[1680px] items-center justify-between px-4 py-2.5 md:px-10 md:py-4 lg:px-14">
        <div className="hidden flex-1 items-center justify-start gap-12 lg:gap-16 md:flex">
          <motion.button 
            variants={navItemVariants}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('about')}
            className="cursor-pointer font-['Josefin_Sans'] font-light text-xl hover:text-[#C8AE75] transition-colors"
          >
            About
          </motion.button>
          <motion.button 
            variants={navItemVariants}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('services')}
            className="cursor-pointer font-['Josefin_Sans'] font-light text-xl hover:text-[#C8AE75] transition-colors"
          >
            Services
          </motion.button>
        </div>
        
        <motion.div 
          variants={navItemVariants}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={weddwoodLogo} 
            alt="Weddwood Design" 
            loading="lazy"
            decoding="async"
            className="h-12 w-auto max-w-[122px] object-contain transition-transform duration-700 ease-in-out hover:scale-[1.03] md:h-20 md:max-w-[180px]"
          />
        </motion.div>

        <div className="hidden flex-1 items-center justify-end gap-12 lg:gap-16 md:flex">
          <motion.button 
            variants={navItemVariants}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('gallery')}
            className="cursor-pointer font-['Josefin_Sans'] font-light text-xl hover:text-[#C8AE75] transition-colors"
          >
            Gallery
          </motion.button>
          <motion.button 
            variants={navItemVariants}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => scrollToSection('contact')}
            className="cursor-pointer font-['Josefin_Sans'] font-light text-xl hover:text-[#C8AE75] transition-colors"
          >
            Contact
          </motion.button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c29a]/70 text-black transition-colors hover:bg-[#f7f1e7] md:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#d8c29a]/50 bg-white/95 px-4 pb-5 pt-3 backdrop-blur-sm md:hidden">
          <div className="flex flex-col gap-2">
            {[
              ['About', 'about'],
              ['Services', 'services'],
              ['Gallery', 'gallery'],
              ['Contact', 'contact'],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="cursor-pointer w-full rounded-2xl px-4 py-3 text-left font-['Josefin_Sans'] text-lg text-black transition-colors hover:bg-[#f7f1e7]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
