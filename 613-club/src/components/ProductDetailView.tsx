/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Star, ArrowRight, Heart } from 'lucide-react';
import { Product, Size, ProductColor } from '../types';
import philosophySpotlightImg from '../assets/images/philosophy_spotlight.jpg';
// @ts-ignore
import hfImg from '../assets/images/hf_20260517_033522_d10b0125-a482-45d0-a81a-a98ef43a42cf.png';
// @ts-ignore
import img9656 from '../assets/images/IMG_9656.JPG';
// @ts-ignore
import img9704 from '../assets/images/IMG_9704.JPG';
// @ts-ignore
import img9572 from '../assets/images/IMG_9572.JPG';
// @ts-ignore
import img9623 from '../assets/images/IMG_9623.JPG';
// @ts-ignore
import img9580 from '../assets/images/IMG_9580.JPG';
// @ts-ignore
import img9608 from '../assets/images/IMG_9608.JPG';
// @ts-ignore
import img9612 from '../assets/images/IMG_9612.JPG';
// @ts-ignore
import editorialBottomImg from '../assets/images/editorial_bottom.jpg';
// @ts-ignore
import suggestionImg from '../assets/images/hf_20260517_041620_7f173b6c-f436-4fb3-aa4c-dc66dd9c1e4e.png';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  addToCart: (product: Product, selectedSize: Size, selectedColor: ProductColor) => void;
  toggleWishlist: (productSlug: string) => void;
  wishlist: string[];
  activeSize: Size;
  setActiveSize: (size: Size) => void;
  setActiveSizeGuideProduct: (product: Product | null) => void;
  onNavigateToProduct: (product: Product) => void;
  onBackToShop: () => void;
}

export default function ProductDetailView({
  product,
  allProducts,
  addToCart,
  toggleWishlist,
  wishlist,
  activeSize,
  setActiveSize,
  setActiveSizeGuideProduct,
  onNavigateToProduct,
  onBackToShop,
}: ProductDetailViewProps) {
  
  const isTshirt = product.id === 'prod-tshirt';

  // Custom Detail Content for T-Shirt or Hoodie
  const pageTitle = isTshirt ? "613 CLUB T-SHIRT" : "613CLUB HOODIE";
  const formattedPrice = isTshirt ? "$45 CAD" : "$80 CAD";
  
  // Custom descriptions matching screenshot
  const descriptionText = isTshirt 
    ? "Our signature oversized tee, crafted from heavyweight 280 GSM premium jersey for a structured yet breathable drape. Features the iconic Hamsa logo, symbolising protection and strength, meticulously rendered in a small chest hit and a bold back graphic."
    : "Heavyweight 420gm garment engineered for ultimate structural integrity. Features an oversized fit, drop shoulder styling, and a clean, drawcord-less hood. Knitted with high-density premium yarns to preserve its monumental silhouette while maintaining superior interior comfort.";

  const bullets = isTshirt 
    ? [
        "280 GSM Premium Jersey",
        "100% Organic Cotton",
        "Color: Creme / Off-White",
        "Dropped Shoulder Fit",
        "Made in Canada"
      ]
    : [
        "Premium Heavyweight 12.5oz / 420gm 3-end fleece",
        "75% combed ringspun cotton / 25% polyester blend",
        "100% combed cotton face yarns for ultra-smooth texture",
        "Pre-laundered fabric with minimal shrinkage design",
        "Double layer 1-piece hood without drawcorders",
        "Blind stitch sewing on all raw hem corners"
      ];

  // Specific images array for stacking layout matching screenshot
  const images = isTshirt 
    ? [
        // Image 1: Main product frame of T-shirt
        hfImg,
        // Image 2: Philosophy spotlight close up
        philosophySpotlightImg,
        // Image 3: IMG_9572
        img9572,
        // Image 4: IMG_9623
        img9623
      ]
    : [
        // Image 1: Back of grey hoodie 
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC985tsZIhoPPodqvpqB2yCHKCnGOTBg6eAl6bNT9QDGk-_zCeoEoSa_WBYLhySwJ-R6HeSv_mNEFZ92Be7L4r9UVptiGjuFV6ADjX5CF05pFoQkrhv5YoqpRS0uhhVPJJtfiSnjD4SWjKQhpSqtEHBL5wT-gdkH5vpDG2YCM4JQgJafTYjhzc2nec44ZWephgYsJJqLZOUpssyY6qsqhczxvgt5ePm8ldTepvugttGsyVtYRDA9XpWKeDEsYRI3ezcfSxlj_VqKGmU=s0",
        // Image 2: IMG_9580
        img9580,
        // Image 3: IMG_9608
        img9608,
        // Image 4: IMG_9612
        img9612
      ];

  // Crossed suggestions for "YOU MIGHT ALSO LIKE"
  // For T-shirt -> suggest Hoodie, for Hoodie -> suggest T-shirt.
  const isWishlisted = wishlist.includes(product.slug);

  const handleAddToCart = () => {
    addToCart(product, activeSize, product.colors[0]);
  };

  return (
    <div className="bg-[#fcfbfa] text-neutral-900 font-sans antialiased min-h-screen py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mt-6">
        
        {/* Breadcrumbs Path */}
        <div className="flex items-center gap-1 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase select-none mb-10">
          <button onClick={onBackToShop} className="hover:text-neutral-900 transition-colors uppercase cursor-pointer">
            HOME
          </button>
          <span>/</span>
          <button onClick={onBackToShop} className="hover:text-neutral-900 transition-colors uppercase cursor-pointer">
            COLLECTION
          </button>
          <span>/</span>
          <span className="text-[#570013] font-extrabold">{pageTitle}</span>
        </div>

        {/* Two-Column Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          
          {/* LEFT SIDE: Vertical Stacks of Images (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Image 1: Main product frame */}
            <div className="w-full bg-[#f4f2f0]/65 border border-neutral-100 flex items-center justify-center relative aspect-[3/4]">
              <img 
                src={images[0]} 
                alt={`${product.name} back view`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => toggleWishlist(product.slug)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/75 hover:bg-white text-neutral-800 flex items-center justify-center shadow-sm backdrop-blur-xs transition-colors cursor-pointer z-10"
                aria-label="Sauvegarder et aimer"
              >
                <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#570013] text-[#570013]' : 'text-neutral-500 hover:text-red-500'}`} />
              </button>
            </div>

            {/* Image 2: Zoom close-up texture frame */}
            <div className="w-full bg-[#f4f2f0]/65 border border-neutral-100 flex items-center justify-center aspect-[1/1] overflow-hidden">
              <img 
                src={images[1]} 
                alt={`${product.name} embroidery texture`} 
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Image 3 & 4: Small side by side grid of details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f4f2f0]/65 border border-neutral-100 aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img 
                  src={images[2]} 
                  alt={`${product.name} detailed shot`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-[#f4f2f0]/65 border border-neutral-100 aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img 
                  src={images[3]} 
                  alt={`${product.name} secondary shot`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Sticky Configurations Panel (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[120px] space-y-8">
              
              {/* Product Header details */}
              <div className="border-b border-neutral-100 pb-6">
                <h1 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-[#570013] uppercase leading-none">
                  {pageTitle}
                </h1>
                <div className="font-mono text-base md:text-lg font-bold text-neutral-800 mt-3">
                  {formattedPrice}
                </div>
              </div>

              {/* Color indicator */}
              <div>
                <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3">
                  COLOR
                </h4>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-neutral-300 ring-2 ring-offset-2 ring-[#570013]/60 p-0.5"
                    style={{ backgroundColor: product.colors[0].hex }}
                  />
                  <span className="text-[10px] font-mono font-bold text-neutral-700 tracking-wider">
                    {product.colors[0].name}
                  </span>
                </div>
              </div>

              {/* Selection of size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    SELECT SIZE
                  </h4>
                  <button 
                    onClick={() => setActiveSizeGuideProduct(product)}
                    className="text-[10px] font-mono font-semibold uppercase underline underline-offset-4 decoration-neutral-300 hover:text-[#570013] transition-colors cursor-pointer"
                  >
                    SIZE GUIDE
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((sz) => {
                    const isActive = activeSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setActiveSize(sz)}
                        className={`py-3 text-[11px] font-mono font-bold border-2 transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-[#570013] border-[#570013] text-white shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-700'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core trigger button to cart */}
              <div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#570013] hover:bg-[#7a041f] text-white py-4 font-mono font-bold text-xs tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer tracking-widest leading-none"
                >
                  AJOUTER AU PANIER
                </button>
              </div>

              {/* Detailed specs list */}
              <div className="space-y-4 pt-4 border-t border-neutral-200/50">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    DETAILS
                  </span>
                  <p className="text-[12px] font-light leading-relaxed text-neutral-600 font-sans">
                    {descriptionText}
                  </p>
                  <ul className="text-[11px] text-neutral-500 space-y-1 list-disc pl-4 font-sans font-light">
                    {bullets.map((bullet, idx) => (
                      <li key={idx}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* "YOU MIGHT ALSO LIKE" Section */}
        <div className="mt-32 pt-16 border-t border-neutral-200/60">
          <h3 className="text-sm font-mono tracking-[0.3em] text-neutral-400 font-bold uppercase text-center mb-12">
            YOU MIGHT ALSO LIKE
          </h3>

          <div className="flex justify-center">
            {/* Display the complementary product */}
            {allProducts.filter(p => p.id !== product.id).map(compProduct => {
              const compIsTshirt = compProduct.id === 'prod-tshirt';
              const displayTitle = compIsTshirt ? "HAMSA T-SHIRT" : "613CLUB HOODIE";
              const displayPrice = compIsTshirt ? "$45 CAD" : "$80 CAD";
              // We use the requested suggestion image for the companion item of the t-shirt
              const displayImage = compIsTshirt 
                ? compProduct.image 
                : suggestionImg;

              return (
                <div 
                  key={compProduct.id} 
                  onClick={() => onNavigateToProduct(compProduct)}
                  className="w-full max-w-xs group cursor-pointer flex flex-col"
                >
                  <div className="aspect-[3/4] w-full bg-[#f4f2f0]/65 border border-neutral-100 flex items-center justify-center overflow-hidden transition-all relative">
                    <img 
                      src={displayImage} 
                      alt={displayTitle} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h4 className="font-sans font-bold text-xs text-neutral-900 uppercase tracking-tight group-hover:text-[#570013] transition-colors">
                      {displayTitle}
                    </h4>
                    <p className="font-mono text-xs text-neutral-600">
                      {displayPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
