import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import { Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Daniel Kubin',
    position: { sk: 'Zakladateľ & Hlavný stolár', cz: 'Zakladatel & Hlavní truhlář', de: 'Gründer & Haupttischler', en: 'Founder & Lead Carpenter' },
    bio: { sk: '15 rokov skúseností s výrobou nábytku na mieru. Absolvent SPŠD Poprad, odborník na moderné kuchyne a vstavaný nábytok.', cz: '15 let zkušeností s výrobou nábytku na míru. Absolvent SPŠD Poprad, odborník na moderní kuchyně.', de: '15 Jahre Erfahrung in der Maßmöbelherstellung. Spezialist für moderne Küchen und Einbaumöbel.', en: '15 years of experience in custom furniture. Specialist in modern kitchens and built-in furniture.' },
    email: 'daniel.kubin@kubin-stolarstvo.sk',
    phone: '+421 905 123 456',
    image: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/efe807ad6_generated_3521490a.png',
  },
  {
    name: 'Marek Kováč',
    position: { sk: 'Dizajnér interiérov', cz: 'Designér interiérů', de: 'Innenarchitekt', en: 'Interior Designer' },
    bio: { sk: 'Špecialista na 3D vizualizácie a dizajn priestoru. Premení vaše predstavy na konkrétny plán pred začatím výroby.', cz: 'Specialista na 3D vizualizace. Přemění vaše představy na konkrétní plán před výrobou.', de: 'Spezialist für 3D-Visualisierungen und Raumgestaltung.', en: 'Specialist in 3D visualizations and space design. Turns your vision into a concrete plan.' },
    email: 'marek.kovac@kubin-stolarstvo.sk',
    phone: '+421 905 234 567',
    image: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/bc3acfd2f_generated_82acfec8.png',
  },
  {
    name: 'Lukáš Novák',
    position: { sk: 'Vedúci výroby', cz: 'Vedoucí výroby', de: 'Produktionsleiter', en: 'Production Manager' },
    bio: { sk: 'Zodpovedá za celý výrobný proces od výberu materiálov po finálnu kontrolu kvality. Dbá na precíznosť každého spoja.', cz: 'Odpovídá za celý výrobní proces od materiálů po kvalitu. Dbá na preciznost každého spoje.', de: 'Verantwortlich für den gesamten Produktionsprozess und Qualitätskontrolle.', en: 'Responsible for the entire production process from materials to final quality control.' },
    email: 'lukas.novak@kubin-stolarstvo.sk',
    phone: '+421 905 345 678',
    image: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/4a55adbfe_generated_43992d88.png',
  },
  {
    name: 'Petra Horváthová',
    position: { sk: 'Koordinátorka projektov', cz: 'Koordinátorka projektů', de: 'Projektkoordinatorin', en: 'Project Coordinator' },
    bio: { sk: 'Stará sa o plynulú komunikáciu s klientmi od prvého stretnutia až po predanie hotového diela.', cz: 'Stará se o komunikaci s klienty od prvního setkání až po předání hotového díla.', de: 'Sorgt für reibungslose Kommunikation vom ersten Treffen bis zur Übergabe.', en: 'Ensures smooth client communication from the first meeting to final handover.' },
    email: 'petra.horvathova@kubin-stolarstvo.sk',
    phone: '+421 905 456 789',
    image: 'https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/d41068efa_generated_fd8d0291.png',
  },
];

export default function TeamSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('about.team_label')}</span>
          <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight">{t('about.team_title')}</h2>
          <p className="font-body text-base text-muted-foreground mt-3 mb-16 max-w-xl leading-relaxed">{t('about.team_subtitle')}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="group bg-background rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-500">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-body text-base font-semibold">{member.name}</h3>
                  <p className="font-body text-sm text-accent mt-0.5">{member.position[language]}</p>
                  <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio[language]}</p>
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-accent transition-colors group/link"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate group-hover/link:underline underline-offset-2">{member.email}</span>
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{member.phone}</span>
                    </a>
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