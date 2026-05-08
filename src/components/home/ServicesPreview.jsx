import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import { ArrowUpRight } from 'lucide-react';

const serviceImages = {
  kitchens: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/bc3acfd2f_generated_82acfec8.png',
  wardrobes: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/d41068efa_generated_fd8d0291.png',
  tables: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/050f4a213_generated_23ae7ecd.png',
  doors: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/498c7d0f2_generated_80646792.png',
  custom: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/758883475_generated_b1cc8aaa.png',
};

export default function ServicesPreview() {
  const { t } = useLanguage();

  const services = [
    { key: 'kitchens', path: '/services/kitchens' },
    { key: 'wardrobes', path: '/services/wardrobes' },
    { key: 'tables', path: '/services/tables' },
    { key: 'doors', path: '/services/doors' },
    { key: 'custom', path: '/services/custom' },
  ];

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('services_page.label')}</span>
          <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight">{t('nav.services')}</h2>
          <p className="font-body text-base text-muted-foreground mt-3 mb-12 max-w-xl leading-relaxed">{t('services_page.subtitle')}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <ScrollReveal key={service.key} delay={i * 0.08}>
              <Link to={service.path} className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={serviceImages[service.key]}
                  alt={t(`services_menu.${service.key}`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Default title */}
<div className="absolute bottom-0 left-0 right-0 p-6">
  
  <h3 className="font-body text-xl md:text-2xl font-semibold text-white">
    {t(`services_menu.${service.key}`)}
  </h3>

  <div
    className="
      grid
      grid-rows-[0fr]
      opacity-0
      transition-all
      duration-700
      ease-[cubic-bezier(0.22,1,0.36,1)]
      group-hover:grid-rows-[1fr]
      group-hover:opacity-100
    "
  >
    <div className="overflow-hidden">
      <p
        className="
          font-body
          text-sm
          text-white/80
          mt-3
          max-w-xs
          leading-relaxed
          translate-y-3
          transition-transform
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-y-0
        "
      >
        {t(`services_page.${service.key}_desc`)}
      </p>
    </div>
  </div>

</div>

                {/* Arrow button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 border border-white/30 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors duration-200" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}