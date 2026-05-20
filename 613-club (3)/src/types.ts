/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Size = 'S' | 'M' | 'L' | 'XL';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  price: number; // in CAD
  currency: string;
  image: string;
  colors: ProductColor[];
  sizes: Size[];
  description: string;
  details: string[];
}

export interface CartItem {
  id: string; // generated from productId + size + colorId
  productId: string;
  name: string;
  price: number;
  image: string;
  size: Size;
  color: ProductColor;
  quantity: number;
}
