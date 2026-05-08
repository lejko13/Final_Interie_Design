import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import { Shield, Leaf, Lightbulb, Heart } from 'lucide-react';

const valuesContent = {
  sk: {
    label: 'HODNOTY',
    title: 'Čo nás poháňa každý deň',
    values: [
      { icon: Shield, title: 'Kvalita bez kompromisov', desc: 'Používame výlučne overené materiály od dôveryhodných dodávateľov. Každý spoj, každý povrch a každý detail musí spĺňať naše prísne štandardy.' },
      { icon: Leaf, title: 'Udržateľnosť', desc: 'Drevo nakupujeme výhradne z certifikovaných lesov. Odpad z výroby využívame na vykurovanie dielne. Záleží nám na prírode, z ktorej čerpáme.' },
      { icon: Lightbulb, title: 'Inovácia', desc: 'Kombinujeme tradičné stolárske remeslo s modernou CNC technológiou. Tým dosahujeme presnosť na desatiny milimetra pri zachovaní ručne dokončeného charakteru.' },
      { icon: Heart, title: 'Vzťah s klientom', desc: 'Pre nás nie je projekt skončený odovzdaním. Poskytujeme 5-ročnú záruku na všetky naše výrobky a sme k dispozícii aj po montáži.' },
    ],
  },
  cz: {
    label: 'HODNOTY',
    title: 'Co nás každý den pohání',
    values: [
      { icon: Shield, title: 'Kvalita bez kompromisů', desc: 'Používáme výhradně ověřené materiály od důvěryhodných dodavatelů. Každý spoj, každý povrch a každý detail musí splňovat naše přísné standardy.' },
      { icon: Leaf, title: 'Udržitelnost', desc: 'Dřevo nakupujeme výhradně z certifikovaných lesů. Odpad z výroby využíváme k vytápění dílny. Záleží nám na přírodě, ze které čerpáme.' },
      { icon: Lightbulb, title: 'Inovace', desc: 'Kombinujeme tradiční truhlářské řemeslo s moderní CNC technologií pro přesnost na desetiny milimetru.' },
      { icon: Heart, title: 'Vztah s klientem', desc: 'Projekt pro nás nekončí předáním. Poskytujeme 5letou záruku na všechny naše výrobky.' },
    ],
  },
  de: {
    label: 'WERTE',
    title: 'Was uns jeden Tag antreibt',
    values: [
      { icon: Shield, title: 'Qualität ohne Kompromisse', desc: 'Wir verwenden ausschließlich geprüfte Materialien von vertrauenswürdigen Lieferanten.' },
      { icon: Leaf, title: 'Nachhaltigkeit', desc: 'Wir kaufen Holz ausschließlich aus zertifizierten Wäldern und nutzen Produktionsabfälle zum Heizen.' },
      { icon: Lightbulb, title: 'Innovation', desc: 'Wir kombinieren traditionelles Tischlerhandwerk mit moderner CNC-Technologie für Präzision auf Zehntel-Millimeter.' },
      { icon: Heart, title: 'Kundenbeziehung', desc: 'Ein Projekt endet für uns nicht mit der Übergabe. Wir bieten 5 Jahre Garantie auf alle unsere Produkte.' },
    ],
  },
  en: {
    label: 'VALUES',
    title: 'What drives us every day',
    values: [
      { icon: Shield, title: 'Quality without compromise', desc: 'We use exclusively verified materials from trusted suppliers. Every joint, surface and detail must meet our strict standards.' },
      { icon: Leaf, title: 'Sustainability', desc: 'We source wood exclusively from certified forests and use production waste to heat the workshop. We care about the nature we draw from.' },
      { icon: Lightbulb, title: 'Innovation', desc: 'We combine traditional carpentry craftsmanship with modern CNC technology, achieving precision to the tenth of a millimeter.' },
      { icon: Heart, title: 'Client relationship', desc: 'A project doesn\'t end at handover for us. We provide a 5-year warranty on all our products and remain available after installation.' },
    ],
  },
};

export default function ValuesSection() {
  const { language } = useLanguage();
  const content = valuesContent[language] || valuesContent.sk;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{content.label}</span>
          <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight mb-16">{content.title}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.values.map((val, i) => {
            const Icon = val.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-8 h-full group hover:shadow-lg transition-shadow duration-500">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-body text-base font-semibold mb-3">{val.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}