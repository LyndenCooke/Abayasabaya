export interface Product {
  id: number;
  slug: string;
  name: string;
  nameAr?: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  sizes: string[];
  colors: ProductColor[];
  fabric: string;
  careInstructions: string[];
  images: string[];
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}

export interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface FilterState {
  category: string;
  size: string;
  color: string;
  priceRange: [number, number];
  fabric: string;
  sortBy: string;
}
