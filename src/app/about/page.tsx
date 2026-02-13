'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const values = [
  { title: 'Heritage', description: 'Rooted in the rich traditions of Arabian craftsmanship, every design pays homage to centuries of artistic excellence.' },
  { title: 'Quality', description: 'We source only the finest fabrics from Italy, Japan, and across the globe — accepting nothing less than exceptional.' },
  { title: 'Modesty', description: 'True elegance lies in grace and modesty. Our designs empower women to express their style while honouring their values.' },
  { title: 'Sustainability', description: 'From ethical sourcing to minimal waste production, we are committed to responsible fashion that respects our world.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-20 sm:pt-24">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=1600&q=80" alt="Elegant fabric draped artfully" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-deep-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-center text-white">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl">About Abayasabaya</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Section>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80" alt="Founder of Abayasabaya in her atelier" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Section>
            <Section>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">The Beginning</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl mb-6 leading-tight">
                Born From a Love of<br />Craft and Culture
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>Abayasabaya was born in 2018 from the vision of Sheikha Al-Mansouri, a Qatari designer who sought to bridge the gap between traditional modest wear and contemporary luxury fashion. Growing up surrounded by the elegant abayas of her grandmother and the modern fashion of global runways, she saw an opportunity to create something truly unique.</p>
                <p>What began as a small atelier in Doha&apos;s Souq Waqif has grown into one of the GCC&apos;s most sought-after abaya brands. Each piece is still crafted by hand in our expanded Doha workshop, where a team of 20 skilled artisans bring our designs to life.</p>
                <p>Today, Abayasabaya serves discerning women across Qatar, the UAE, Saudi Arabia, Kuwait, Bahrain, Oman, and beyond. Our pieces have been worn at royal gatherings, international fashion weeks, and everyday moments of quiet elegance.</p>
              </div>
            </Section>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-deep-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center max-w-3xl mx-auto">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Mission</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl mb-6 leading-tight">To Redefine Modest Fashion for the Modern World</h2>
            <p className="text-white/60 leading-relaxed text-lg">We believe that modesty and high fashion are not opposing forces — they are complementary. Our mission is to create abayas that make every woman feel confident, beautiful, and true to her identity. We honour tradition while embracing innovation, sourcing the world&apos;s finest materials to craft garments that stand the test of time.</p>
          </Section>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">The Process</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">Craftsmanship at Every Stitch</h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: '01', title: 'Sourcing', description: 'We travel the world to find exceptional fabrics. From Italian silk mills to Japanese crepe weavers, each material is hand-selected for its drape, lustre, and longevity.', image: 'https://images.unsplash.com/photo-1581338834647-b0fb40996d21?w=600&q=80' },
              { step: '02', title: 'Design', description: 'Every collection begins with sketches inspired by Arabian architecture, nature, and the women who wear our pieces. Each design balances beauty with wearability.', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=600&q=80' },
              { step: '03', title: 'Creation', description: 'Our skilled artisans bring each design to life with meticulous hand-stitching, beading, and embroidery. Each abaya takes 40 to 120 hours to complete.', image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=600&q=80' },
            ].map((item) => (
              <Section key={item.step}>
                <div className="relative aspect-[4/3] overflow-hidden bg-ivory mb-6">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <span className="text-gold font-[family-name:var(--font-playfair)] text-2xl">{item.step}</span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl mt-2 mb-3">{item.title}</h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">{item.description}</p>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">What We Stand For</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">Our Values</h2>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <Section key={value.title}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 border border-gold/30 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-playfair)] text-gold text-lg">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-lg mb-3">{value.title}</h3>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{value.description}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Section className="order-2 lg:order-1">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">The Founder</p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl mb-6 leading-tight">Sheikha Al-Mansouri</h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed">
                <p>A graduate of the London College of Fashion and a lifelong admirer of her grandmother&apos;s embroidery, Sheikha Al-Mansouri founded Abayasabaya with a clear vision: to create abayas that a modern woman would choose to wear, not feel obligated to.</p>
                <p>Her designs have been featured in Vogue Arabia, Harper&apos;s Bazaar, and on the stages of Arab Fashion Week. In 2023, she was recognised by the Qatar Foundation as one of the country&apos;s leading creative entrepreneurs.</p>
              </div>
            </Section>
            <Section className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1581338834647-b0fb40996d21?w=800&q=80" alt="Sheikha Al-Mansouri, founder of Abayasabaya" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </Section>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl mb-6">Experience the Difference</h2>
            <p className="text-charcoal/60 max-w-lg mx-auto mb-8">Discover our latest collection and find the piece that speaks to you.</p>
            <Link href="/shop" className="inline-block bg-deep-black text-white px-10 py-4 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300">
              Shop Now
            </Link>
          </Section>
        </div>
      </section>
    </>
  );
}
