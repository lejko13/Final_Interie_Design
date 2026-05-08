import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-20">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <span className="font-body text-xs font-semibold tracking-widest text-muted-foreground uppercase">{t('contact.label')}</span>
            <h1 className="font-body text-4xl md:text-5xl lg:text-6xl font-bold mt-3 leading-tight">{t('contact.title')}</h1>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-xl leading-relaxed">{t('contact.subtitle')}</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-16">
            {/* Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-body text-sm font-medium mb-2 block">{t('contact.name')}</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-5 py-3.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="font-body text-sm font-medium mb-2 block">{t('contact.email')}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium mb-2 block">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-5 py-3.5 bg-card border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-2 block">{t('contact.message')}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-5 py-3.5 bg-card border border-border rounded-xl font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/30 transition-shadow"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-body text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                >
                  {sent ? (
                    <><CheckCircle className="w-4 h-4" /> Sent!</>
                  ) : (
                    <><Send className="w-4 h-4" /> {t('contact.send')}</>
                  )}
                </button>
              </form>
            </ScrollReveal>

            {/* Info + Map */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('contact.phone')}</span>
                      <p className="font-body text-sm font-medium mt-1">+421 900 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('contact.email')}</span>
                      <p className="font-body text-sm font-medium mt-1">info@danielkubin.sk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('contact.address')}</span>
                      <p className="font-body text-sm font-medium mt-1">Kvetná 15, 058 01 Poprad</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-body text-xs text-muted-foreground">{t('contact.office_hours')}</span>
                      <p className="font-body text-sm font-medium mt-1">{t('contact.mon_fri')}: 8:00 – 17:00</p>
                      <p className="font-body text-sm text-muted-foreground">{t('contact.sat')}: {t('contact.closed')}</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps iframe */}
                <div className="rounded-2xl overflow-hidden border border-border" style={{ height: '280px' }}>
                  <iframe
                    title="Daniel Kubin Stolárstvo - Poprad"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.5!2d20.2959!3d49.0597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473da02b4b3ee0e5%3A0xf3f2e6fae58a7a12!2sPoprad%2C%20Slovakia!5e0!3m2!1sen!2sse!4v1699000000000!5m2!1sen!2sse"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}