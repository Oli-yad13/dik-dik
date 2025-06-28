'use client';

import { CartItem, Product } from './supabase';

export class CartManager {
  private static STORAGE_KEY = 'dik-dik-cart';

  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const cart = localStorage.getItem(this.STORAGE_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }

  static addToCart(product: Product, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  static removeFromCart(productId: string): void {
    const cart = this.getCart().filter(item => item.product.id !== productId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  static updateQuantity(productId: string, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated'));
      }
    }
  }

  static clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }

  static getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  static getCartItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  }
}