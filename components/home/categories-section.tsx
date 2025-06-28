'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category, supabase } from '@/lib/supabase';

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Child-friendly category images with bright, colorful photos showing kids
  const categoryImages = {
    'beds-mattresses': 'https://images.pexels.com/photos/6969850/pexels-photo-6969850.jpeg',
    'desks-chairs': 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
    'storage-solutions': 'https://images.pexels.com/photos/6969852/pexels-photo-6969852.jpeg',
    'play-furniture': 'https://images.pexels.com/photos/6969853/pexels-photo-6969853.jpeg',
    'wardrobes': 'https://images.pexels.com/photos/6969854/pexels-photo-6969854.jpeg'
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully curated collections
          </p>
        </div>

        {/* Categories Grid - Child-friendly Design */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3 shadow-sm hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-200">
                  <Image
                    src={categoryImages[category.slug as keyof typeof categoryImages] || category.image_url}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Playful Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-900 shadow-sm">
                      {category.name.split(' ')[0]} 🎨
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{category.name}</h3>
                    <p className="text-sm text-gray-100 line-clamp-2 max-w-xs drop-shadow">
                      {category.description}
                    </p>
                    
                    {/* Fun Call-to-Action */}
                    <div className="mt-3 inline-flex items-center text-sm font-semibold text-orange-300 group-hover:text-orange-200 transition-colors">
                      Explore now 
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ECCE Solutions Banner - More Child-Focused */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 lg:p-12 border border-orange-100">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🏫</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Professional Solutions
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Early Childhood Care & Education
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Transform learning spaces with our complete ECCE furniture solutions. 
                From colorful classroom setups to safe playground equipment - we create environments where children thrive!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <span className="text-xl">🎨</span>
                  <span className="text-sm font-medium text-gray-700">Custom classroom designs</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <span className="text-xl">📏</span>
                  <span className="text-sm font-medium text-gray-700">Age-appropriate sizing</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <span className="text-xl">🔧</span>
                  <span className="text-sm font-medium text-gray-700">Professional installation</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 rounded-lg p-3">
                  <span className="text-xl">🛡️</span>
                  <span className="text-sm font-medium text-gray-700">Safety certified</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  Get Custom Quote 🚀
                </button>
              </Link>
            </div>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
                alt="Bright and colorful ECCE classroom with children learning"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"></div>
              
              {/* Floating Elements for Visual Interest */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <span className="text-xl">✨</span>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <span className="text-xl">🌈</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}