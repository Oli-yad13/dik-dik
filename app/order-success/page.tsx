'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (orderId) {
      // Generate a friendly order number from the UUID
      setOrderNumber(`DD-${orderId.slice(-8).toUpperCase()}`);
    }
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-xl font-bold text-orange-600">{orderNumber}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Processing</h3>
              <p className="text-sm text-gray-600">1-2 business days</p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Shipping</h3>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>
            <div className="text-center">
              <Home className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Delivery</h3>
              <p className="text-sm text-gray-600">5-7 business days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">What's Next?</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• You'll receive an email confirmation shortly</li>
          <li>• We'll send you tracking information once your order ships</li>
          <li>• Our team will contact you if we need any additional information</li>
          <li>• Assembly instructions will be included with your furniture</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/products">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="text-center mt-8 text-sm text-gray-600">
        <p>Need help? Contact us at <a href="mailto:hello@dikdik.com" className="text-orange-600 hover:underline">hello@dikdik.com</a> or call 1-800-DIK-DIKS</p>
      </div>
    </div>
  );
}