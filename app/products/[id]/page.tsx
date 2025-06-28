import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { 
  Truck, 
  Shield, 
  RotateCcw, 
  Star, 
  ArrowLeft,
  Share,
  Ruler,
  Users,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { ProductActions } from '@/components/product/product-actions';

// Generate static params for all products
export async function generateStaticParams() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id');
    
    return products?.map((product) => ({
      id: product.id,
    })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function getProduct(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-600">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category?.slug}`} className="hover:text-orange-600">
            {product.category?.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <Image
                src={product.images[0] || '/placeholder-furniture.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                  {product.code_name === 'J001' ? '🌟 New!' : 'Featured'}
                </Badge>
              )}
              {product.code_name === 'J001' && (
                <div className="absolute top-4 right-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Just Added! ✨
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500 font-mono">{product.code_name}</p>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                {product.code_name === 'J001' && (
                  <span className="text-orange-500 text-2xl">✨</span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8) • 124 reviews</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-600">total</span>
              </div>
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About this item</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Age Range</span>
                </div>
                <p className="font-medium">{product.age_range}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Category</span>
                </div>
                <p className="font-medium">{product.category?.name}</p>
              </div>
            </div>

            {/* Dimensions */}
            {product.dimensions && Object.keys(product.dimensions).length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Ruler className="h-4 w-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">Dimensions</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {product.dimensions.length && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500 block">Length</span>
                      <p className="font-medium">{product.dimensions.length}</p>
                    </div>
                  )}
                  {product.dimensions.width && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500 block">Width</span>
                      <p className="font-medium">{product.dimensions.width}</p>
                    </div>
                  )}
                  {product.dimensions.height && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-gray-500 block">Height</span>
                      <p className="font-medium">{product.dimensions.height}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Add to Cart Section - Client Component */}
            <ProductActions product={product} />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-gray-600">On orders over $299</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">2 Year Warranty</p>
                  <p className="text-gray-600">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">30 Day Returns</p>
                  <p className="text-gray-600">Easy returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Safety Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Non-toxic, child-safe materials</li>
                  <li>• Rounded corners and smooth edges</li>
                  <li>• Anti-tip safety mechanisms</li>
                  <li>• CPSC certified for child safety</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Wipe clean with damp cloth</li>
                  <li>• Use mild soap for stubborn stains</li>
                  <li>• Avoid harsh chemicals</li>
                  <li>• Regular tightening of hardware recommended</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}