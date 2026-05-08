import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { projectsData } from '@/lib/projectsData';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/home/CTASection';
import HeroSlider from '@/components/HeroSlider';
import Lightbox from '@/components/Lightbox';
import { ArrowLeft, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const serviceImages = {
  kitchens: ['https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/bc3acfd2f_generated_82acfec8.png', 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/f6b38a487_generated_718b1cb0.png', 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/4a55adbfe_generated_43992d88.png'],
  wardrobes: ['https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/d41068efa_generated_fd8d0291.png', 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/758883475_generated_b1cc8aaa.png'],
  tables: ['https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/050f4a213_generated_23ae7ecd.png', 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/efe807ad6_generated_3521490a.png'],
  doors: ['https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/498c7d0f2_generated_80646792.png'],
  custom: ['https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/758883475_generated_b1cc8aaa.png', 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/d41068efa_generated_fd8d0291.png'],
};

const categoryMap = {
  kitchens: 'kitchens',
  wardrobes: 'wardrobes',
  tables: 'tables',
  doors: 'doors',
  custom: 'furniture',
};

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left">
        <span className="font-body text-sm font-medium pr-4">{question}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="font-body text-sm text-muted-foreground leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const { t, language } = useLanguage();
  const serviceKey = window.location.pathname.split('/services/')[1];
  const validKeys = ['kitchens', 'wardrobes', 'tables', 'doors', 'custom'];
  const defaultCategory = validKeys.includes(serviceKey) ? categoryMap[serviceKey] : 'kitchens';

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [projectFilter, setProjectFilter] = useState(defaultCategory);

  if (!validKeys.includes(serviceKey)) {
    return (
      <div className="pt-32 min-h-screen text-center">
        <p className="font-body text-muted-foreground">Service not found</p>
      </div>
    );
  }

  const allProjects = projectsData;
  const filteredProjects = projectFilter === 'all' ? allProjects : allProjects.filter(p => p.category === projectFilter);
  const galleryImages = serviceImages[serviceKey] || [];
  const faqs = t(`services_page.${serviceKey}_faq`) || [];

  const backLink = (
    <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-white/70 hover:text-white transition-colors">
      <ArrowLeft className="w-4 h-4" />
      {t('nav.home')}
    </Link>
  );

  return (
    <div className="pt-20">
      {/* Hero Slider */}
      <HeroSlider
        images={galleryImages}
        title={t(`services_page.${serviceKey}_title`)}
        subtitle={
          <p className="font-body text-sm text-white/60 mt-1 tracking-widest uppercase">{t('services_page.label')}</p>
        }
        backLink={backLink}
      />

      {/* Description + Workflow */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-10">
              <ScrollReveal>
                <h2 className="font-body text-2xl md:text-3xl font-bold mb-4">{t('services_page.about_label')}</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{t(`services_page.${serviceKey}_desc`)}</p>
              </ScrollReveal>

              {/* Materials */}
              <ScrollReveal delay={0.1}>
                <h2 className="font-body text-2xl font-bold mb-5">{t('projects.materials_used')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(t(`services_page.${serviceKey}_materials`) || []).map((mat, i) => (
                    <div key={i} className="bg-card rounded-xl px-4 py-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="font-body text-sm">{mat}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <ScrollReveal delay={0.15}>
                  <h2 className="font-body text-2xl font-bold mb-5">{t('projects.gallery')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setLightboxIndex(i)}
                        className="aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer relative"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <div className="scale-0 group-hover:scale-100 transition-transform duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4 text-black" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {/* FAQ */}
              {Array.isArray(faqs) && faqs.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <h2 className="font-body text-2xl font-bold mb-2">FAQ</h2>
                  <div>
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <ScrollReveal direction="right">
                <div className="bg-card rounded-2xl p-8 sticky top-28 space-y-6">
                  <div>
                    <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{t('process.label')}</h3>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="flex items-start gap-3">
                          <span className="font-body text-xs font-bold text-accent/60 w-5 flex-shrink-0 mt-0.5">0{n}</span>
                          <span className="font-body text-sm">{t(`process.step${n}_title`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-foreground text-background font-body text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                    >
                      {t('cta.button')}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects with filtering */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <h2 className="font-body text-3xl md:text-4xl font-bold mb-3">{t('projects.title')}</h2>
            <p className="font-body text-base text-muted-foreground mb-8">{t('projects.subtitle')}</p>
          </ScrollReveal>
          {/* Category filters */}
          <ScrollReveal delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                { key: 'all', label: t('projects.all') },
                { key: 'kitchens', label: t('projects.kitchens') },
                { key: 'wardrobes', label: t('projects.wardrobes') },
                { key: 'tables', label: t('projects.tables') },
                { key: 'doors', label: t('projects.doors') },
                { key: 'furniture', label: t('projects.furniture') },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setProjectFilter(cat.key)}
                  className={`px-5 py-2 font-body text-sm rounded-full transition-all duration-300 ${
                    projectFilter === cat.key
                      ? 'bg-foreground text-background'
                      : 'bg-card hover:bg-secondary text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex(prev => (prev + 1) % galleryImages.length)}
          onPrev={() => setLightboxIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length)}
        />
      )}
    </div>
  );
}