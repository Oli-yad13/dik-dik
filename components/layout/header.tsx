'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X, Search, Globe, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartManager } from '@/lib/cart';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(CartManager.getCartItemCount());
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'All Products', href: '/products' },
    { name: 'Beds & Mattresses', href: '/products?category=beds-mattresses' },
    { name: 'Desks & Chairs', href: '/products?category=desks-chairs' },
    { name: 'Storage', href: '/products?category=storage-solutions' },
    { name: 'Play Furniture', href: '/products?category=play-furniture' },
    { name: 'Wardrobes', href: '/products?category=wardrobes' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-sm border-b border-gray-100' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-16 h-8">
              <Image
                src="/dik dik.svg"
                alt="Dik Dik"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Center Search - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="w-full relative">
              <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex-1 px-6 py-3">
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-500"
                  />
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full mr-1 hover:from-orange-600 hover:to-pink-600 transition-colors">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mr-4">
              <Link href="/products">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full px-4 py-2 font-medium">
                  Browse
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full px-4 py-2 font-medium">
                  About
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full px-4 py-2 font-medium">
                  Contact
                </Button>
              </Link>
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full p-3">
              <Heart className="h-5 w-5" />
            </Button>
            
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full p-3">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu - Airbnb Style */}
            <div className="hidden sm:flex items-center space-x-2 border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow cursor-pointer ml-2">
              <Menu className="h-4 w-4 text-gray-700 ml-2" />
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden rounded-full p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            {/* Mobile Search */}
            <div className="px-4 py-4 border-b">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full">
                <div className="flex-1 px-4 py-3">
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    className="w-full text-sm bg-transparent border-none outline-none placeholder-gray-500"
                  />
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full mr-1">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2">
                <Link
                  href="/about"
                  className="block px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}