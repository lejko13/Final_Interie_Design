import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/home/CTASection';

const faqData = {
  sk: {
    title: 'Často kladené otázky',
    subtitle: 'Nájdite odpovede na najčastejšie otázky o našich službách, výrobe a montáži.',
    search_placeholder: 'Hľadať otázku...',
    categories_label: 'KATEGÓRIE',
    no_results: 'Žiadne výsledky nenájdené.',
    categories: [
      { key: 'all', label: 'Všetko' },
      { key: 'pricing', label: 'Ceny' },
      { key: 'production', label: 'Výroba' },
      { key: 'installation', label: 'Montáž' },
      { key: 'kitchens', label: 'Kuchyne' },
      { key: 'wardrobes', label: 'Skrine' },
      { key: 'doors', label: 'Dvere' },
      { key: 'custom', label: 'Nábytok na mieru' },
      { key: 'delivery', label: 'Dodanie' },
    ],
    items: [
      { category: 'pricing', q: 'Koľko stojí kuchyňa na mieru?', a: 'Cena kuchyne na mieru závisí od rozmerov, použitých materiálov a vybavenia. Orientačne sa pohybuje od 3 000 € do 15 000 € a viac. Každá kuchyňa je individuálna – pošlite nám pôdorys a my vám bezplatne vypracujeme cenovú ponuku.' },
      { category: 'pricing', q: 'Aký je platobný systém?', a: 'Pracujeme s tromi platbami: 30% záloha pri podpise zmluvy, 50% po schválení návrhu a zahájení výroby, 20% po úspešnej montáži a odovzdaní.' },
      { category: 'pricing', q: 'Je konzultácia a cenová ponuka zadarmo?', a: 'Áno. Prvá konzultácia a vypracovanie cenovej ponuky vrátane 3D vizualizácie sú vždy bezplatné a nezáväzné.' },
      { category: 'pricing', q: 'Vyrábate aj lacnejšie varianty nábytku?', a: 'Zameriavame sa na prémiový segment, avšak vždy nájdeme riešenie v rámci vášho rozpočtu. Môžeme kombinovať materiály – napr. masívny dub na dvierka a kvalitné drevotrieskové jadro na korpus.' },
      { category: 'production', q: 'Ako dlho trvá výroba?', a: 'Štandardná dodacia lehota je 6–10 týždňov od schválenia návrhu. Pre jednoduchšie kusy (napr. stoly) môže byť dodanie rýchlejšie – 3–5 týždňov. V prípade termínov vás vždy vopred informujeme.' },
      { category: 'production', q: 'Aké materiály používate?', a: 'Pracujeme výlučne s prémiovými materiálmi – masívny dub, orech americký, MDF lak, sklo, kov, epoxidová živica. Všetky materiály pochádzajú od certifikovaných dodávateľov s európskymi certifikátmi.' },
      { category: 'production', q: 'Môžem vidieť priebeh výroby?', a: 'Samozrejme! Na základe dohody môžete kedykoľvek navštíviť našu dielňu a pozrieť si priebeh výroby vášho projektu. Informácie o postupe vám tiež zasielame fotkami počas výroby.' },
      { category: 'production', q: 'Aká je životnosť vášho nábytku?', a: 'Pri správnej starostlivosti je životnosť masívneho nábytku 30–50 rokov. Na všetky výrobky poskytujeme 5-ročnú záruku a servis po celú dobu životnosti.' },
      { category: 'installation', q: 'Robíte aj montáž alebo len výrobu?', a: 'Zabezpečujeme kompletnú montáž vrátane inštalácie spotrebičov, svetelných líšt a úchytiek. Po montáži pracovisko upraceme a odovzdávame v perfektnom stave.' },
      { category: 'installation', q: 'Čo potrebujem mať hotové pred montážou?', a: 'Pred montážou kuchyne je potrebné mať hotové hrubé stavebné práce, rozvody elektrickej energie, vody a plynu. Náš tím vás pred montážou presne informuje, čo musí byť pripravené.' },
      { category: 'installation', q: 'Ako dlho trvá montáž kuchyne?', a: 'Montáž kuchyne zvyčajne trvá 1–2 dni. Pri väčších projektoch (kuchyňa + obývačková stena + šatník) môže trvať 3–4 dni. Presný harmonogram dostanete vopred.' },
      { category: 'kitchens', q: 'Vyrábate aj kuchyne do neštandardných priestorov?', a: 'Áno, to je naša špecialita. Podkrovné kuchyne, L-tvary, U-tvary, ostrovčekové kuchyne – zvládame akýkoľvek tvar priestoru. Prídeme zmerať a navrhneme optimálne riešenie.' },
      { category: 'kitchens', q: 'Môžem si vybrať vlastné spotrebiče?', a: 'Áno. Pracujeme s vašimi spotrebičmi alebo vám vieme odporučiť overených partnerov. Spotrebiče viete zakomponovať do 3D návrhu, aby ste videli výsledok ešte pred výrobou.' },
      { category: 'kitchens', q: 'Aké pracovné dosky ponúkate?', a: 'Ponúkame mramor, granit, kompozitný kameň Silestone, nerez a masívne drevené dosky. Každý materiál má svoje výhody – poradíme vám pri výbere podľa vašich zvykov a životného štýlu.' },
      { category: 'wardrobes', q: 'Aké sú možnosti interiéru skríň?', a: 'Interiér navrhujeme presne podľa vašich potrieb – police rôznych výšok, zásuvky, šuflíky na spodnú bielizeň, tričkovníky, košeľovníky, trezorový výklenok, LED osvetlenie. Vieme splniť každý požiadavok.' },
      { category: 'wardrobes', q: 'Posuvné alebo otváracie dvere?', a: 'Vyrábame oba typy. Posuvné dvere šetria miesto, otváracie pôsobia masívnejšie a luxusnejšie. Odporučíme podľa veľkosti priestoru a vášho štýlu.' },
      { category: 'doors', q: 'Vyrábate interiérové dvere na mieru?', a: 'Áno. Interiérové dvere vyrábame v akýchkoľvek rozmeroch a povrchových úpravách – dub, orech, lak RAL. Ponúkame dvere so skrytými pántmi aj viditeľnými, s presklením aj bez.' },
      { category: 'custom', q: 'Môžem si objednať čokoľvek – aj netradičné kusy?', a: 'Áno. Knižnice, TV steny, vstupné predsiene, barové pulty, pracovné stoly, detské izby – ak si niečo viete predstaviť, my to vieme vyrobiť. Pošlite nám fotku alebo skicu inšpirácie.' },
      { category: 'delivery', q: 'Doručujete aj mimo Popradu?', a: 'Realizujeme projekty po celom Slovensku, v Čechách a Rakúsku. Náklady na dopravu sú zahrnuté v cenovej ponuke. Kontaktujte nás a dohodíme detaily.' },
      { category: 'delivery', q: 'Aká je záruka na vaše výrobky?', a: 'Na všetky naše výrobky poskytujeme 5-ročnú záruku. Vzťahuje sa na materiálové vady aj konštrukčné nedostatky. Na spotrebiče sa vzťahuje záruka výrobcu.' },
    ],
  },
  cz: {
    title: 'Často kladené otázky',
    subtitle: 'Najděte odpovědi na nejčastější otázky o našich službách, výrobě a montáži.',
    search_placeholder: 'Hledat otázku...',
    categories_label: 'KATEGORIE',
    no_results: 'Žádné výsledky nenalezeny.',
    categories: [
      { key: 'all', label: 'Vše' },
      { key: 'pricing', label: 'Ceny' },
      { key: 'production', label: 'Výroba' },
      { key: 'installation', label: 'Montáž' },
      { key: 'kitchens', label: 'Kuchyně' },
      { key: 'wardrobes', label: 'Skříně' },
      { key: 'doors', label: 'Dveře' },
      { key: 'custom', label: 'Nábytek na míru' },
      { key: 'delivery', label: 'Dodání' },
    ],
    items: [
      { category: 'pricing', q: 'Kolik stojí kuchyně na míru?', a: 'Cena se pohybuje od 3 000 € do 15 000 € a více v závislosti na rozměrech a materiálech. Pošlete nám půdorys a my vám bezplatně vypracujeme nabídku.' },
      { category: 'pricing', q: 'Jaký je platební systém?', a: '30% záloha při podpisu smlouvy, 50% po schválení návrhu, 20% po úspěšné montáži.' },
      { category: 'pricing', q: 'Je konzultace zdarma?', a: 'Ano. První konzultace a 3D vizualizace jsou vždy zdarma a nezávazné.' },
      { category: 'production', q: 'Jak dlouho trvá výroba?', a: 'Standardní dodací lhůta je 6–10 týdnů od schválení návrhu.' },
      { category: 'production', q: 'Jaké materiály používáte?', a: 'Pracujeme s masivním dubem, americkým ořechem, MDF lakem, sklem, kovem a epoxidovou pryskyřicí od certifikovaných dodavatelů.' },
      { category: 'installation', q: 'Zajišťujete montáž?', a: 'Ano, kompletní montáž včetně instalace spotřebičů a osvětlení. Po montáži vše uklidíme.' },
      { category: 'kitchens', q: 'Vyrábíte kuchyně do nestandardních prostor?', a: 'Ano, to je naše specialita. Podkrovní kuchyně, L-tvary, U-tvary, ostrovní kuchyně – zvládáme jakýkoliv tvar.' },
      { category: 'wardrobes', q: 'Jaké jsou možnosti interiéru skříní?', a: 'Interiér navrhujeme přesně dle vašich potřeb – police, zásuvky, trezorový výklenek, LED osvětlení.' },
      { category: 'delivery', q: 'Jaká je záruka?', a: '5letá záruka na všechny naše výrobky – materiálové vady i konstrukční nedostatky.' },
    ],
  },
  de: {
    title: 'Häufig gestellte Fragen',
    subtitle: 'Finden Sie Antworten auf die häufigsten Fragen zu unseren Leistungen, Produktion und Montage.',
    search_placeholder: 'Frage suchen...',
    categories_label: 'KATEGORIEN',
    no_results: 'Keine Ergebnisse gefunden.',
    categories: [
      { key: 'all', label: 'Alle' },
      { key: 'pricing', label: 'Preise' },
      { key: 'production', label: 'Produktion' },
      { key: 'installation', label: 'Montage' },
      { key: 'kitchens', label: 'Küchen' },
      { key: 'wardrobes', label: 'Schränke' },
      { key: 'doors', label: 'Türen' },
      { key: 'custom', label: 'Maßmöbel' },
      { key: 'delivery', label: 'Lieferung' },
    ],
    items: [
      { category: 'pricing', q: 'Was kostet eine Maßküche?', a: 'Der Preis liegt je nach Größe und Materialien zwischen 3.000 € und 15.000 € oder mehr. Schicken Sie uns einen Grundriss für ein kostenloses Angebot.' },
      { category: 'pricing', q: 'Wie ist das Zahlungssystem?', a: '30% Anzahlung bei Vertragsunterzeichnung, 50% nach Genehmigung des Entwurfs, 20% nach erfolgreicher Montage.' },
      { category: 'pricing', q: 'Ist die Beratung kostenlos?', a: 'Ja. Erstberatung und 3D-Visualisierung sind immer kostenlos und unverbindlich.' },
      { category: 'production', q: 'Wie lange dauert die Produktion?', a: 'Die Standardlieferzeit beträgt 6–10 Wochen nach Genehmigung des Entwurfs.' },
      { category: 'installation', q: 'Führen Sie auch die Montage durch?', a: 'Ja, komplette Montage inklusive Geräteinstallation. Nach der Montage wird alles sauber übergeben.' },
      { category: 'delivery', q: 'Welche Garantie bieten Sie?', a: '5 Jahre Garantie auf alle unsere Produkte – Materialfehler und Konstruktionsmängel.' },
    ],
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to the most common questions about our services, production and installation.',
    search_placeholder: 'Search questions...',
    categories_label: 'CATEGORIES',
    no_results: 'No results found.',
    categories: [
      { key: 'all', label: 'All' },
      { key: 'pricing', label: 'Pricing' },
      { key: 'production', label: 'Production' },
      { key: 'installation', label: 'Installation' },
      { key: 'kitchens', label: 'Kitchens' },
      { key: 'wardrobes', label: 'Wardrobes' },
      { key: 'doors', label: 'Doors' },
      { key: 'custom', label: 'Custom Furniture' },
      { key: 'delivery', label: 'Delivery' },
    ],
    items: [
      { category: 'pricing', q: 'How much does a custom kitchen cost?', a: 'Prices range from €3,000 to €15,000+ depending on size and materials. Send us a floor plan and we\'ll prepare a free quote.' },
      { category: 'pricing', q: 'What is the payment structure?', a: '30% deposit on contract signing, 50% after design approval and production start, 20% after successful installation.' },
      { category: 'pricing', q: 'Is the consultation free?', a: 'Yes. The first consultation and 3D visualization are always free and non-binding.' },
      { category: 'pricing', q: 'Do you make more affordable furniture?', a: 'We focus on the premium segment, but always find solutions within your budget. We can combine materials – solid oak fronts with quality board core, for example.' },
      { category: 'production', q: 'How long does production take?', a: 'Standard lead time is 6–10 weeks from design approval. Simpler pieces like tables may be ready in 3–5 weeks.' },
      { category: 'production', q: 'What materials do you use?', a: 'We work exclusively with premium materials – solid oak, American walnut, MDF lacquer, glass, metal, and epoxy resin from certified suppliers.' },
      { category: 'production', q: 'Can I visit the workshop during production?', a: 'Absolutely! You can visit our workshop at any time by appointment. We also send progress photos during production.' },
      { category: 'production', q: 'How long does your furniture last?', a: 'With proper care, solid wood furniture lasts 30–50 years. We provide a 5-year warranty and service throughout its lifetime.' },
      { category: 'installation', q: 'Do you also handle installation?', a: 'Yes, we handle complete installation including appliances, lighting strips, and hardware. After installation, we clean up and hand over in perfect condition.' },
      { category: 'installation', q: 'What needs to be ready before installation?', a: 'Before kitchen installation, rough construction work, electrical, water and gas lines must be complete. Our team will inform you exactly what must be prepared.' },
      { category: 'installation', q: 'How long does kitchen installation take?', a: 'Kitchen installation typically takes 1–2 days. For larger projects it may take 3–4 days. You\'ll receive a precise schedule in advance.' },
      { category: 'kitchens', q: 'Do you make kitchens for non-standard spaces?', a: 'Yes, that\'s our specialty. Attic kitchens, L-shapes, U-shapes, island kitchens – we handle any space configuration.' },
      { category: 'kitchens', q: 'Can I choose my own appliances?', a: 'Yes. We work with your appliances or can recommend trusted partners. Appliances can be included in the 3D design.' },
      { category: 'kitchens', q: 'What worktop materials do you offer?', a: 'We offer marble, granite, Silestone composite stone, stainless steel, and solid wood boards. We\'ll advise you on the best choice for your lifestyle.' },
      { category: 'wardrobes', q: 'What interior options are available for wardrobes?', a: 'We design the interior exactly to your needs – adjustable shelves, drawers, pull-out shirt racks, safe niche, LED lighting. Any requirement can be fulfilled.' },
      { category: 'wardrobes', q: 'Sliding or hinged doors?', a: 'We manufacture both types. Sliding doors save space, hinged doors look more substantial and luxurious. We\'ll recommend based on space and style.' },
      { category: 'doors', q: 'Do you make custom interior doors?', a: 'Yes. We manufacture interior doors in any dimensions and finishes – oak, walnut, RAL lacquer. With hidden or visible hinges, with or without glass.' },
      { category: 'custom', q: 'Can I order any non-standard piece?', a: 'Yes. Bookcases, TV walls, hallways, bar counters, desks, children\'s rooms – if you can imagine it, we can build it. Send us a photo or sketch.' },
      { category: 'delivery', q: 'Do you deliver outside Poprad?', a: 'We carry out projects throughout Slovakia, the Czech Republic, and Austria. Transport costs are included in the quote.' },
      { category: 'delivery', q: 'What warranty do you offer?', a: 'We provide a 5-year warranty on all our products covering material defects and structural issues. Appliances carry the manufacturer\'s warranty.' },
    ],
  },
};

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-body text-base font-medium group-hover:text-accent transition-colors duration-200">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed pb-5">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const { language } = useLanguage();
  const data = faqData[language] || faqData.sk;

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    let result = data.items;
    if (activeCategory !== 'all') result = result.filter(i => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search, data.items]);

  const handleToggle = (idx) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  // Reset open item when filter/search changes
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setOpenIndex(null);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">FAQ</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mt-3 leading-tight">{data.title}</h1>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">{data.subtitle}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative mt-10 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setOpenIndex(null); }}
                placeholder={data.search_placeholder}
                className="w-full pl-12 pr-5 py-3.5 bg-background border border-border rounded-full font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories + FAQ */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Sidebar categories */}
            <ScrollReveal direction="left">
              <div className="lg:sticky lg:top-28">
                <p className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">{data.categories_label}</p>
                <div className="flex flex-row flex-wrap lg:flex-col gap-2">
                  {data.categories.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => handleCategoryChange(cat.key)}
                      className={`px-4 py-2 font-body text-sm rounded-full text-left transition-all duration-200 ${
                        activeCategory === cat.key
                          ? 'bg-foreground text-background'
                          : 'bg-card hover:bg-secondary text-foreground'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ items */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <div className="bg-card rounded-2xl px-6 md:px-10 py-2">
                  {filtered.length === 0 ? (
                    <p className="font-body text-muted-foreground py-10 text-center">{data.no_results}</p>
                  ) : (
                    filtered.map((item, idx) => (
                      <FAQItem
                        key={`${activeCategory}-${idx}`}
                        item={item}
                        isOpen={openIndex === idx}
                        onToggle={() => handleToggle(idx)}
                      />
                    ))
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}