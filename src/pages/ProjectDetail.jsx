import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { projectsData } from '@/lib/projectsData';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';
import Lightbox from '@/components/Lightbox';
import HeroSlider from '@/components/HeroSlider';
import { ArrowLeft, MapPin, Calendar, ArrowUpRight, Target, Wrench, AlertTriangle, Lightbulb, Ruler } from 'lucide-react';

const InfoBlock = ({ icon: Icon, label, content }) => (
  <div className="border border-border rounded-2xl p-6">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-accent" />
      <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground">{label}</h3>
    </div>
    <p className="font-body text-sm leading-relaxed text-foreground/80">{content}</p>
  </div>
);

export default function ProjectDetail() {
  const { language, t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const projectId = window.location.pathname.split('/projects/')[1];
  const project = projectsData.find(p => p.id === projectId);

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex(prev => (prev + 1) % project.gallery.length);
  }, [project]);
  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
  }, [project]);

  if (!project) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <p className="font-body text-muted-foreground">Project not found</p>
        <Link to="/projects" className="mt-4 inline-flex items-center gap-2 font-body text-sm text-accent hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {t('projects.title')}
        </Link>
      </div>
    );
  }

  const backLink = (
    <Link to="/projects" className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors">
      <ArrowLeft className="w-4 h-4" />
      {t('projects.title')}
    </Link>
  );

  const subtitle = (
    <div className="flex flex-wrap gap-4 mt-3">
      <div className="flex items-center gap-2 text-white/70">
        <MapPin className="w-4 h-4" />
        <span className="font-body text-sm">{project.location[language]}</span>
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <Calendar className="w-4 h-4" />
        <span className="font-body text-sm">{project.year}</span>
      </div>
    </div>
  );

  return (
    <div className="pt-20">
      {/* Cinematic Hero Slider */}
      <HeroSlider
        images={project.gallery}
        title={project.title[language]}
        subtitle={subtitle}
        backLink={backLink}
      />

      {/* Main content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Left: all detail blocks */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              <ScrollReveal>
                <h2 className="font-body text-2xl md:text-3xl font-bold mb-4">{t('projects.description')}</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{project.description[language]}</p>
              </ScrollReveal>

              {/* Detail info blocks */}
              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.clientGoals?.[language] && (
                    <InfoBlock icon={Target} label={t('projects.clientGoals')} content={project.clientGoals[language]} />
                  )}
                  {project.process?.[language] && (
                    <InfoBlock icon={Wrench} label={t('projects.process')} content={project.process[language]} />
                  )}
                  {project.challenges?.[language] && (
                    <InfoBlock icon={AlertTriangle} label={t('projects.challenges')} content={project.challenges[language]} />
                  )}
                  {project.customSolutions?.[language] && (
                    <InfoBlock icon={Lightbulb} label={t('projects.customSolutions')} content={project.customSolutions[language]} />
                  )}
                </div>
              </ScrollReveal>

              {/* Technical details */}
              {project.technicalDetails?.[language] && (
                <ScrollReveal delay={0.15}>
                  <InfoBlock icon={Ruler} label={t('projects.technicalDetails')} content={project.technicalDetails[language]} />
                </ScrollReveal>
              )}

              {/* Gallery */}
              <ScrollReveal delay={0.2}>
                <h2 className="font-body text-2xl md:text-3xl font-bold mb-6">{t('projects.gallery')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer relative"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-0 group-hover:scale-100">
                          <ArrowUpRight className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal direction="right">
                <div className="bg-card rounded-2xl p-8 sticky top-28 space-y-6 ">
                  {/* Materials */}
                  <div>
                    <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{t('projects.materials_used')}</h3>
                    <div className="space-y-2.5">
                      {project.materials[language].map((mat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                          <span className="font-body text-sm">{mat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('projects.location')}</span>
                      <p className="font-body text-sm font-semibold mt-1">{project.location[language]}</p>
                    </div>
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('projects.year')}</span>
                      <p className="font-body text-sm font-semibold mt-1">{project.year}</p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-background font-body text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                  >
                    {t('projects.contact_us')}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="bg-foreground text-background rounded-3xl p-10 md:p-16 text-center">
              <h2 className="font-body text-3xl md:text-4xl font-bold">{t('projects.interested')}</h2>
              <p className="font-body text-base text-background/60 mt-3 max-w-md mx-auto">{t('projects.interested_desc')}</p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-body text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                {t('projects.contact_us')}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </div>
  );
}