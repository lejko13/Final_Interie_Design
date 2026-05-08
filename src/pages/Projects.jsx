import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { projectsData } from '@/lib/projectsData';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/home/CTASection';
import { Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { language } = useLanguage();

  const categories = [
    { key: 'all', label: t('projects.all') },
    { key: 'kitchens', label: t('projects.kitchens') },
    { key: 'wardrobes', label: t('projects.wardrobes') },
    { key: 'tables', label: t('projects.tables') },
    { key: 'doors', label: t('projects.doors') },
    { key: 'furniture', label: t('projects.furniture') },
  ];

  const filtered = useMemo(() => {
    let result = projectsData;
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title[language].toLowerCase().includes(q) ||
        p.location[language].toLowerCase().includes(q)
      );
    }
    return result;
  }, [filter, search, language]);

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('projects.label')}</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-tight">{t('projects.title')}</h1>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2.5 bg-card border border-border rounded-full font-body text-sm w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-5 py-2 font-body text-sm rounded-full transition-all duration-300 ${
                    filter === cat.key
                      ? 'bg-foreground text-background'
                      : 'bg-card hover:bg-secondary text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}