import React, { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import { motion, useScroll, useTransform } from 'framer-motion';

function StickyCard({ step, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="bg-card rounded-2xl p-8 h-full group hover:shadow-lg transition-shadow duration-500"
    >
      <span className="font-body text-5xl font-bold text-muted-foreground/20 group-hover:text-accent/30 transition-colors duration-500">
        {step.num}
      </span>
      <h3 className="font-body text-lg font-semibold mt-4 mb-3">{step.title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    { num: '01', title: t('process.step1_title'), desc: t('process.step1_desc') },
    { num: '02', title: t('process.step2_title'), desc: t('process.step2_desc') },
    { num: '03', title: t('process.step3_title'), desc: t('process.step3_desc') },
    { num: '04', title: t('process.step4_title'), desc: t('process.step4_desc') },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="max-w-xl mb-16">
            <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('process.label')}</span>
            <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight">{t('process.title')}</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <StickyCard key={step.num} step={step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}