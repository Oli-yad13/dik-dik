'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Product, supabase } from '@/lib/supabase';
import { Star, Heart, ArrowRight } from 'lucide-react';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('featured', true)
          .eq('in_stock', true)
          .limit(8);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore our collection
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked furniture pieces loved by families worldwide
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" size="lg" className="hidden lg:flex">
              Show all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-square mb-3 overflow-hidden rounded-2xl">
                  <Image
                    src={product.images[0] || '/placeholder-furniture.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-700" />
                  </button>
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{product.category?.name}</p>
                  <p className="text-sm text-gray-500">{product.age_range}</p>
                  
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-600">total</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center lg:hidden">
          <Link href="/products">
            <Button size="lg" variant="outline">
              Show all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}