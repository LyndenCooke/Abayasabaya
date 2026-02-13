'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import allProducts from '@/data/products.json';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';
import { SizeGuideModal } from '@/components/ui/SizeGuideModal';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const products = allProducts as Product[];
  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-gold hover:text-gold-dark transition-colors">Return to Shop</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <div className="pt-24 sm:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="text-xs text-charcoal/50">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-deep-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div
              className={`relative aspect-[3/4] bg-ivory mb-4 overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              />
              {product.newArrival && (
                <span className="absolute top-4 left-4 bg-gold text-white text-xs px-3 py-1.5 tracking-wider uppercase">New Arrival</span>
              )}
              {product.originalPrice && (
                <span className="absolute top-4 right-4 bg-rose-gold text-white text-xs px-3 py-1.5 tracking-wider uppercase">Sale</span>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedImage(i); setIsZoomed(false); }}
                  className={`relative w-20 h-24 sm:w-24 sm:h-28 border-2 transition-colors overflow-hidden ${
                    selectedImage === i ? 'border-gold' : 'border-transparent hover:border-charcoal/20'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:pt-4">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">{product.category}</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl lg:text-4xl mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-charcoal/50 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-charcoal/70 leading-relaxed mb-8">{product.description}</p>

            <div className="mb-6 pb-6 border-b border-charcoal/10">
              <p className="text-xs tracking-widest uppercase mb-1 text-charcoal/50">Fabric</p>
              <p className="text-sm">{product.fabric}</p>
            </div>

            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase mb-3">
                Colour: <span className="text-gold">{selectedColor || 'Select a colour'}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-gold scale-110 shadow-md' : 'border-charcoal/20 hover:border-charcoal/40'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-widest uppercase">
                  Size: <span className="text-gold">{selectedSize || 'Select a size'}</span>
                </p>
                <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs text-charcoal/50 hover:text-gold transition-colors underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] px-4 py-2.5 text-sm border transition-all ${
                      selectedSize === size ? 'border-gold bg-gold text-white' : 'border-charcoal/20 hover:border-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase mb-3">Quantity</p>
              <div className="flex items-center border border-charcoal/20 w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-ivory transition-colors" aria-label="Decrease quantity">
                  &minus;
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-ivory transition-colors" aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className={`w-full py-4 text-sm tracking-widest uppercase transition-all duration-300 ${
                  addedToCart ? 'bg-green-700 text-white' : 'bg-deep-black text-white hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              {(!selectedSize || !selectedColor) && (
                <p className="text-xs text-charcoal/50 text-center">Please select a colour and size</p>
              )}
            </div>

            <details className="group border-t border-charcoal/10 pt-4">
              <summary className="flex items-center justify-between cursor-pointer py-2 text-xs tracking-widest uppercase">
                Care Instructions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform group-open:rotate-180">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <ul className="py-3 space-y-2">
                {product.careInstructions.map((instruction, i) => (
                  <li key={i} className="text-sm text-charcoal/70 flex items-start gap-2">
                    <span className="text-gold mt-0.5">&#8226;</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </details>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 sm:mt-28 pt-12 border-t border-charcoal/10">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-center mb-10">You May Also Love</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ivory mb-3">
                    <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="text-xs text-gold tracking-widest uppercase mb-1">{p.category}</p>
                  <h3 className="font-[family-name:var(--font-playfair)] text-sm sm:text-base group-hover:text-gold transition-colors">{p.name}</h3>
                  <span className="text-sm mt-1 block">{formatPrice(p.price)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </>
  );
}
