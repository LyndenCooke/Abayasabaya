'use client';

import Link from 'next/link';
import { useState } from 'react';

const quickLinks = [
  { href: '/shop', label: 'Shop All' },
  { href: '/shop?category=evening', label: 'Evening Collection' },
  { href: '/shop?category=casual', label: 'Everyday Luxe' },
  { href: '/shop?category=bridal', label: 'Bridal' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact Us' },
];

const customerCare = [
  { href: '/shop', label: 'Size Guide' },
  { href: '/contact', label: 'Shipping & Returns' },
  { href: '/contact', label: 'FAQs' },
  { href: '/contact', label: 'Care Instructions' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-deep-black text-white/80" role="contentinfo">
      {/* Newsletter banner */}
      <div className="bg-gold/10 border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-deep-black mb-3">
              Join Our World
            </h3>
            <p className="text-charcoal/70 mb-6 text-sm sm:text-base">
              Be the first to discover new collections, exclusive offers, and styling inspiration.
            </p>
            {subscribed ? (
              <p className="text-gold font-medium">
                Welcome to the Abayasabaya family.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-gold/30 text-deep-black placeholder:text-charcoal/40 focus:border-gold outline-none text-sm"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-deep-black text-white text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-xl tracking-wider"
            >
              <span className="text-white">ABAYA</span>
              <span className="text-gold">SABAYA</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Crafting premium abayas from the heart of Qatar. Where tradition
              meets contemporary elegance.
            </p>
            {/* Social icons */}
            <div className="flex space-x-4 mt-6">
              {['Instagram', 'Facebook', 'TikTok', 'Pinterest'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-sm tracking-widest uppercase text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-sm tracking-widest uppercase text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-sm tracking-widest uppercase text-white mb-4">
              Visit Us
            </h4>
            <div className="space-y-2.5 text-sm text-white/60">
              <p>The Pearl-Qatar, Doha</p>
              <p>Porto Arabia, Tower 15</p>
              <p className="pt-2">
                <a href="tel:+97444001234" className="hover:text-gold transition-colors">
                  +974 4400 1234
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@abayasabaya.qa"
                  className="hover:text-gold transition-colors"
                >
                  hello@abayasabaya.qa
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Abayasabaya. All rights reserved.
            </p>
            {/* Payment badges */}
            <div className="flex items-center space-x-4">
              {['Visa', 'Mastercard', 'Apple Pay', 'Mada'].map((method) => (
                <span
                  key={method}
                  className="text-xs text-white/30 border border-white/10 px-2 py-1"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
