import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

const storyContent = {
  sk: {
    label: 'NÁŠA HISTÓRIA',
    title: 'Príbeh, ktorý začal v malom dielni',
    paragraphs: [
      'Všetko sa začalo v roku 2009, keď Daniel Kubin otvoril malú stolársku dielňu v Poprade. S jedným sústruhom, niekoľkými ručnými nástrojmi a veľkým snom – vyrábať nábytok, ktorý vydrží generácie.',
      'Prvé roky boli náročné. Pracoval sám, od rána do neskorého večera, učil sa od starých majstrov a hľadal vlastnú cestu medzi tradičným stolárskym remeslom a moderným dizajnom. Každý projekt bol príležitosťou na zlepšenie.',
      'Dnes, po viac ako 15 rokoch, má Daniel za sebou tím skúsených odborníkov, modernú výrobňu vybaveného najnovšou technológiou a stovky spokojných klientov z celého Slovenska, Čiech aj Rakúska.',
      'Naše zariadenie dnes disponuje CNC frézkovou technológiou, digitálnym meraním a klimatizovanými skladovacími priestormi pre drevo. To nám umožňuje dodávať konzistentnú kvalitu pri každom projekte – bez kompromisov.',
    ],
    workshop_label: 'VÝROBŇA',
    workshop_title: 'Kde vzniká každý kus',
    workshop_desc: 'Naša moderná dielňa v Poprade je vybavená CNC technológiou, klimatizovanými skladmi na sušenie a zretie dreva a ručnými nástrojmi pre finálne dokončovacie práce. Každý projekt prechádza tromi fázami kontroly kvality pred odovzdaním.',
  },
  cz: {
    label: 'NAŠE HISTORIE',
    title: 'Příběh, který začal v malé dílně',
    paragraphs: [
      'Vše začalo v roce 2009, kdy Daniel Kubin otevřel malou truhlářskou dílnu v Popradu. S jedním soustruhem, několika ručními nástroji a velkým snem – vyrábět nábytek, který vydrží generace.',
      'První roky byly náročné. Pracoval sám, od rána do pozdního večera, učil se od starých mistrů a hledal vlastní cestu mezi tradičním řemeslem a moderním designem.',
      'Dnes, po více než 15 letech, má Daniel za sebou tým zkušených odborníků, moderní výrobnu vybavenou nejnovější technologií a stovky spokojených klientů z celého Slovenska, Česka i Rakouska.',
      'Naše zařízení dnes disponuje CNC frézovací technologií, digitálním měřením a klimatizovanými skladovacími prostory pro dřevo.',
    ],
    workshop_label: 'VÝROBNA',
    workshop_title: 'Kde vzniká každý kus',
    workshop_desc: 'Naše moderní dílna v Popradu je vybavena CNC technologií, klimatizovanými sklady pro sušení dřeva a ručními nástroji pro finální dokončovací práce. Každý projekt prochází třemi fázemi kontroly kvality.',
  },
  de: {
    label: 'UNSERE GESCHICHTE',
    title: 'Eine Geschichte, die in einer kleinen Werkstatt begann',
    paragraphs: [
      'Alles begann 2009, als Daniel Kubin in Poprad eine kleine Schreinerwerkstatt eröffnete. Mit einer Drehmaschine, einigen Handwerkzeugen und einem großen Traum – Möbel herzustellen, die Generationen überdauern.',
      'Die ersten Jahre waren herausfordernd. Er arbeitete allein, von früh bis spät, lernte von alten Meistern und suchte seinen eigenen Weg zwischen traditionellem Handwerk und modernem Design.',
      'Heute, nach mehr als 15 Jahren, hat Daniel ein erfahrenes Team, eine moderne Werkstatt mit neuester Technologie und hunderte zufriedene Kunden aus der Slowakei, Tschechien und Österreich.',
      'Unsere Anlage verfügt heute über CNC-Fräsentechnologie, digitale Vermessung und klimatisierte Lagerräume für Holz.',
    ],
    workshop_label: 'WERKSTATT',
    workshop_title: 'Wo jedes Stück entsteht',
    workshop_desc: 'Unsere moderne Werkstatt in Poprad ist mit CNC-Technologie, klimatisierten Trocknungslagern und Handwerkzeugen für Finalarbeiten ausgestattet. Jedes Projekt durchläuft drei Qualitätskontrollphasen.',
  },
  en: {
    label: 'OUR STORY',
    title: 'A story that started in a small workshop',
    paragraphs: [
      'It all began in 2009 when Daniel Kubin opened a small carpentry workshop in Poprad. With one lathe, a few hand tools, and a big dream – to make furniture that would last generations.',
      'The first years were challenging. He worked alone, from early morning to late evening, learning from old masters and finding his own path between traditional craft and modern design.',
      'Today, more than 15 years later, Daniel leads an experienced team, a modern workshop equipped with the latest technology, and hundreds of satisfied clients from Slovakia, the Czech Republic, and Austria.',
      'Our facility now features CNC milling technology, digital measuring, and climate-controlled wood storage – enabling consistent quality on every project without compromise.',
    ],
    workshop_label: 'WORKSHOP',
    workshop_title: 'Where every piece is born',
    workshop_desc: 'Our modern workshop in Poprad is equipped with CNC technology, climate-controlled wood drying storage, and hand tools for final finishing work. Every project goes through three quality control phases before delivery.',
  },
};

export default function CompanyStory() {
  const { language } = useLanguage();
  const content = storyContent[language] || storyContent.sk;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: label + title + paragraphs */}
          <ScrollReveal>
            <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{content.label}</span>
            <h2 className="font-body text-4xl md:text-5xl font-bold mt-3 leading-tight mb-8">{content.title}</h2>
            <div className="space-y-5">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </ScrollReveal>

          {/* Right: image on top, workshop card below */}
          <div className="space-y-6">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://media.base44.com/images/public/69fd8ecf8aee9bf831b455dc/050f4a213_generated_23ae7ecd.png"
                  alt="Workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-card rounded-2xl p-8">
                <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{content.workshop_label}</span>
                <h3 className="font-body text-xl font-bold mt-3 mb-3">{content.workshop_title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{content.workshop_desc}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}