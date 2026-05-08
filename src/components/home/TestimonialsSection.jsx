import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '../ScrollReveal';
import { Star } from 'lucide-react';

const testimonials = {
  sk: [
    { name: 'Martin Novák', location: 'Poprad', text: 'Profesionálny prístup od začiatku do konca. Kuchyňa predčila naše očakávania. Odporúčame každému.', rating: 5 },
    { name: 'Jana Kováčová', location: 'Vysoké Tatry', text: 'Šatňa je nádherná a funkčná. Presne podľa našich predstáv. Kvalitné materiály a precízne spracovanie.', rating: 5 },
    { name: 'Peter Horváth', location: 'Kežmarok', text: 'Stôl z masívneho dubu je úžasný. Každý návštevník sa na neho pýta. Výborná práca a komunikácia.', rating: 5 },
  ],
  cz: [
    { name: 'Martin Novák', location: 'Poprad', text: 'Profesionální přístup od začátku do konce. Kuchyně předčila naše očekávání.', rating: 5 },
    { name: 'Jana Kováčová', location: 'Vysoké Tatry', text: 'Šatna je nádherná a funkční. Přesně podle našich představ.', rating: 5 },
    { name: 'Peter Horváth', location: 'Kežmarok', text: 'Stůl z masivního dubu je úžasný. Výborná práce.', rating: 5 },
  ],
  de: [
    { name: 'Martin Novák', location: 'Poprad', text: 'Professioneller Ansatz von Anfang bis Ende. Die Küche hat unsere Erwartungen übertroffen.', rating: 5 },
    { name: 'Jana Kováčová', location: 'Hohe Tatra', text: 'Der Kleiderschrank ist wunderschön und funktional. Genau nach unseren Vorstellungen.', rating: 5 },
    { name: 'Peter Horváth', location: 'Käsmark', text: 'Der Tisch aus massiver Eiche ist erstaunlich. Hervorragende Arbeit.', rating: 5 },
  ],
  en: [
    { name: 'Martin Novák', location: 'Poprad', text: 'Professional approach from start to finish. The kitchen exceeded our expectations. Highly recommended.', rating: 5 },
    { name: 'Jana Kováčová', location: 'High Tatras', text: 'The wardrobe is beautiful and functional. Exactly according to our vision. Quality materials.', rating: 5 },
    { name: 'Peter Horváth', location: 'Kežmarok', text: 'The solid oak table is amazing. Every visitor asks about it. Excellent work and communication.', rating: 5 },
  ],
};

export default function TestimonialsSection() {
  const { language, t } = useLanguage();
  const items = testimonials[language] || testimonials.en;

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('testimonials.label')}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-16 leading-tight">{t('testimonials.title')}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="bg-background rounded-2xl p-8 h-full">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-body text-sm leading-relaxed text-muted-foreground mb-8">"{item.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center font-display text-sm font-bold text-accent">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-body text-sm font-semibold">{item.name}</div>
                    <div className="font-body text-xs text-muted-foreground">{item.location}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}