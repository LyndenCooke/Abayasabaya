'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Get In Touch</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl">Contact Us</h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Section>
            {submitted ? (
              <div className="bg-ivory p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-gold rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-3">Message Sent</h2>
                <p className="text-charcoal/60 text-sm">Thank you for reaching out. Our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-widest uppercase mb-2">Full Name</label>
                    <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-widest uppercase mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none transition-colors" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs tracking-widest uppercase mb-2">Phone (Optional)</label>
                    <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none transition-colors" placeholder="+974 XXXX XXXX" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs tracking-widest uppercase mb-2">Subject</label>
                    <select id="subject" name="subject" value={formState.subject} onChange={handleChange} required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none transition-colors">
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="custom">Custom Design</option>
                      <option value="sizing">Sizing Help</option>
                      <option value="returns">Returns &amp; Exchanges</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase mb-2">Message</label>
                  <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={5} className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none transition-colors resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full sm:w-auto bg-deep-black text-white px-10 py-3.5 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300">
                  Send Message
                </button>
              </form>
            )}
          </Section>

          <Section>
            <div className="space-y-10">
              <div>
                <a href="https://wa.me/97444001234" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-green-600/30 bg-green-50/50 hover:bg-green-50 transition-colors group">
                  <div className="w-12 h-12 bg-green-600 text-white flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-0.5">Chat on WhatsApp</p>
                    <p className="text-xs text-charcoal/50">Quick replies during business hours</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-auto text-charcoal/30 group-hover:text-gold transition-colors">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-2">Visit Our Boutique</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">The Pearl-Qatar, Porto Arabia<br />Tower 15, Ground Floor<br />Doha, Qatar</p>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-2">Business Hours</h3>
                  <div className="text-sm text-charcoal/70 space-y-1">
                    <p>Saturday — Thursday: 10:00 AM — 10:00 PM</p>
                    <p>Friday: 2:00 PM — 10:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-2">Get in Touch</h3>
                  <div className="text-sm text-charcoal/70 space-y-1">
                    <p>Phone: <a href="tel:+97444001234" className="hover:text-gold transition-colors">+974 4400 1234</a></p>
                    <p>Email: <a href="mailto:hello@abayasabaya.qa" className="hover:text-gold transition-colors">hello@abayasabaya.qa</a></p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[{ name: 'Instagram', label: 'IG' }, { name: 'Facebook', label: 'FB' }, { name: 'TikTok', label: 'TK' }, { name: 'Pinterest', label: 'PI' }].map((s) => (
                      <a key={s.name} href="#" className="w-10 h-10 border border-charcoal/20 flex items-center justify-center text-xs text-charcoal/50 hover:border-gold hover:text-gold transition-colors" aria-label={s.name}>{s.label}</a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-ivory h-64 flex items-center justify-center border border-charcoal/10">
                <div className="text-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-charcoal/30 mb-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-xs text-charcoal/40 tracking-wider uppercase">Map Integration</p>
                  <p className="text-xs text-charcoal/30 mt-1">The Pearl-Qatar, Doha</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>
    </>
  );
}
