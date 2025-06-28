'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartItem, CartManager } from '@/lib/cart';
import { supabase } from '@/lib/supabase';
import { CreditCard, Truck, Shield, ArrowLeft, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'santim'>('card');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'Ethiopia'
  });

  useEffect(() => {
    const items = CartManager.getCart();
    setCartItems(items);
    
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const total = CartManager.getCartTotal();
      const totalWithTax = total * 1.08;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          shipping_address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country
          },
          total_amount: totalWithTax,
          status: 'confirmed'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      CartManager.clearCart();
      
      // Redirect to success page
      router.push(`/order-success?orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = CartManager.getCartTotal();
  const tax = total * 0.08;
  const finalTotal = total + tax;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/cart" className="flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-orange-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Phone Number *</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="+251 9XX XXX XXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Addis Ababa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Region *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Addis Ababa"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Postal Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-orange-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('santim')}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        paymentMethod === 'santim' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-6 w-6 text-orange-600" />
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">Santim Pay</div>
                          <div className="text-sm text-gray-600">Mobile payment</div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">Credit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard</div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'santim' ? (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <Smartphone className="h-5 w-5 text-orange-600 mr-2" />
                        <span className="font-semibold text-orange-800">Pay with Santim</span>
                      </div>
                      <p className="text-sm text-orange-700 mb-3">
                        You will be redirected to Santim Pay to complete your payment securely.
                      </p>
                      <div className="space-y-2 text-sm text-orange-700">
                        <div>• Fast and secure mobile payment</div>
                        <div>• No card details required</div>
                        <div>• Instant confirmation</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-800">
                          This is a demo checkout. No actual payment will be processed.
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            disabled
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              disabled
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              disabled
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg sticky top-32">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

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
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl"
                >
                  {loading ? 'Processing...' : paymentMethod === 'santim' ? 'Pay with Santim' : 'Place Order'}
                </Button>

                <div className="grid grid-cols-3 gap-4 pt-4 text-center text-xs text-gray-500">
                  <div className="flex flex-col items-center">
                    <Truck className="h-4 w-4 text-green-600 mb-1" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield className="h-4 w-4 text-blue-600 mb-1" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CreditCard className="h-4 w-4 text-purple-600 mb-1" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}