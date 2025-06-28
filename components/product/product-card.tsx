'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/supabase';
import { CartManager } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    CartManager.addToCart(product);
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="group bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden p-6">
          <div className="flex gap-6">
            <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl">
              <Image
                src={product.images[0] || '/placeholder-furniture.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                <Heart className="h-4 w-4 text-gray-700" />
              </button>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">{product.code_name}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-current text-gray-900" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              
              <p className="text-gray-600 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Age: {product.age_range}</span>
                <span>•</span>
                <span>{product.category?.name}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-sm text-gray-600">total</span>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl">
          <Image
            src={product.images[0] || '/placeholder-furniture.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
            <Heart className="h-4 w-4 text-gray-700" />
          </button>
          {product.featured && (
            <div className="absolute top-3 left-3 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              Featured
            </div>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-3 py-1 rounded-full font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-current text-gray-900" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-1">{product.category?.name}</p>
          <p className="text-sm text-gray-500">{product.age_range}</p>
          
          <div className="flex items-center space-x-1 pt-1">
            <span className="font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-600">total</span>
          </div>
        </div>
      </div>
    </Link>
  );
}