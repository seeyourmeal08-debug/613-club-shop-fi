import { Product } from './types';
// @ts-ignore
import hfImg from './assets/images/hf_20260517_033522_d10b0125-a482-45d0-a81a-a98ef43a42cf.png';

export const products: Product[] = [
  {
    id: 'prod-hoodie',
    slug: '613-club-hoodie',
    name: '613 CLUB HOODIE',
    badge: 'ÉDITION LIMITÉE',
    price: 80.00,
    currency: '$ CAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC985tsZIhoPPodqvpqB2yCHKCnGOTBg6eAl6bNT9QDGk-_zCeoEoSa_WBYLhySwJ-R6HeSv_mNEFZ92Be7L4r9UVptiGjuFV6ADjX5CF05pFoQkrhv5YoqpRS0uhhVPJJtfiSnjD4SWjKQhpSqtEHBL5wT-gdkH5vpDG2YCM4JQgJafTYjhzc2nec44ZWephgYsJJqLZOUpssyY6qsqhczxvgt5ePm8ldTepvugttGsyVtYRDA9XpWKeDEsYRI3ezcfSxlj_VqKGmU=s0',
    colors: [
      { id: 'gris', name: 'GRIS', hex: '#b0b5b8' } // updated to exact cool grey resembling actual color
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Heavyweight 420gm garment engineered for ultimate structural integrity. Features an oversized fit, drop shoulder styling, and a clean, drawcord-less hood. Knitted with high-density premium yarns to preserve its monumental silhouette while maintaining superior interior comfort.',
    details: [
      'Premium Heavyweight 12.5oz / 420gm 3-end fleece',
      '75% combed ringspun cotton / 25% polyester blend',
      '100% combed cotton face yarns for ultra-smooth texture',
      'Pre-laundered fabric with minimal shrinkage design',
      'Double layer 1-piece hood without drawcorders',
      'Blind stitch sewing on all raw hem corners'
    ]
  },
  {
    id: 'prod-tshirt',
    slug: '613-club-tshirt',
    name: '613 CLUB T-SHIRT',
    badge: 'ÉDITION LIMITÉE',
    price: 45.00,
    currency: '$ CAD',
    image: hfImg,
    colors: [
      { id: 'creme', name: 'CRÈME', hex: '#f0edd8' } // premium high-end cream beige color
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'The definitive luxury heavyweight tee. Features an intentionally loose, relaxed silhouette, signature dropped shoulders, and a superheavy 280 GSM combed ringspun cotton layout. Highly pill-resistant with durable colorfastness made to endure a decade of wear and tear.',
    details: [
      '280 GSM Superheavy luxury knit fabric',
      '100% Premium Combed Ringspun Cotton',
      'Intentionally loose drop shoulder streetwear fit',
      'Durable sideseamed construction preserving layout',
      'Easy tear-away sleek satin neck label design',
      'Highly pill-resistant and low shrinkage treatment'
    ]
  }
];

export const archiveItems = [
  {
    id: 'arch-1',
    name: '613 CLUB HOODIE (GREY)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMvfgTcI2qPfjAhjOiIBCDMetz-lfs55OcDUgCYYTiH4v3RRbbV_NYiiOvR9fOQiPrGmPzir0R-VoliAM90G7XmZ7K8n2wryQh-OV0t92oLBNOXwCLS5830AcWr98O-h-RAVb46IGoIQU2ZVjX90S--uy-9RACe2Vr4XB31ddOmpShLhhYT3_n_HL5LPv_iKlsBIGyn2r17Tue6EhNETiiymiutKgbXhemBGPlrmMtdliPeiRTkY9QxM1dbkK7cbA_bePshb9213co=s0'
  },
  {
    id: 'arch-2',
    name: '613 CLUB HOODIE WITH EMBROIDERY',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArUpqh4KkYpoPUee7MvfIF5X7x63tTFud8OMwaRAf6Qeg51jL-Fdig8uvltHqOCRzfH_vKR_whWUU0Pg9f3tNxDnQ6kJ_MGrCLvDVQoxgdwxkkerDKt3Fynv_Qee99F4nwmAL41H1Y5J5MASjpqSNu2rU_aR4fow4xBo36yovAzVkoIm2VyzoVFs4bIs52NsuK5RQgaI8uXLI1Xc7LPYMIMZqQOG8pV_DkHivI4T-lFKftmWdq8JKFEQFb5SXQFZdApPi3jiGsmSRW=s0'
  },
  {
    id: 'arch-3',
    name: '613 CLUB HOODIE COUCH ARCHITECTURE',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjz0h-cKAOyo4FYjVGK4b1lqo89hT9rw6ybMVsAd8NKBH310T8RP8xWWjKBfPDUsv05vuTXfwvlAnpY0ym3d2kHCMG4M4oC9jeelf5gFZ8IL-ICGhnF-H5-H-ycxCrmKSCXkh1WmfblbFBFfyj2ZHs563DqXeKw8gISllucvrzGaisEWnYcj8FZt3uG0IcSHfAUfeFR5fRgTnbU5IrLNQB9svd6_A8gnKnxIDd1kdy1jJNYtwLNXfPp2_VDsyVRJ8LpEMKSGFJabkc=s0'
  }
];
