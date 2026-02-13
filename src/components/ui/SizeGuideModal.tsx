'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: 'XS', bust: '82-86', waist: '62-66', hip: '88-92', length: '140' },
  { size: 'S', bust: '86-90', waist: '66-70', hip: '92-96', length: '142' },
  { size: 'M', bust: '90-94', waist: '70-74', hip: '96-100', length: '144' },
  { size: 'L', bust: '94-98', waist: '74-78', hip: '100-104', length: '146' },
  { size: 'XL', bust: '98-102', waist: '78-82', hip: '104-108', length: '148' },
  { size: 'XXL', bust: '102-106', waist: '82-86', hip: '108-112', length: '150' },
];

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative bg-white max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-charcoal hover:text-deep-black"
              aria-label="Close size guide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h2 className="font-[family-name:var(--font-playfair)] text-2xl mb-2">
              Size Guide
            </h2>
            <p className="text-sm text-charcoal/60 mb-6">
              All measurements are in centimetres. For the best fit, we recommend measuring yourself and comparing to the chart below.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-gold/30">
                    <th className="text-left py-3 pr-4 text-xs tracking-widest uppercase text-gold">Size</th>
                    <th className="text-left py-3 pr-4 text-xs tracking-widest uppercase">Bust</th>
                    <th className="text-left py-3 pr-4 text-xs tracking-widest uppercase">Waist</th>
                    <th className="text-left py-3 pr-4 text-xs tracking-widest uppercase">Hip</th>
                    <th className="text-left py-3 text-xs tracking-widest uppercase">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.size} className="border-b border-charcoal/10">
                      <td className="py-3 pr-4 font-medium">{row.size}</td>
                      <td className="py-3 pr-4 text-charcoal/70">{row.bust}</td>
                      <td className="py-3 pr-4 text-charcoal/70">{row.waist}</td>
                      <td className="py-3 pr-4 text-charcoal/70">{row.hip}</td>
                      <td className="py-3 text-charcoal/70">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-ivory text-sm text-charcoal/70">
              <p className="font-medium text-deep-black mb-1">Need help?</p>
              <p>Contact us on WhatsApp for personalized sizing advice. Our team is happy to assist you in finding your perfect fit.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
