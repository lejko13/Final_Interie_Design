import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProcessSection from '@/components/home/ProcessSection';
import TeamSection from '@/components/about/TeamSection';
import CompanyStory from '@/components/about/CompanyStory';
import ValuesSection from '@/components/about/ValuesSection';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="pt-8 pb-0 md:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[80vh]">

            {/* Text column */}
            <ScrollReveal>
              <div className="flex flex-col gap-7 py-12 md:py-20 pr-0 lg:pr-16">
                <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('about.label')}</span>

                <div>
                  <h1 className="font-body text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight">{t('about.title')}</h1>
                  <p className="font-body text-base italic text-accent mt-3 tracking-wide">{t('about.subtitle')}</p>
                </div>

                <div className="w-10 h-px bg-border" />

                <p className="font-body text-base text-muted-foreground leading-relaxed">{t('about.description')}</p>

                <div className="bg-card rounded-2xl p-6">
                  <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{t('about.mission_title')}</h3>
                  <p className="font-body text-sm text-foreground leading-relaxed">{t('about.mission')}</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Image column — full height, flush right */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative h-full min-h-[420px] lg:min-h-0">
                <div className="h-full rounded-2xl lg:rounded-none lg:rounded-l-none overflow-hidden">
                  <img
                    src="https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/efe807ad6_generated_3521490a.png"
                    alt="Daniel Kubin - Carpentry Workshop"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Small inset thumbnail — top right of image */}
                <div className="absolute top-4 right-4 w-32 h-24 md:w-40 md:h-28 rounded-xl overflow-hidden border-4 border-background shadow-lg">
                  <img
                    src="https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/050f4a213_generated_23ae7ecd.png"
                    alt="Workshop detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <StatsSection />
      <CompanyStory />
      <ValuesSection />

      {/* Process */}
      <ProcessSection />

      <TeamSection />

      {/* Services at bottom */}
      <ServicesPreview />

      <CTASection />
    </div>
  );
}