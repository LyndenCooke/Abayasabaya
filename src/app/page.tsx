'use client';

import { useState, useRef, lazy, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import products from '@/data/products.json';
import collections from '@/data/collections.json';
import testimonials from '@/data/testimonials.json';
import { Product, Testimonial, Collection } from '@/types';
import { formatPrice } from '@/lib/utils';

const MockupViewer3D = lazy(() =>
  import('@/components/ui/MockupViewer3D').then((mod) => ({ default: mod.MockupViewer3D }))
);

function HeroSection() {
  const [show3D, setShow3D] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-black">
      {/* Background image - subtle, darkened */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=1600&q=80"
          alt="Elegant woman wearing premium black abaya"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-black via-deep-black/90 to-deep-black/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-4"
            >
              New Collection 2026
            </motion.p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Where Tradition
              <br />
              Meets <span className="text-gold italic">Elegance</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              Handcrafted abayas from the finest fabrics, designed for the modern woman who honours her heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/shop"
                className="inline-block bg-gold text-white px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-300 text-center"
              >
                Explore Collection
              </Link>
              <Link
                href="/about"
                className="inline-block border border-white/40 text-white px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-300 text-center"
              >
                Our Story
              </Link>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/30 text-xs tracking-wider hidden lg:block"
            >
              Drag the 3D model to explore &bull; Upload your own design
            </motion.p>
          </motion.div>

          {/* Right: 3D Mockup Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative h-[500px] sm:h-[550px] lg:h-[600px]"
          >
            {/* Glow effect behind the 3D model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />
            </div>

            {show3D ? (
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-white/40 text-xs tracking-wider">Loading 3D viewer...</p>
                  </div>
                </div>
              }>
                <MockupViewer3D
                  defaultImage="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80"
                  showUpload={true}
                  className="w-full h-full"
                />
              </Suspense>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {/* Placeholder silhouette before 3D loads */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <div className="relative w-48 h-72 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] rounded-full" />
                    <svg viewBox="0 0 200 300" className="w-full h-full text-white/10" fill="currentColor">
                      <ellipse cx="100" cy="40" rx="25" ry="30" />
                      <path d="M70 65 Q65 100 60 140 Q55 200 40 280 L160 280 Q145 200 140 140 Q135 100 130 65 Z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setShow3D(true)}
                    className="group bg-gold/90 backdrop-blur-sm text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300 flex items-center gap-2 mx-auto"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    Launch 3D View
                  </button>
                  <p className="text-white/30 text-xs mt-3 tracking-wider">
                    Interactive 360° mockup viewer
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

function FeaturedCollections() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 sm:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            Curated With Care
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">
            Our Collections
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(collections as Collection[]).map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={`/shop?category=${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-deep-black/20 group-hover:bg-deep-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-white/70 text-xs tracking-wider">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featured = (products as Product[]).filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14"
        >
          <div>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
              Handpicked For You
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-sm tracking-wider text-charcoal/60 hover:text-gold transition-colors border-b border-charcoal/20 hover:border-gold pb-0.5"
          >
            View All
          </Link>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-ivory mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.newArrival && (
                    <span className="absolute top-3 left-3 bg-gold text-white text-xs px-2.5 py-1 tracking-wider uppercase">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-gold tracking-widest uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <span className="text-sm mt-1 block">
                  {formatPrice(product.price)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=1600&q=80"
          alt="Luxury fabric texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep-black/70" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            The Art of Abaya Making
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            Crafted With Passion,
            <br />
            Worn With Pride
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Every Abayasabaya piece is a testament to the artistry of skilled craftswomen.
            From sourcing the finest silks in Italy to hand-stitching embellishments in our Doha atelier,
            each abaya takes over 40 hours to complete.
          </p>
          <Link
            href="/about"
            className="inline-block border border-gold text-gold px-8 py-3.5 text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300"
          >
            Discover Our Craft
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);
  const items = testimonials as Testimonial[];

  return (
    <section className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            Words From Our Clients
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">
            Testimonials
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="min-h-[180px] flex items-center justify-center">
            <div>
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(items[active].rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-gold"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl leading-relaxed text-charcoal/80 italic mb-6">
                &ldquo;{items[active].text}&rdquo;
              </blockquote>
              <p className="font-medium text-sm">{items[active].name}</p>
              <p className="text-xs text-charcoal/50 mt-1">
                {items[active].location}
              </p>
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === active ? 'bg-gold w-6' : 'bg-charcoal/20 hover:bg-charcoal/40'
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const images = [
    'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400&q=80',
    'https://images.unsplash.com/photo-1581338834647-b0fb40996d21?w=400&q=80',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=400&q=80',
    'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=400&q=80',
    'https://images.unsplash.com/photo-1581338834647-b0fb40996d21?w=400&q=80',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=400&q=80',
  ];

  return (
    <section className="py-20 sm:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            @abayasabaya
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">
            Follow Our Journey
          </h2>
        </motion.div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2">
        {images.map((src, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative aspect-square group overflow-hidden"
          >
            <Image
              src={src}
              alt={`Instagram post ${i + 1}`}
              fill
              sizes="(max-width: 640px) 33vw, 16vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-deep-black/0 group-hover:bg-deep-black/40 transition-colors duration-300 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <CraftsmanshipBanner />
      <TestimonialsSection />
      <InstagramSection />
    </>
  );
}
