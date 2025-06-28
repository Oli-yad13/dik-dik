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
          {/* Product Images Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
              <Image
                src={product.images[0] || '/placeholder-furniture.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Special Badges */}
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 shadow-lg">
                  {product.code_name === 'J001' ? '🌟 New!' : 'Featured'}
                </Badge>
              )}
              {product.code_name === 'J001' && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  Just Added! ✨
                </div>
              )}
              
              {/* Share Button */}
              <button className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                <Share className="h-4 w-4" />
              </button>
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-orange-300 transition-colors cursor-pointer group"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Product Features Highlight */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
              <h4 className="font-semibold text-gray-900 mb-3">✨ Why Kids Love This</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>🎨 Bright, engaging colors that spark creativity</li>
                <li>🛡️ Child-safe materials and rounded edges</li>
                <li>📏 Perfect size for growing children</li>
                <li>🌟 Durable construction for years of use</li>
              </ul>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">{product.code_name}</p>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                {product.code_name === 'J001' && (
                  <span className="text-orange-500 text-2xl animate-bounce">✨</span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8) • 124 reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900">${product.price}</span>
                <span className="text-lg text-gray-600">total</span>
                {product.code_name === 'J001' && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                    New Low Price!
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Enhanced Product Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About this item</h3>
              <div className="prose prose-sm text-gray-600">
                <p className="leading-relaxed mb-4">{product.description}</p>
                
                {/* Additional details for J001 */}
                {product.code_name === 'J001' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🌈 Special Features:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Ergonomic design supports proper posture</li>
                      <li>• Height-adjustable to grow with your child</li>
                      <li>• Vibrant rainbow colors inspire creativity</li>
                      <li>• Easy-clean surface perfect for art projects</li>
                      <li>• Lightweight yet sturdy construction</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Age Range</span>
                </div>
                <p className="font-medium text-lg">{product.age_range}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Category</span>
                </div>
                <p className="font-medium text-lg">{product.category?.name}</p>
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
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <span className="text-gray-500 block text-xs uppercase tracking-wide">Length</span>
                      <p className="font-bold text-gray-900 text-lg">{product.dimensions.length}</p>
                    </div>
                  )}
                  {product.dimensions.width && (
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <span className="text-gray-500 block text-xs uppercase tracking-wide">Width</span>
                      <p className="font-bold text-gray-900 text-lg">{product.dimensions.width}</p>
                    </div>
                  )}
                  {product.dimensions.height && (
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <span className="text-gray-500 block text-xs uppercase tracking-wide">Height</span>
                      <p className="font-bold text-gray-900 text-lg">{product.dimensions.height}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Add to Cart Section - Client Component */}
            <ProductActions product={product} />

            {/* Trust Indicators */}
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

        {/* Enhanced Additional Information */}
        <div className="mt-16 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Safety Features
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Non-toxic, child-safe materials certified by CPSC</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Rounded corners and smooth edges prevent injuries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Anti-tip safety mechanisms for stability</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Lead-free paint and finishes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-blue-600 mr-2">🧽</span>
                  Care Instructions
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Wipe clean with damp cloth and mild soap</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Avoid harsh chemicals and abrasive cleaners</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Regular tightening of hardware recommended</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Store in dry environment to prevent moisture damage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Assembly Information */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-orange-600 mr-2">🔧</span>
                Assembly & Delivery
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• All necessary hardware and tools</li>
                    <li>• Step-by-step assembly instructions</li>
                    <li>• Safety guidelines and tips</li>
                    <li>• Customer support contact information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Assembly Time:</h4>
                  <p className="text-sm text-gray-600 mb-3">Approximately 30-45 minutes</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">
                      <strong>Pro Tip:</strong> Assembly service available for an additional fee. 
                      Contact us for professional installation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}