import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { projectsData } from '@/lib/projectsData';
import ProjectCard from '../ProjectCard';
import ScrollReveal from '../ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = projectsData.slice(0, 3);

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('projects.label')}</span>
              <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight">{t('projects.title')}</h2>
              <p className="font-body text-base text-muted-foreground mt-3 max-w-md leading-relaxed">{t('projects.subtitle')}</p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-accent hover:text-foreground transition-colors flex-shrink-0"
            >
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}