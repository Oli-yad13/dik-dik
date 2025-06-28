'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/supabase';
import { CartManager } from '@/lib/cart';
import { ShoppingCart, Heart, Plus, Minus, CheckCircle } from 'lucide-react';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    CartManager.addToCart(product, quantity);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="font-medium text-gray-900">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-gray-50 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl"
          onClick={handleAddToCart}
          disabled={!product.in_stock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="px-6"
          onClick={toggleWishlist}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>

      {product.in_stock && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">In stock and ready to ship</span>
        </div>
      )}
    </div>
  );
}