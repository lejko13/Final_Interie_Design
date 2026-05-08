import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{t('cta.title')}</h2>
            <p className="font-body text-base text-background/60 mt-4 max-w-md mx-auto">{t('cta.subtitle')}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-body text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
            >
              {t('cta.button')}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}