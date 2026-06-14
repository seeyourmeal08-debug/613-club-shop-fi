/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  toggleWishlist: (productSlug: string) => void;
  wishlist: string[];
  onSelectProduct: (product: Product) => void;
}

export default function ShopView({
  products,
  toggleWishlist,
  wishlist,
  onSelectProduct,
}: ShopViewProps) {
  
  // Grab the T-Shirt and Hoodie properly from the database list
  const tshirt = products.find(p => p.id === 'prod-tshirt') || products[1];
  const hoodie = products.find(p => p.id === 'prod-hoodie') || products[0];

  return (
    <div className="bg-[#fcfbfa] text-neutral-900 font-sans antialiased min-h-screen py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mt-6">
        
        {/* Main Title Area exactly styled like the user mockup */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-200 pb-5 mb-14">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 uppercase">
              SEASON 01 / DROP 01
            </span>
            <h1 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-[#570013] uppercase leading-none mt-2">
              COLLECTION 01
            </h1>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-neutral-500 hover:text-neutral-900 uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
              FILTER BY: ALL ITEMS
              <ChevronDown className="w-3.5 h-3.5 stroke-[2] text-neutral-400" />
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Product Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          
          {/* LEFT ITEM: T-SHIRT (Cream) */}
          {tshirt && (
            <div className="flex flex-col group">
              {/* Product Card Container */}
              <div 
                onClick={() => onSelectProduct(tshirt)}
                className="aspect-[3/4] w-full bg-[#f4f2f0]/65 border border-neutral-100 flex items-center justify-center relative overflow-hidden transition-all cursor-pointer"
              >
                {/* Image under pristine Zoom animation */}
                <img 
                  alt={tshirt.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                  src={tshirt.image}
                  referrerPolicy="no-referrer"
                />

                {/* Absolute Heart Bookmark button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(tshirt.slug);
                  }}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/75 hover:bg-white text-neutral-800 flex items-center justify-center shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(tshirt.slug) ? 'fill-[#570013] text-[#570013]' : 'text-neutral-500 hover:text-red-500'}`} />
                </button>

                {/* Premium Soft-Pink "NEW ARRIVAL" Label */}
                <div className="absolute top-5 left-5 bg-[#fef2f2] text-[#800020] px-3 py-1.5 text-[9px] font-sans font-extrabold tracking-[0.16em] uppercase border border-red-100/40 select-none">
                  NEW ARRIVAL
                </div>
              </div>

              {/* Caption metadata underneath the card */}
              <div 
                onClick={() => onSelectProduct(tshirt)}
                className="mt-5 space-y-1.5 cursor-pointer"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-sans font-bold text-sm md:text-base text-neutral-900 tracking-tight uppercase group-hover:text-[#570013] transition-colors duration-200">
                    {tshirt.name}
                  </h3>
                  <span className="font-mono text-xs md:text-sm font-semibold text-neutral-700">
                    ${tshirt.price.toFixed(0)} CAD
                  </span>
                </div>
                <p className="text-[10px] md:text-xs font-sans tracking-widest text-[#570013] font-medium uppercase opacity-75">
                  PREMIUM JERSEY / MINIMALIST LOGO
                </p>
              </div>
            </div>
          )}

          {/* RIGHT ITEM: HOODIE (Grey) */}
          {hoodie && (
            <div className="flex flex-col group">
              {/* Product Card Container */}
              <div 
                onClick={() => onSelectProduct(hoodie)}
                className="aspect-[3/4] w-full bg-[#f4f2f0]/65 border border-neutral-100 flex items-center justify-center relative overflow-hidden transition-all cursor-pointer"
              >
                {/* Image under pristine Zoom animation */}
                <img 
                  alt={hoodie.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                  src={hoodie.image}
                  referrerPolicy="no-referrer"
                />

                {/* Absolute Heart Bookmark button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(hoodie.slug);
                  }}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/75 hover:bg-white text-neutral-800 flex items-center justify-center shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                  aria-label="Ajouter aux favoris"
                >
                  <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(hoodie.slug) ? 'fill-[#570013] text-[#570013]' : 'text-neutral-500 hover:text-red-500'}`} />
                </button>
              </div>

              {/* Caption metadata underneath the card */}
              <div 
                onClick={() => onSelectProduct(hoodie)}
                className="mt-5 space-y-1.5 cursor-pointer"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-sans font-bold text-sm md:text-base text-neutral-900 tracking-tight uppercase group-hover:text-[#570013] transition-colors duration-200">
                    {hoodie.name}
                  </h3>
                  <span className="font-mono text-xs md:text-sm font-semibold text-neutral-700">
                    ${hoodie.price.toFixed(0)} CAD
                  </span>
                </div>
                <p className="text-[10px] md:text-xs font-sans tracking-widest text-[#570013] font-medium uppercase opacity-75">
                  HEAVYWEIGHT COTTON / ARCHITECTURAL FIT
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Follow on Instagram Feed Indicator Banner */}
        <div className="mt-28 pt-10 border-t border-neutral-200/60 text-center">
          <a 
            href="https://www.instagram.com/613club.shop/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-neutral-400 hover:text-[#570013] transition-colors uppercase"
          >
            FOLLOW @613CLUB.SHOP ON INSTAGRAM FOR EARLY ACCESS
          </a>
        </div>

      </div>
    </div>
  );
}
