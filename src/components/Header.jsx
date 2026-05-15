import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { useTheme } from '@/lib/ThemeContext';
import { ChevronDown, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'sk', label: 'SK', flag: '🇸🇰' },
  { code: 'cz', label: 'CZ', flag: '🇨🇿' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const location = useLocation();

  // Transparent only on desktop (lg+) on home page when not scrolled
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHeroPage = location.pathname === '/';
  const isTransparent = !scrolled && isHeroPage && isDesktop;
  const useWhiteText = isTransparent && theme === 'light';

  const openServices = () => { setServicesOpen(true); setLangOpen(false); };
  const openLang = () => { setLangOpen(true); setServicesOpen(false); };

  const currentLang = languages.find(l => l.code === language);

  const serviceLinks = [
    { key: 'kitchens', path: '/services/kitchens' },
    { key: 'wardrobes', path: '/services/wardrobes' },
    { key: 'tables', path: '/services/tables' },
    { key: 'doors', path: '/services/doors' },
    { key: 'custom', path: '/services/custom' },
  ];

  // Desktop nav uses white text when transparent, normal otherwise
  const textColor = useWhiteText ? 'text-white' : 'text-foreground';
  const mutedTextColor = useWhiteText ? 'text-white/70' : 'text-muted-foreground';
  const hoverBg = useWhiteText ? 'hover:bg-white/10' : 'hover:bg-foreground/5';
  const activeBg = useWhiteText ? 'bg-white/10' : 'bg-foreground/5';
  const logoBg = useWhiteText ? 'bg-white text-foreground' : 'bg-foreground text-background';

  const headerBg = isTransparent ? 'bg-transparent' : 'bg-background ';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}

          <Link to="/"
            onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }}
           className="flex items-center gap-3 group">
<img
  src={theme === 'light' ? "/public/logotmave.png" : "/public/logopoporad.png"}
  alt="Logo"
  className="h-10 w-auto"
/>
     
              {/* <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold tracking-wide transition-colors duration-500 ${logoBg}`}
              >
                DK
              </div>

              <div className="hidden sm:block">
                <div
                  className={`font-body text-base font-semibold leading-tight transition-colors duration-500 ${textColor}`}
                >
                  Daniel Kubin
                </div>

                <div
                  className={`text-[10px] font-body tracking-[0.3em] uppercase transition-colors duration-500 ${mutedTextColor}`}
                >
                  {t('about.subtitle')}
                </div>
              </div> */}
            </Link>
         

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" className={`px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname === '/' ? activeBg : hoverBg}`}>
              {t('nav.home')}
            </Link>
            <Link to="/about" className={`px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname === '/about' ? activeBg : hoverBg}`}>
              {t('nav.about')}
            </Link>
            <Link to="/projects" className={`px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname === '/projects' ? activeBg : hoverBg}`}>
              {t('nav.projects')}
            </Link>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={openServices} onMouseLeave={() => setServicesOpen(false)}>
              <button className={`flex items-center gap-1 px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname.startsWith('/services') ? activeBg : hoverBg}`}>
                {t('nav.services')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-background rounded-xl border border-border shadow-xl overflow-hidden"
                  >
                    {serviceLinks.map((s) => (
                      <Link key={s.key} to={s.path} className="block px-5 py-3 font-body text-sm text-foreground hover:bg-foreground/5 transition-colors">
                        {t(`services_menu.${s.key}`)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/faq" className={`px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname === '/faq' ? activeBg : hoverBg}`}>
              FAQ
            </Link>
            <Link to="/contact" className={`px-4 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${location.pathname === '/contact' ? activeBg : hoverBg}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1.5">

            
            <button onClick={toggleTheme} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
            ${logoBg}
      `}>
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>

            {/* Language — desktop only */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => (langOpen ? setLangOpen(false) : openLang())}
                className={`flex items-center gap-1 px-3 py-2 font-body text-sm font-medium rounded-full transition-all duration-300 ${hoverBg} ${textColor}`}
              >
                {currentLang?.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-1 w-36 bg-background rounded-xl border border-border shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-3 font-body text-sm text-foreground flex items-center gap-2 hover:bg-foreground/5 transition-colors ${language === lang.code ? 'bg-foreground/5 font-medium' : ''}`}
                      >
                        <span>{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <Link
              to="/contact"
              className={`hidden lg:flex items-center gap-1.5 px-5 py-2.5 font-body text-sm font-medium rounded-full transition-all duration-300 ${
                useWhiteText
                  ? 'bg-white text-foreground hover:bg-white/90'
                  : 'bg-foreground text-background hover:opacity-90'
              }`}
            >
              {t('nav.consultation')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-full transition-all duration-300 hover:bg-foreground/5 text-foreground">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — always solid bg-background */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              <Link to="/" className="block py-3 font-body text-base font-medium text-foreground border-b border-border/30">{t('nav.home')}</Link>
              <Link to="/about" className="block py-3 font-body text-base font-medium text-foreground border-b border-border/30">{t('nav.about')}</Link>

              <Link to="/projects" className="block py-3 font-body text-base font-medium text-foreground border-b border-border/30">{t('nav.projects')}</Link>

              {/* Services accordion */}
              <div className="border-b border-border/30">
                <button
                  onClick={() => { setMobileServicesOpen(!mobileServicesOpen); setMobileLangOpen(false); }}
                  className="flex items-center justify-between w-full py-3 font-body text-base font-medium text-foreground"
                >
                  {t('nav.services')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="pb-2 space-y-1">
                        {serviceLinks.map((s) => (
                          <Link key={s.key} to={s.path} className="block py-2 pl-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {t(`services_menu.${s.key}`)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/faq" className="block py-3 font-body text-base font-medium text-foreground border-b border-border/30">FAQ</Link>
              <Link to="/contact" className="block py-3 font-body text-base font-medium text-foreground border-b border-border/30">{t('nav.contact')}</Link>

              {/* Language accordion in mobile */}
              <div className="border-b border-border/30">
                <button
                  onClick={() => { setMobileLangOpen(!mobileLangOpen); setMobileServicesOpen(false); setMobileProjectsOpen(false); }}
                  className="flex items-center justify-between w-full py-3 font-body text-base font-medium text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <span>{currentLang?.flag}</span>
                    {currentLang?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="pb-2 space-y-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => { setLanguage(lang.code); setMobileLangOpen(false); }}
                            className={`flex items-center gap-2 w-full py-2 pl-4 font-body text-sm hover:text-foreground transition-colors ${language === lang.code ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                          >
                            <span>{lang.flag}</span> {lang.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/contact"
                className="mt-2 flex items-center justify-center gap-1.5 w-full px-5 py-3 bg-foreground text-background font-body text-sm font-medium rounded-full"
              >
                {t('nav.consultation')}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}