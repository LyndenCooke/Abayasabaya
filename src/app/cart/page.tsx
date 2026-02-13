'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const shipping = totalPrice > 500 ? 0 : 35;
  const discount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - discount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
    }
  };

  if (items.length === 0 && checkoutStep === 0) {
    return (
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 mx-auto mb-6 border-2 border-charcoal/10 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-charcoal/30">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl mb-4">Your Cart is Empty</h1>
            <p className="text-charcoal/50 mb-8 max-w-md mx-auto">Discover our exquisite collection of handcrafted abayas and find your perfect piece.</p>
            <Link href="/shop" className="inline-block bg-deep-black text-white px-10 py-3.5 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300">Continue Shopping</Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="pt-28 pb-8 sm:pt-32 sm:pb-12 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl">
              {checkoutStep === 0 ? 'Shopping Cart' : checkoutStep === 1 ? 'Shipping' : 'Payment'}
            </h1>
          </motion.div>
          <div className="flex items-center justify-center gap-3 mt-8">
            {['Cart', 'Shipping', 'Payment'].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 ${i <= checkoutStep ? 'text-gold' : 'text-charcoal/30'}`}>
                  <span className={`w-7 h-7 rounded-full text-xs flex items-center justify-center border ${i <= checkoutStep ? 'border-gold bg-gold text-white' : 'border-charcoal/20'}`}>
                    {i < checkoutStep ? '\u2713' : i + 1}
                  </span>
                  <span className="text-xs tracking-wider uppercase hidden sm:inline">{step}</span>
                </div>
                {i < 2 && <div className={`w-12 sm:w-20 h-px ${i < checkoutStep ? 'bg-gold' : 'bg-charcoal/15'}`} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {checkoutStep === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-charcoal/60">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
                <button onClick={clearCart} className="text-xs text-charcoal/40 hover:text-rose-gold transition-colors tracking-wider uppercase">Clear All</button>
              </div>
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div key={`${item.product.id}-${item.size}-${item.color}`} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} className="flex gap-4 sm:gap-6 py-6 border-b border-charcoal/10">
                    <Link href={`/product/${item.product.slug}`} className="relative w-24 h-32 sm:w-28 sm:h-36 shrink-0 bg-ivory overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="112px" className="object-cover" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <Link href={`/product/${item.product.slug}`} className="font-[family-name:var(--font-playfair)] text-base sm:text-lg hover:text-gold transition-colors block truncate">{item.product.name}</Link>
                        <p className="text-xs text-charcoal/50 mt-1">{item.color} &middot; Size {item.size}</p>
                      </div>
                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-charcoal/15">
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-ivory transition-colors" aria-label="Decrease quantity">&minus;</button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-ivory transition-colors" aria-label="Increase quantity">+</button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                          <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-charcoal/30 hover:text-rose-gold transition-colors" aria-label={`Remove ${item.product.name}`}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="mt-6">
                <Link href="/shop" className="text-sm text-charcoal/50 hover:text-gold transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-ivory p-6 sm:p-8 sticky top-24">
                <h2 className="font-[family-name:var(--font-playfair)] text-lg mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm border-b border-charcoal/10 pb-4 mb-4">
                  <div className="flex justify-between"><span className="text-charcoal/60">Subtotal</span><span>{formatPrice(totalPrice)}</span></div>
                  {promoApplied && <div className="flex justify-between text-green-700"><span>Discount (10%)</span><span>-{formatPrice(discount)}</span></div>}
                  <div className="flex justify-between"><span className="text-charcoal/60">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                  {shipping === 0 && <p className="text-xs text-gold">Free shipping on orders over QAR 500</p>}
                </div>
                <div className="flex justify-between font-medium text-base mb-6"><span>Total</span><span>{formatPrice(finalTotal)}</span></div>
                {!promoApplied && (
                  <div className="mb-6">
                    <label htmlFor="promo" className="sr-only">Promo code</label>
                    <div className="flex">
                      <input id="promo" type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Promo code" className="flex-1 border border-charcoal/20 border-r-0 px-3 py-2.5 text-sm bg-transparent outline-none focus:border-gold" />
                      <button onClick={handleApplyPromo} className="px-4 py-2.5 bg-deep-black text-white text-xs tracking-wider uppercase hover:bg-gold transition-colors">Apply</button>
                    </div>
                    <p className="text-xs text-charcoal/40 mt-1.5">Try WELCOME10 for 10% off</p>
                  </div>
                )}
                <button onClick={() => setCheckoutStep(1)} className="w-full bg-deep-black text-white py-3.5 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300">Proceed to Checkout</button>
                <div className="mt-4 flex items-center justify-center gap-3 text-charcoal/30">
                  {['Visa', 'MC', 'Apple Pay', 'Mada'].map((m) => (<span key={m} className="text-xs border border-charcoal/10 px-1.5 py-0.5">{m}</span>))}
                </div>
              </div>
            </div>
          </div>
        )}

        {checkoutStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl mx-auto">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-6">Shipping Information</h2>
            <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep(2); }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div><label htmlFor="ship-first" className="block text-xs tracking-widest uppercase mb-2">First Name</label><input id="ship-first" type="text" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
                <div><label htmlFor="ship-last" className="block text-xs tracking-widest uppercase mb-2">Last Name</label><input id="ship-last" type="text" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
              </div>
              <div><label htmlFor="ship-address" className="block text-xs tracking-widest uppercase mb-2">Address</label><input id="ship-address" type="text" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" placeholder="Street address" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div><label htmlFor="ship-city" className="block text-xs tracking-widest uppercase mb-2">City</label><input id="ship-city" type="text" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
                <div><label htmlFor="ship-country" className="block text-xs tracking-widest uppercase mb-2">Country</label>
                  <select id="ship-country" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none">
                    <option value="QA">Qatar</option><option value="AE">UAE</option><option value="SA">Saudi Arabia</option><option value="KW">Kuwait</option><option value="BH">Bahrain</option><option value="OM">Oman</option><option value="other">Other</option>
                  </select>
                </div>
                <div><label htmlFor="ship-zip" className="block text-xs tracking-widest uppercase mb-2">Postal Code</label><input id="ship-zip" type="text" className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
              </div>
              <div><label htmlFor="ship-phone" className="block text-xs tracking-widest uppercase mb-2">Phone Number</label><input id="ship-phone" type="tel" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" placeholder="+974 XXXX XXXX" /></div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setCheckoutStep(0)} className="px-6 py-3 border border-charcoal/20 text-sm tracking-widest uppercase hover:border-gold transition-colors">Back</button>
                <button type="submit" className="flex-1 bg-deep-black text-white py-3 text-sm tracking-widest uppercase hover:bg-gold transition-colors duration-300">Continue to Payment</button>
              </div>
            </form>
          </motion.div>
        )}

        {checkoutStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl mx-auto">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl mb-6">Payment Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('This is a demo. In production, this would process your payment securely.'); }} className="space-y-5">
              <div><label htmlFor="card-name" className="block text-xs tracking-widest uppercase mb-2">Name on Card</label><input id="card-name" type="text" required className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
              <div><label htmlFor="card-number" className="block text-xs tracking-widest uppercase mb-2">Card Number</label><input id="card-number" type="text" required placeholder="XXXX XXXX XXXX XXXX" className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
              <div className="grid grid-cols-2 gap-5">
                <div><label htmlFor="card-expiry" className="block text-xs tracking-widest uppercase mb-2">Expiry Date</label><input id="card-expiry" type="text" required placeholder="MM/YY" className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
                <div><label htmlFor="card-cvv" className="block text-xs tracking-widest uppercase mb-2">CVV</label><input id="card-cvv" type="text" required placeholder="XXX" className="w-full border border-charcoal/20 px-4 py-3 bg-transparent text-sm focus:border-gold outline-none" /></div>
              </div>
              <div className="bg-ivory p-4 mt-6">
                <div className="flex justify-between text-sm mb-2"><span className="text-charcoal/60">Order Total</span><span className="font-medium">{formatPrice(finalTotal)}</span></div>
                <p className="text-xs text-charcoal/40">Your payment is secured with 256-bit SSL encryption.</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setCheckoutStep(1)} className="px-6 py-3 border border-charcoal/20 text-sm tracking-widest uppercase hover:border-gold transition-colors">Back</button>
                <button type="submit" className="flex-1 bg-gold text-white py-3 text-sm tracking-widest uppercase hover:bg-gold-dark transition-colors duration-300">Place Order — {formatPrice(finalTotal)}</button>
              </div>
            </form>
          </motion.div>
        )}
      </section>
    </>
  );
}
