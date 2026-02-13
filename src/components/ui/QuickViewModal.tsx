'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-deep-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-charcoal hover:text-deep-black transition-colors"
              aria-label="Close quick view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-[3/4] bg-ivory">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 sm:p-8 flex flex-col">
              <p className="text-xs text-gold tracking-widest uppercase mb-1">
                {product.category}
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-charcoal/50 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>

              {/* Color selection */}
              <div className="mb-4">
                <p className="text-xs tracking-widest uppercase mb-2">
                  Color: <span className="text-gold">{selectedColor || 'Select'}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-gold scale-110'
                          : 'border-charcoal/20 hover:border-charcoal/40'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-6">
                <p className="text-xs tracking-widest uppercase mb-2">
                  Size: <span className="text-gold">{selectedSize || 'Select'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[40px] px-3 py-2 text-xs border transition-all ${
                        selectedSize === size
                          ? 'border-gold bg-gold text-white'
                          : 'border-charcoal/20 hover:border-gold'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="w-full py-3 bg-deep-black text-white text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="block text-center py-3 border border-deep-black text-xs tracking-widest uppercase hover:bg-deep-black hover:text-white transition-colors duration-300"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
