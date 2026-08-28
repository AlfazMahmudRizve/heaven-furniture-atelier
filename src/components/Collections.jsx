import React, { useState } from 'react';
import { COLLECTIONS } from '../data/collections';
import { buildProductWhatsAppUrl } from '../utils/whatsapp';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const Collections = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const tabs = ['All', 'Living Room', 'Master Bedroom', 'Royal Dining', 'Executive & Study'];

  // Helper to extract products based on filter
  const getProducts = () => {
    if (activeFilter === 'All') {
      // Show first product from each collection (up to 4)
      if (Array.isArray(COLLECTIONS)) {
        return COLLECTIONS.map(c => (c.products && c.products[0]) || c).filter(Boolean).slice(0, 4);
      }
      if (typeof COLLECTIONS === 'object') {
        return Object.values(COLLECTIONS).map(c => (c.products && c.products[0]) || c[0]).filter(Boolean).slice(0, 4);
      }
      return [];
    }

    // Otherwise show products for selected collection
    if (Array.isArray(COLLECTIONS)) {
      const collection = COLLECTIONS.find(
        c => c.name === activeFilter || c.title === activeFilter || c.id === activeFilter || c.category === activeFilter
      );
      return collection?.products ? collection.products.slice(0, 4) : [];
    }
    
    if (typeof COLLECTIONS === 'object') {
      const key = Object.keys(COLLECTIONS).find(k => 
        k.toLowerCase() === activeFilter.toLowerCase() || 
        COLLECTIONS[k]?.name === activeFilter
      );
      if (key) {
        return COLLECTIONS[key].products ? COLLECTIONS[key].products.slice(0, 4) : (Array.isArray(COLLECTIONS[key]) ? COLLECTIONS[key].slice(0, 4) : []);
      }
    }
    
    return [];
  };

  const displayedProducts = getProducts();

  return (
    <section id="collections" className="bg-obsidian py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-gold mb-4 uppercase">
            Curated Collections
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-12">
            Explore Our Signature Pieces
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2 text-sm font-medium transition-all rounded-full ${
                  activeFilter === tab
                    ? 'text-obsidian bg-gold'
                    : 'text-ivory-muted hover:text-ivory border border-gold/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => {
              // Extract data carefully depending on data structure
              const id = product.id || index;
              const name = product.name || product.title || 'Luxury Piece';
              const material = product.material || 'Premium Material';
              const image = product.image || product.img || product.imageUrl || '';
              
              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-surface"
                >
                  <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                    <h3 className="font-display text-lg text-ivory mb-1">
                      {name}
                    </h3>
                    <p className="text-xs text-ivory-muted mb-4">
                      {material}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <a
                        href="#bespoke"
                        className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-ivory bg-white/10 hover:bg-white/20 backdrop-blur-md rounded transition-colors"
                      >
                        Customize
                      </a>
                      <a
                        href={buildProductWhatsAppUrl(name, material)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium text-obsidian bg-gold hover:bg-gold-hover transition-colors rounded"
                      >
                        Inquire <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center">
          <a
            href="#showroom"
            className="group flex items-center gap-2 text-gold hover:text-gold-hover transition-colors font-medium"
          >
            Visit Our Showroom to See the Full Collection
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collections;
