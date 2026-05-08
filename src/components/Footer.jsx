import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center font-display text-sm font-bold">
                DK
              </div>
              <div>
                <div className="font-display text-lg font-semibold">Daniel Kubin</div>
                <div className="text-[10px] font-body tracking-[0.3em] text-background/50 uppercase">{t('about.subtitle')}</div>
              </div>
            </div>
            <p className="font-body text-sm text-background/60 leading-relaxed max-w-xs">
              {t('about.mission')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-background/40 mb-6">{t('nav.services')}</h3>
            <div className="space-y-3">
              <Link to="/services/kitchens" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('services_menu.kitchens')}</Link>
              <Link to="/services/wardrobes" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('services_menu.wardrobes')}</Link>
              <Link to="/services/tables" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('services_menu.tables')}</Link>
              <Link to="/services/doors" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('services_menu.doors')}</Link>
              <Link to="/services/custom" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('services_menu.custom')}</Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-background/40 mb-6">Links</h3>
            <div className="space-y-3">
              <Link to="/" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('nav.home')}</Link>
              <Link to="/about" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('nav.about')}</Link>
              <Link to="/projects" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('nav.projects')}</Link>
              <Link to="/contact" className="block font-body text-sm text-background/70 hover:text-background transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-background/40 mb-6">{t('contact.label')}</h3>
            <div className="space-y-4">
              <a href="tel:+421900123456" className="flex items-center gap-3 font-body text-sm text-background/70 hover:text-background transition-colors">
                <Phone className="w-4 h-4" /> +421 900 123 456
              </a>
              <a href="mailto:info@danielkubin.sk" className="flex items-center gap-3 font-body text-sm text-background/70 hover:text-background transition-colors">
                <Mail className="w-4 h-4" /> info@danielkubin.sk
              </a>
              <div className="flex items-start gap-3 font-body text-sm text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> Kvetná 15, 058 01 Poprad, Slovakia
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-background/40">
            © {new Date().getFullYear()} Daniel Kubin. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <span className="font-body text-xs text-background/40 hover:text-background/60 cursor-pointer transition-colors">{t('footer.privacy')}</span>
            <span className="font-body text-xs text-background/40 hover:text-background/60 cursor-pointer transition-colors">{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}