/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Globe, 
  Share2, 
  Info, 
  ArrowRight, 
  Trash2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { products, archiveItems } from './data';
import { CartItem, Product, Size, ProductColor } from './types';

export default function App() {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('613club_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Custom states for Hoodie configuration
  const [hoodieSize, setHoodieSize] = useState<Size>('M');
  const [isHoodieDescOpen, setIsHoodieDescOpen] = useState(true);

  // Custom states for T-Shirt configuration
  const [tshirtSize, setTshirtSize] = useState<Size>('L');
  const [isTshirtDescOpen, setIsTshirtDescOpen] = useState(true);

  // Size Guide state
  const [activeSizeGuideProduct, setActiveSizeGuideProduct] = useState<Product | null>(null);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Checkout Form Simulation State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: 'Jean-Pierre Laurent',
    email: 'seeyourmeal08@gmail.com',
    address: '420 Rue de la Gauchetière, Montréal, QC',
    zip: 'H2Z 1A2',
    card: '4111 2222 3333 4444',
    expiry: '09/28',
    cvv: '613'
  });

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' }[]>([]);

  // Local storage watcher
  useEffect(() => {
    localStorage.setItem('613club_cart', JSON.stringify(cart));
  }, [cart]);

  // Helper: Trigger custom Toast
  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Helper: Clear specific toast
  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, selectedSize: Size, selectedColor: ProductColor) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor.id}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        triggerToast(`Quantité de ${product.name} (${selectedSize}) mise à jour dans le panier.`, 'success');
        return prev.map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        triggerToast(`${product.name} (${selectedSize}) ajouté au panier.`, 'success');
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: 1
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string, itemName: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    triggerToast(`${itemName} retiré du panier.`, 'info');
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQt = item.quantity + delta;
        return newQt > 0 ? { ...item, quantity: newQt } : item;
      }
      return item;
    }));
  };

  const toggleWishlist = (productSlug: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productSlug);
      if (exists) {
        triggerToast(`Retiré des favoris.`, 'info');
        return prev.filter(slug => slug !== productSlug);
      } else {
        triggerToast(`Ajouté à votre liste de souhaits ✨`, 'success');
        return [...prev, productSlug];
      }
    });
  };

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const estimatedTax = subtotal * 0.14975; // Quebec joint tax rate: 14.975%
  const shippingCharge = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal + estimatedTax + shippingCharge;

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOrderComplete(true);
    triggerToast("Commande passée avec succès !", "success");
    setCart([]); // Clear cart
    setTimeout(() => {
      setIsOrderComplete(false);
      setIsCheckoutOpen(false);
    }, 4500);
  };

  const shareCollection = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast("Lien de la collection 613 copié dans le presse-papiers !", "info");
  };

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-neutral-800 selection:text-neutral-50 flex flex-col antialiased">
      
      {/* Dynamic Toast Container */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-neutral-900 border border-neutral-800 text-neutral-100 p-4 rounded-lg shadow-xl flex items-center justify-between gap-4"
              id={`toast-${toast.id}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <p className="text-xs font-headline font-medium tracking-tight text-neutral-200">
                  {toast.message}
                </p>
              </div>
              <button 
                onClick={() => dismissToast(toast.id)}
                className="text-neutral-500 hover:text-neutral-200 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Transparent Fixed Header */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-7xl mx-auto">
          {/* Quick Info Menu Spacer */}
          <div className="hidden md:flex items-center gap-6" />
          
          {/* Brand/Logo Centered */}
          <div>
            <a href="#" className="text-xl md:text-2xl font-headline font-extrabold tracking-tighter text-neutral-950 transition-all hover:scale-[1.02]">
              613 CLUB
            </a>
          </div>

          {/* Interactive Utility Tray */}
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-800 hover:text-neutral-950 transition-transform hover:scale-105"
              id="navigation-cart-button"
              aria-label="Ouvrir le panier"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {cart.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-neutral-950 text-white font-mono text-[9px] font-bold flex items-center justify-center rounded-full"
                >
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Epic Hero Section with Background Editorial Photo */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-neutral-950 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-900/40 to-neutral-950/70 z-10" />
          <img 
            alt="Photographie éditoriale du sweat à capuche 613 CLUB" 
            className="w-full h-full object-cover object-center scale-102 filter brightness-[0.75]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAczxZ_vGTCOrn2vo9gxKYfxARbKlJ6WNZsIW8mMc8N4DlF0LbucwY_fw8ByQxO8TWzFyKhYHtwWrMPh1QrTtaYJC-DQ8NnwCpV0ZuAJX5-157D75NlD-TZNhjTbtQXpy0Y4E3iUzdz9DiIwO2rFJ7OdlvlrKigExHyCJNGFpDYWdfSxX7dqQAFV3MlnGH_1UEhIXisZxYER5IRbYTXN3oRVqn4hMkJkNXM78cHIlD_LwLtr0XBCawI9UX1DR33azYEH7uC1cZqovRK=s0"
          />
        </div>

        {/* Hero Copy */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] text-neutral-400 font-mono uppercase mb-4"
          >
            SÉRIE LIMITÉE DE PRESTIGE
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-headline font-extrabold tracking-tighter text-white uppercase select-none leading-none mb-4"
          >
            PROTÉGÉ
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-neutral-300 font-sans text-xs md:text-sm max-w-2xl mx-auto tracking-wide leading-relaxed font-light mb-12 px-4"
          >
            Une famille. Un fils. Un rêve. À 17 ans, j'ai le rêve de partir étudier en yeshiva en Israël l'année prochaine. Pour concrétiser ce projet d'une vie, j'ai eu l'idée de créer une marque qui parle à la communauté : 613 mitzvot. Une hamsa, une promesse : « Next year in Jerusalem ».
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <a 
              href="#collections" 
              className="bg-[#013220] hover:bg-[#01422b] text-white px-10 py-5 rounded-md font-headline font-bold text-xs tracking-[0.2em] uppercase transition-all hover:scale-[1.03]"
            >
              ACHETER MAINTENANT
            </a>
          </motion.div>
        </div>

        {/* Down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-2">
            dÉfilez
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce stroke-[1.5] text-white" />
        </div>
      </section>

      {/* Main E-commerce Showcase Spot */}
      <section id="collections" className="py-24 px-4 md:px-12 bg-[#f2f4f4] transition-all">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start mb-12 max-w-xl">
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-neutral-900 uppercase">
              LA COLLECTION DROP 02
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            
            {/* Products Loop: Product 1 - HOODIE */}
            {(() => {
              const hoodie = products[0];
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/60 p-6 md:p-8 rounded-2xl border border-neutral-200/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Left Column: Premium Interactive Image Viewer */}
                  <div className="md:col-span-6 flex flex-col gap-3">
                    <div className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-neutral-100 border border-neutral-200">
                      <img 
                        alt="613 CLUB HOODIE" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={hoodie.image}
                      />
                      <button 
                        onClick={() => toggleWishlist(hoodie.slug)}
                        className="absolute top-4 right-4 bg-white/95 hover:bg-white text-neutral-900 p-2.5 rounded-full shadow-sm hover:shadow-md transition-all z-20"
                        aria-label="Ajouter aux favoris"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(hoodie.slug) ? 'fill-red-500 stroke-red-500' : 'text-neutral-500 hover:text-red-500'}`} />
                      </button>
                      
                      <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest text-neutral-900 border border-neutral-200">
                        {hoodie.badge}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customization Panel */}
                  <div className="md:col-span-6 flex flex-col justify-between py-2 space-y-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#013220] uppercase font-bold">
                        {hoodie.badge}
                      </span>
                      <h3 className="text-2xl font-headline font-extrabold text-neutral-950 mt-1 mb-2">
                        {hoodie.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold text-neutral-800">
                          {hoodie.price.toFixed(2)} $ CAD
                        </span>
                      </div>
                    </div>

                    {/* Finition Color Dots */}
                    <div>
                      <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase mb-3">
                        FINITION
                      </h4>
                      <div className="flex gap-4">
                        {hoodie.colors.map(color => (
                          <div key={color.id} className="flex flex-col items-center gap-1">
                            <button
                              className="w-8 h-8 rounded-full border-2 border-neutral-800 ring-2 ring-offset-2 ring-neutral-950 p-0.5"
                              style={{ backgroundColor: color.hex }}
                              aria-label={`Couleur ${color.name}`}
                            />
                            <span className="text-[9px] font-headline font-bold text-neutral-700 tracking-wider">
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector Grid */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                          TAILLE SÉLECTIONNÉE: <span className="text-neutral-950 font-bold">{hoodieSize}</span>
                        </h4>
                        <button 
                          onClick={() => setActiveSizeGuideProduct(hoodie)}
                          className="text-[10px] font-mono font-semibold uppercase text-neutral-600 hover:text-neutral-950 underline underline-offset-4"
                        >
                          GUIDE DES TAILLES
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {hoodie.sizes.map((sz) => {
                          const isActive = hoodieSize === sz;
                          return (
                            <button
                              key={sz}
                              onClick={() => setHoodieSize(sz)}
                              className={`py-3.5 border text-xs font-headline font-bold rounded-md transition-all ${
                                isActive 
                                  ? 'border-neutral-900 bg-neutral-950 text-white' 
                                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-700'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom collapsable accordion list for hoodie description */}
                    <div className="border-t border-b border-neutral-200 py-3">
                      <button 
                        onClick={() => setIsHoodieDescOpen(!isHoodieDescOpen)}
                        className="w-full flex justify-between items-center group py-1 text-left"
                        aria-expanded={isHoodieDescOpen}
                      >
                        <span className="font-headline font-bold text-[10px] tracking-widest text-[#013220] uppercase">
                          DESCRIPTION DÉTAILLÉE
                        </span>
                        {isHoodieDescOpen ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                      </button>

                      <AnimatePresence initial={false}>
                        {isHoodieDescOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[11px] font-light leading-relaxed text-neutral-600 font-sans mt-3 mb-2">
                              {hoodie.description}
                            </p>
                            <ul className="text-[10px] text-neutral-500 space-y-1 list-disc pl-4 mt-2 font-sans font-light">
                              {hoodie.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Add directly to shopping cart */}
                    <button
                      onClick={() => addToCart(hoodie, hoodieSize, hoodie.colors[0])}
                      className="w-full bg-neutral-950 text-white py-5 rounded-md font-headline font-bold text-xs tracking-widest uppercase transition-all hover:bg-neutral-800 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      AJOUTER AU PANIER
                    </button>

                  </div>
                </div>
              );
            })()}

            {/* Products Loop: Product 2 - T-SHIRT */}
            {(() => {
              const tshirt = products[1];
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white/60 p-6 md:p-8 rounded-2xl border border-neutral-200/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Left Column: Premium Interactive Image Viewer */}
                  <div className="md:col-span-6 flex flex-col gap-3">
                    <div className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-neutral-100 border border-neutral-200">
                      <img 
                        alt="613 CLUB T-SHIRT" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={tshirt.image}
                      />
                      <button 
                        onClick={() => toggleWishlist(tshirt.slug)}
                        className="absolute top-4 right-4 bg-white/95 hover:bg-white text-neutral-900 p-2.5 rounded-full shadow-sm hover:shadow-md transition-all z-20"
                        aria-label="Ajouter aux favoris"
                      >
                        <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(tshirt.slug) ? 'fill-red-500 stroke-red-500' : 'text-neutral-500 hover:text-red-500'}`} />
                      </button>
                      
                      <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest text-neutral-900 border border-neutral-200">
                        {tshirt.badge}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customization Panel */}
                  <div className="md:col-span-6 flex flex-col justify-between py-2 space-y-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#013220] uppercase font-bold">
                        {tshirt.badge}
                      </span>
                      <h3 className="text-2xl font-headline font-extrabold text-neutral-950 mt-1 mb-2">
                        {tshirt.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold text-neutral-800">
                          {tshirt.price.toFixed(2)} $ CAD
                        </span>
                      </div>
                    </div>

                    {/* Finition Color Dots */}
                    <div>
                      <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase mb-3">
                        FINITION
                      </h4>
                      <div className="flex gap-4">
                        {tshirt.colors.map(color => (
                          <div key={color.id} className="flex flex-col items-center gap-1">
                            <button
                              className="w-8 h-8 rounded-full border-2 border-neutral-800 ring-2 ring-offset-2 ring-neutral-950 p-0.5"
                              style={{ backgroundColor: color.hex }}
                              aria-label={`Couleur ${color.name}`}
                            />
                            <span className="text-[9px] font-headline font-bold text-neutral-700 tracking-wider">
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Size Selector Grid */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                          TAILLE SÉLECTIONNÉE: <span className="text-neutral-950 font-bold">{tshirtSize}</span>
                        </h4>
                        <button 
                          onClick={() => setActiveSizeGuideProduct(tshirt)}
                          className="text-[10px] font-mono font-semibold uppercase text-neutral-600 hover:text-neutral-950 underline underline-offset-4"
                        >
                          GUIDE DES TAILLES
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {tshirt.sizes.map((sz) => {
                          const isActive = tshirtSize === sz;
                          return (
                            <button
                              key={sz}
                              onClick={() => setTshirtSize(sz)}
                              className={`py-3.5 border text-xs font-headline font-bold rounded-md transition-all ${
                                isActive 
                                  ? 'border-neutral-900 bg-neutral-950 text-white' 
                                  : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-700'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom collapsable accordion list for t-shirt description */}
                    <div className="border-t border-b border-neutral-200 py-3">
                      <button 
                        onClick={() => setIsTshirtDescOpen(!isTshirtDescOpen)}
                        className="w-full flex justify-between items-center group py-1 text-left"
                        aria-expanded={isTshirtDescOpen}
                      >
                        <span className="font-headline font-bold text-[10px] tracking-widest text-[#013220] uppercase">
                          DESCRIPTION DÉTAILLÉE
                        </span>
                        {isTshirtDescOpen ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                      </button>

                      <AnimatePresence initial={false}>
                        {isTshirtDescOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-[11px] font-light leading-relaxed text-neutral-600 font-sans mt-3 mb-2">
                              {tshirt.description}
                            </p>
                            <ul className="text-[10px] text-neutral-500 space-y-1 list-disc pl-4 mt-2 font-sans font-light">
                              {tshirt.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Add directly to shopping cart */}
                    <button
                      onClick={() => addToCart(tshirt, tshirtSize, tshirt.colors[0])}
                      className="w-full bg-neutral-950 text-white py-5 rounded-md font-headline font-bold text-xs tracking-widest uppercase transition-all hover:bg-neutral-800 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      AJOUTER AU PANIER
                    </button>

                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      </section>

      {/* Philosophy / Features Spotlight Section */}
      <section id="vision" className="py-24 px-6 md:px-12 bg-white transition-all overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column showing Hoodies and Textures */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group bg-neutral-100">
                <img 
                  alt="Aesthetic product close-up with embroidery detail" 
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrp5oi3G-qWrI4Zr9g8OuXJANajs9W_HlvMGljTyVHm3YYjI0ZlCJ6cR2gopf5i5o7-R8w1fzx8rmy-vbvb-bzqFndDVsQoCYfr72rZd09v-kTXAUuutDGvzVryTdtGNU2CxMTp1jPht2bmVj1Mg4x4rrjqcqP3gdXhJDN1zlLvJqs0sfTVkPftwm8_XlHiFUW5cNp6azlwPc98rB-sfUisA6xGZOq6PU63-2MEsGEIDbDlBMxREmpPl79zkWxQkGEHVVDViFCcjB4=s0"
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
              </div>
            </div>

            {/* Philosophy text */}
            <div className="lg:col-span-5 space-y-8 lg:pl-6">
              <span className="text-xs font-mono tracking-widest text-[#013220] font-bold uppercase">
                UNE HISTOIRE, UN ENGAGEMENT
              </span>
              <h3 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter text-neutral-900 uppercase leading-tight">
                UNE FAMILLE.<br />UN FILS. UN RÊVE.
              </h3>
              
              <div className="space-y-6 text-neutral-600 font-sans leading-relaxed text-sm font-light">
                <p>
                  À 17 ans, j'ai le rêve profond de partir étudier en yeshiva en Israël l'année prochaine. Pour concrétiser ce projet d'une vie entière, j'ai imaginé cette marque qui rassemble notre communauté autour des 613 mitzvot. Une hamsa, symbole de protection, et une promesse éternelle : « Next year in Jerusalem ».
                </p>
                <p>
                  Chaque détail du Hoodie et de nos créations a été conçu avec soin pour incarner cette rigueur et cette élégance. Votre soutien participe directement au financement de ces études de transmission culturelle et spirituelle.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Archive Drop 01 Section with Grayscale Out of Stock Items */}
      <section className="py-24 px-6 md:px-12 bg-[#f9f9f9] border-t border-neutral-200/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 font-bold uppercase block mb-2">
              HISTORIQUE & HERITAGE
            </span>
            <h2 className="text-3xl font-headline font-extrabold tracking-tighter uppercase text-neutral-950">
              ARCHIVE DROP 01 — FINI
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-2 font-sans">
              Ces pièces ont été produites en quantités ultra-limitées de 50 unités numérotées. Aucun réapprovisionnement de ces coloris originaux ne sera effectué.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {archiveItems.map((item, index) => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square bg-neutral-200 border border-neutral-300/40">
                <img 
                  alt={item.name} 
                  className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-700 group-hover:scale-105" 
                  src={item.image}
                />
                <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-neutral-900/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="bg-black/95 text-white text-[10px] font-mono font-bold tracking-[0.3em] uppercase px-5 py-2.5 rounded-sm border border-neutral-800 shadow-md">
                    SOLD OUT
                  </span>
                  <span className="text-[10px] text-neutral-300 font-mono tracking-widest mt-4 uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                    {index === 0 ? "ÉDITION ORIGINAL GRIS" : index === 1 ? "ÉDITION GRIS BRODÉ" : "COUCH COLOURED ARCH."}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Editorial Quote Section */}
      <section className="pb-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Editorial Picture Left */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden h-[500px] md:h-[650px] relative group bg-neutral-100">
              <img 
                alt="Installation artistique du Hoodie 613 CLUB" 
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-103" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7lLlwnjngV2IAZsafohR8gVpQFu9LVC9dUScMm8ad_vv9S1s7450okR-DF_YuatNstR0nK-J75urtg6CwEUMc8JLOFSw_KbiGCi_jWkzprsj-UWlnqGoX4dgplZNV9WFBdXoWwK8sscNZiQDz_s53tvhfY5SXAmFXjp0jwenflkIYpoO1F2QeLBHC_5DxttagFlhesTGPjQ7FXFdwLviWGX7LNj6ctpTlUMYm9eylDn3sxHNoql0osxePnggn_NaEfGjofxr7-hLL=s0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Quote Block Right */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-[#ebeeef] flex flex-col items-center justify-center p-8 md:p-12 h-[500px] md:h-[650px] border border-neutral-300/40">
              <div className="max-w-sm text-center space-y-8">
                <span className="text-[10px] font-mono tracking-widest text-[#013220] font-bold block bg-white/45 py-1 px-3 rounded-full w-max mx-auto border border-white/20">
                  CRITIQUE DE SÉRIE
                </span>
                
                <p className="font-headline tracking-tighter leading-snug text-neutral-900 text-xl md:text-2xl font-light italic">
                  "Le Hoodie 613 CLUB ressemble moins à un vêtement conventionnel qu'à une couche architecturale protectrice rigide."
                </p>
                
                <div className="pt-4 border-t border-neutral-300">
                  <span className="block font-headline font-extrabold text-xs tracking-[0.2em] uppercase text-neutral-800">
                    — JOURNAL STUDIO 613
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono block mt-1">
                    ÉDITION PRINTEMPS / ÉTÉ
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fully Functional Size Guide Overlaid Modal */}
      <AnimatePresence>
        {activeSizeGuideProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSizeGuideProduct(null)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden z-10 border border-neutral-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-neutral-100">
                <div>
                  <h3 className="text-lg font-headline font-extrabold text-neutral-900">
                    GUIDE DES TAILLES — {activeSizeGuideProduct.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans mt-0.5 font-light">
                    Mesures précises prises à plat (en Centimètres)
                  </p>
                </div>
                <button 
                  onClick={() => setActiveSizeGuideProduct(null)}
                  className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Table Data content based on product */}
              <div className="p-6 space-y-6">
                <div className="overflow-x-auto rounded-lg border border-neutral-100">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-100 text-[10px] font-mono text-neutral-400 tracking-wider">
                        <th className="p-4 uppercase">Taille standard</th>
                        <th className="p-4 uppercase">Largeur Poitrine (A)</th>
                        <th className="p-4 uppercase">Longueur Totale (B)</th>
                        <th className="p-4 uppercase">Longueur Manches (C)</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans font-light divide-y divide-neutral-100">
                      {activeSizeGuideProduct.id === 'prod-hoodie' ? (
                        <>
                          <tr>
                            <td className="p-4 font-mono font-bold">S</td>
                            <td className="p-4">61 cm</td>
                            <td className="p-4">68 cm</td>
                            <td className="p-4">61 cm</td>
                          </tr>
                          <tr className="bg-neutral-50/50">
                            <td className="p-4 font-mono font-bold">M</td>
                            <td className="p-4">64 cm</td>
                            <td className="p-4">71 cm</td>
                            <td className="p-4">62 cm</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono font-bold">L</td>
                            <td className="p-4">66 cm</td>
                            <td className="p-4">74 cm</td>
                            <td className="p-4">64 cm</td>
                          </tr>
                          <tr className="bg-neutral-50/50">
                            <td className="p-4 font-mono font-bold">XL</td>
                            <td className="p-4">69 cm</td>
                            <td className="p-4">76 cm</td>
                            <td className="p-4">65 cm</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="p-4 font-mono font-bold">S</td>
                            <td className="p-4">54 cm</td>
                            <td className="p-4">70 cm</td>
                            <td className="p-4">22 cm</td>
                          </tr>
                          <tr className="bg-neutral-50/50">
                            <td className="p-4 font-mono font-bold">M</td>
                            <td className="p-4">57 cm</td>
                            <td className="p-4">73 cm</td>
                            <td className="p-4">23 cm</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono font-bold">L</td>
                            <td className="p-4">60 cm</td>
                            <td className="p-4">76 cm</td>
                            <td className="p-4">24 cm</td>
                          </tr>
                          <tr className="bg-neutral-50/50">
                            <td className="p-4 font-mono font-bold">XL</td>
                            <td className="p-4">63 cm</td>
                            <td className="p-4">78 cm</td>
                            <td className="p-4">25 cm</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Legend or information graphic representation block */}
                <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-lg flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0" />
                  <div className="text-xs text-amber-900 leading-relaxed font-sans font-light">
                    <span className="font-bold">Ajustement surdimensionné d'inspiration Street :</span> Nous conseillons de sélectionner votre taille habituelle pour l'effet drapé de la collection, ou une taille en dessous pour un effet ajusté conventionnel.
                  </div>
                </div>
              </div>

              {/* Close footer button */}
              <div className="bg-neutral-50 px-6 py-4 flex justify-end border-t border-neutral-100">
                <button 
                  onClick={() => setActiveSizeGuideProduct(null)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-headline font-bold uppercase tracking-wider px-5 py-2.5 rounded-md"
                >
                  COMPRIS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer / Panel on the Right Side */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
              id="cart-backdrop"
            />

            {/* Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { type: 'tween', duration: 0.25 } }}
              className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col z-10 border-l border-neutral-100"
              id="cart-panel-element"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-neutral-800" />
                  <h3 className="text-base font-headline font-extrabold text-neutral-950 uppercase tracking-tight">
                    VOTRE PANIER ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-950 transition-colors"
                  aria-label="Fermer le panier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-neutral-900">Votre panier est vide</p>
                      <p className="text-xs text-neutral-400 font-sans mt-1">Sélectionnez vos pièces haut de gamme pour commencer la collection.</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-neutral-900 text-white text-xs font-headline font-bold uppercase tracking-wider px-6 py-3.5 rounded-md hover:bg-neutral-800"
                    >
                      CONTINUER LE MAGASINAGE
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
                        
                        {/* Photo */}
                        <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-white shrink-0 border border-neutral-200/50">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-xs font-headline font-bold text-neutral-950 uppercase line-clamp-2">
                                {item.name}
                              </h4>
                              <button 
                                onClick={() => removeFromCart(item.id, item.name)}
                                className="text-neutral-400 hover:text-red-500 transition-colors shrink-0"
                                aria-label="Supprimer l'article"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            {/* Option selections feedback */}
                            <div className="flex flex-wrap gap-2 mt-1.5">
                              <span className="text-[9px] font-mono font-bold bg-white text-neutral-700 border border-neutral-200 px-1.5 py-0.5 rounded">
                                TAILLE: {item.size}
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-white text-neutral-700 border border-neutral-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                                COLORIS: <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color.hex }} /> {item.color.name}
                              </span>
                            </div>
                          </div>

                          {/* Interactive Quantities */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-neutral-200 bg-white rounded-md">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1.5 text-neutral-500 hover:text-neutral-900"
                                aria-label="Moins"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-mono text-xs font-bold text-neutral-800">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1.5 text-neutral-500 hover:text-neutral-900"
                                aria-label="Plus"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <span className="font-mono text-xs font-bold text-neutral-900">
                              {(item.price * item.quantity).toFixed(2)} $ CAD
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer Calculations */}
              {cart.length > 0 && (
                <div className="border-t border-neutral-100 bg-neutral-50 p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500 font-sans font-light">Sous-total</span>
                      <span className="font-mono text-neutral-900 font-medium">{subtotal.toFixed(2)} $ CAD</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500 font-sans font-light">Estimation des taxes (14.975%)</span>
                      <span className="font-mono text-neutral-900 font-medium">{estimatedTax.toFixed(2)} $ CAD</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-neutral-500 font-sans font-light">Livraison</span>
                      <span className="font-mono text-neutral-900 font-medium">
                        {shippingCharge === 0 ? "Gratuit" : `${shippingCharge.toFixed(2)} $ CAD`}
                      </span>
                    </div>
                    {shippingCharge > 0 && (
                      <p className="text-[10px] text-neutral-400 font-semibold font-sans">
                        💡 Ajoutez de la valeur pour plus de 100 $ pour la livraison gratuite !
                      </p>
                    )}
                    <div className="border-t border-neutral-200/60 pt-3 flex justify-between text-sm">
                      <span className="font-headline font-extrabold text-neutral-950">TOTAL ESTIMÉ</span>
                      <span className="font-mono text-neutral-950 font-extrabold text-base">{grandTotal.toFixed(2)} $ CAD</span>
                    </div>
                  </div>

                  <a
                    href="https://buy.stripe.com/eVq28q87OdR2aCNbpNaMU02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#013220] hover:bg-[#01422b] text-white py-4.5 rounded-md font-headline font-bold text-xs tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    PASSER À LA CAISSE
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Simulator Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isOrderComplete) setIsCheckoutOpen(false);
              }}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden z-10 border border-neutral-100"
            >
              
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <div>
                  <h3 className="text-base font-headline font-extrabold text-neutral-900 uppercase tracking-tight">
                    FINALISER VOTRE COMMANDE COMMANDITAIRE
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">La livraison utilise le système postal sécurisé DHL / Canada Post.</p>
                </div>
                {!isOrderComplete && (
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 text-neutral-400 hover:text-neutral-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {isOrderComplete ? (
                <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-16 h-16 rounded-full bg-[#013220] text-white flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-8 h-8 stroke-[3]" />
                  </motion.div>
                  <h4 className="text-xl font-headline font-extrabold text-neutral-950">
                    MERCI POUR VOTRE COMMANDE !
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-sans">
                    Votre paiement de <span className="font-bold">{grandTotal.toFixed(2)} $ CAD</span> a été validé avec succès. Un courriel de notification et votre code de suivi postal DHL ont été envoyés à <span className="font-bold">{checkoutData.email}</span>.
                  </p>
                  <span className="text-[10px] font-mono tracking-widest text-[#013220] bg-emerald-50 px-3 py-1 rounded-full uppercase font-bold">
                    ID COMMANCHE: 613-M-{Math.floor(Math.random() * 900000 + 100000)}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
                  
                  {/* Shipping Info */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                      1. ADRESSE DE LIVRAISON (CAD)
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Destinataire</label>
                        <input 
                          type="text" 
                          required
                          value={checkoutData.name} 
                          onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-sans font-light"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Courrier électronique</label>
                        <input 
                          type="email" 
                          required
                          value={checkoutData.email} 
                          onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-sans font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Adresse postale</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutData.address} 
                        onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-sans font-light"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Code Postal</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutData.zip} 
                        onChange={(e) => setCheckoutData({...checkoutData, zip: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Payment simulation */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                      2. SÉCURITÉ DE PAIEMENT SIMULÉE
                    </h4>

                    <div>
                      <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Numéro de carte</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutData.card} 
                        onChange={(e) => setCheckoutData({...checkoutData, card: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">Expiration</label>
                        <input 
                          type="text" 
                          placeholder="MM/AA"
                          required
                          value={checkoutData.expiry} 
                          onChange={(e) => setCheckoutData({...checkoutData, expiry: e.target.value})}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">CVV</label>
                        <input 
                          type="password" 
                          maxLength={3}
                          required
                          value={checkoutData.cvv} 
                          onChange={(e) => setCheckoutData({...checkoutData, cvv: e.target.value})}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 font-sans block">Total de facturation</span>
                      <span className="font-mono text-neutral-900 font-extrabold text-base">{grandTotal.toFixed(2)} $ CAD</span>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#013220] hover:bg-[#01422b] text-white py-3.5 px-8 rounded-md font-headline font-bold text-xs tracking-wider uppercase transition-all"
                    >
                      COMMANDER ET PAYER
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Bottom Footer */}
      <footer className="w-full mt-auto py-16 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* Logo & copyright column */}
          <div className="flex flex-col gap-3">
            <span className="text-xl font-headline font-extrabold text-neutral-900 tracking-tighter">
              STUDIO 613
            </span>
            <p className="text-xs text-neutral-500 font-sans font-light leading-relaxed max-w-sm">
              © 2014-2026 STUDIO 613. TOUS DROITS RÉSERVÉS.<br />
              Sculpté avec intégrité structurelle de qualité.
            </p>
          </div>

          {/* Links column */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-xs text-neutral-500 font-light justify-center md:justify-start">
            <a href="#" className="hover:text-neutral-900 transition-colors">Conditions</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Guide d'entretien</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Livraison nationale</a>
          </div>

          {/* Language & Extra Action columns */}
          <div className="flex gap-6 justify-center md:justify-end text-neutral-400">
            <button 
              onClick={() => triggerToast("Sélection de langue : Français disponible uniquement pour ce Drop.", "info")}
              className="hover:text-neutral-950 transition-colors flex items-center gap-1.5"
              title="Changer de pays / devise"
            >
              <Globe className="w-4 h-4 text-neutral-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">FR | CAD</span>
            </button>
            <button 
              onClick={() => triggerToast("Merci d'avoir partagé l'accès exclusif.", "success")}
              className="hover:text-neutral-950 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-neutral-500" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">VIP</span>
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
