'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import allProducts from '@/data/products.json';
import { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import { QuickViewModal } from '@/components/ui/QuickViewModal';

const categories = ['All', 'Casual', 'Evening', 'Bridal', 'Haute Couture'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const fabrics = ['All', 'Silk', 'Crepe', 'Linen', 'Chiffon', 'Jersey', 'Velvet', 'Cotton'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under QAR 800', min: 0, max: 800 },
  { label: 'QAR 800 - 1,200', min: 800, max: 1200 },
  { label: 'QAR 1,200 - 1,800', min: 1200, max: 1800 },
  { label: 'Over QAR 1,800', min: 1800, max: Infinity },
];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(
    categoryParam
      ? categories.find(
          (c) => c.toLowerCase().replace(/ /g, '-') === categoryParam
        ) || 'All'
      : 'All'
  );
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const products = allProducts as Product[];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (selectedSize) {
      filtered = filtered.filter((p) => p.sizes.includes(selectedSize));
    }
    if (selectedFabric !== 'All') {
      filtered = filtered.filter((p) =>
        p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())
      );
    }
    const range = priceRanges[selectedPriceRange];
    filtered = filtered.filter(
      (p) => p.price >= range.min && p.price <= range.max
    );

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategory, selectedSize, selectedFabric, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('');
    setSelectedFabric('All');
    setSelectedPriceRange(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSize !== '' ||
    selectedFabric !== 'All' ||
    selectedPriceRange !== 0;

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? '' : 'sticky top-24'}>
      <div className="mb-8">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block text-sm transition-colors ${
                selectedCategory === cat ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
              className={`min-w-[36px] px-2 py-1.5 text-xs border transition-all ${
                selectedSize === size ? 'border-gold bg-gold text-white' : 'border-charcoal/20 hover:border-gold'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPriceRange(i)}
              className={`block text-sm transition-colors ${
                selectedPriceRange === i ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Fabric Type</h3>
        <div className="space-y-2">
          {fabrics.map((fabric) => (
            <button
              key={fabric}
              onClick={() => setSelectedFabric(fabric)}
              className={`block text-sm transition-colors ${
                selectedFabric === fabric ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
              }`}
            >
              {fabric}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-xs tracking-widest uppercase text-rose-gold hover:text-deep-black transition-colors">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-charcoal/60">
            {filteredProducts.length} piece{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden text-xs tracking-widest uppercase flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="10" y2="18" />
              </svg>
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-transparent border border-charcoal/20 px-3 py-2 outline-none focus:border-gold"
              aria-label="Sort products"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-12">
          <aside className="hidden lg:block w-56 shrink-0" aria-label="Product filters">
            <FilterSidebar />
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-charcoal/50 mb-4">No pieces match your current filters.</p>
                <button onClick={clearFilters} className="text-gold text-sm tracking-wider hover:text-gold-dark transition-colors">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-deep-black/50" onClick={() => setIsMobileFilterOpen(false)} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-cream shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-[family-name:var(--font-playfair)] text-lg">Filters</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Close filters">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar mobile />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">Our Collection</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl">Shop Abayas</h1>
          </motion.div>
        </div>
      </section>
      <Suspense fallback={<div className="py-20 text-center text-charcoal/40">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </>
  );
}
