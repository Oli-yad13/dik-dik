'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem, CartManager } from '@/lib/cart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCart = () => {
      setCartItems(CartManager.getCart());
      setLoading(false);
    };

    updateCart();
    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    CartManager.updateQuantity(productId, newQuantity);
  };

  const removeItem = (productId: string) => {
    CartManager.removeFromCart(productId);
  };

  const total = CartManager.getCartTotal();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Looks like you haven't added any magical furniture to your cart yet.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.product.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0] || '/placeholder-furniture.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors text-lg">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 font-mono mt-1">{item.product.code_name}</p>
                      <p className="text-sm text-gray-600 mt-1">{item.product.category?.name}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <p className="text-xl font-bold text-gray-900">${item.product.price}</p>
                        <span className="text-sm text-gray-600">each</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:text-orange-600 transition-colors">
                          <Heart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg sticky top-32">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total * 1.08).toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Indicators */}
                <div className="pt-4 border-t text-center text-xs text-gray-500 space-y-2">
                  <p>🔒 Secure checkout with SSL encryption</p>
                  <p>📦 Free shipping on orders over $299</p>
                  <p>↩️ 30-day easy returns</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}