import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg)'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Content */}
        <div className="text-center text-white mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Find the perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
              kids furniture
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Discover unique furniture pieces that spark imagination and grow with your child
          </p>
        </div>

        {/* Search Bar - Airbnb Style */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-full shadow-2xl p-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
              {/* Location */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Where</div>
                  <input 
                    type="text" 
                    placeholder="Search destinations" 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                  />
                </div>
                <MapPin className="h-4 w-4 text-gray-400 ml-2" />
              </div>

              {/* Category */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors border-l border-gray-200">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Category</div>
                  <input 
                    type="text" 
                    placeholder="Beds, Desks, Storage..." 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Age Range */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors border-l border-gray-200">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Age</div>
                  <input 
                    type="text" 
                    placeholder="Add age range" 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400"
                  />
                </div>
                <Users className="h-4 w-4 text-gray-400 ml-2" />
              </div>

              {/* Search Button */}
              <div className="flex items-center justify-center">
                <Link href="/products">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {[
            { label: 'Beds & Mattresses', href: '/products?category=beds-mattresses' },
            { label: 'Study Desks', href: '/products?category=desks-chairs' },
            { label: 'Storage Solutions', href: '/products?category=storage-solutions' },
            { label: 'Play Furniture', href: '/products?category=play-furniture' }
          ].map((link) => (
            <Link key={link.label} href={link.href}>
              <Button 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}