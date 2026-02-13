'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-700 ${
              isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 absolute inset-0 ${
                isHovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && (
              <span className="bg-gold text-white text-xs px-2.5 py-1 tracking-wider uppercase">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-rose-gold text-white text-xs px-2.5 py-1 tracking-wider uppercase">
                Sale
              </span>
            )}
          </div>

          {/* Quick view */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView?.(product);
              }}
              className="w-full bg-white/95 backdrop-blur-sm text-deep-black py-2.5 text-xs tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300"
            >
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-xs text-gold tracking-widest uppercase">
            {product.category}
          </p>
          <h3 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal/50 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {/* Color swatches */}
          <div className="flex gap-1.5 pt-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-charcoal/20"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
