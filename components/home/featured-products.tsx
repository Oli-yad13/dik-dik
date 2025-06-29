'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Product, supabase } from '@/lib/supabase';
import { Star, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
          .order('code_name', { ascending: true }) // This will put J001 and K001 first
          .limit(12);

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
        {/* Section Header - Airbnb Style */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore our collection
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked furniture pieces loved by families worldwide
            </p>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <button className="p-2 border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 border border-gray-300 rounded-full hover:border-gray-400 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
            <Link href="/products">
              <Button variant="outline" size="lg" className="ml-4 rounded-full">
                Show all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Set Highlight */}
        {products.some(p => p.code_name === 'J001') && products.some(p => p.code_name === 'K001') && (
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 mb-12 border border-orange-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✨ Perfect Learning Set</h3>
              <p className="text-gray-600 mb-4">
                Discover our J001 Rainbow Learning Chair paired with the K001 Hardwood Activity Table - 
                the perfect combination for creative learning and play!
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/products?category=desks-chairs">
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full">
                    Shop the Set 🌈
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid - Airbnb Card Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`}>
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
                      {product.code_name === 'J001' ? '🌈 New Chair!' : 
                       product.code_name === 'K001' ? '🪵 New Table!' : 'Featured'}
                    </div>
                  )}
                  {/* Special highlight for J001 and K001 */}
                  {(product.code_name === 'J001' || product.code_name === 'K001') && (
                    <div className="absolute inset-0 ring-2 ring-orange-400 ring-opacity-50 rounded-2xl pointer-events-none"></div>
                  )}
                  {/* Perfect Set Badge */}
                  {(product.code_name === 'J001' || product.code_name === 'K001') && (
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      Perfect Set ✨
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {(product.code_name === 'J001' || product.code_name === 'K001') && (
                        <span className="text-orange-500 text-xs">✨</span>
                      )}
                    </div>
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
          ))}
        </div>

        {/* Mobile Show All Button */}
        <div className="text-center lg:hidden">
          <Link href="/products">
            <Button size="lg" variant="outline" className="rounded-full">
              Show all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}