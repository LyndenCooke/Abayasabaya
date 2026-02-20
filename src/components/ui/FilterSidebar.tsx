'use client';

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

interface FilterSidebarProps {
    mobile?: boolean;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedSize: string;
    setSelectedSize: (value: string) => void;
    selectedFabric: string;
    setSelectedFabric: (value: string) => void;
    selectedPriceRange: number;
    setSelectedPriceRange: (value: number) => void;
    hasActiveFilters: boolean;
    clearFilters: () => void;
}

export function FilterSidebar({
    mobile = false,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    selectedFabric,
    setSelectedFabric,
    selectedPriceRange,
    setSelectedPriceRange,
    hasActiveFilters,
    clearFilters,
}: FilterSidebarProps) {
    return (
        <div className={mobile ? '' : 'sticky top-24'}>
            <div className="mb-8">
                <h3 className="text-xs tracking-widest uppercase font-medium mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`block text-sm transition-colors ${selectedCategory === cat ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
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
                            className={`min-w-[36px] px-2 py-1.5 text-xs border transition-all ${selectedSize === size ? 'border-gold bg-gold text-white' : 'border-charcoal/20 hover:border-gold'
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
                            className={`block text-sm transition-colors ${selectedPriceRange === i ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
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
                            className={`block text-sm transition-colors ${selectedFabric === fabric ? 'text-gold font-medium' : 'text-charcoal/60 hover:text-deep-black'
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
}

export { categories, priceRanges };
