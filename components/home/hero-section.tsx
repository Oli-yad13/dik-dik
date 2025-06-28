import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Users, MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function HeroSection() {
  return (
    <section className="relative bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Find the perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              kids furniture
            </span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-gray-600">
            Discover unique furniture pieces that spark imagination and grow with your child
          </p>
        </div>

        {/* Search Bar - Airbnb Style */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
              {/* Where */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors group">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Where</div>
                  <input 
                    type="text" 
                    placeholder="Search destinations" 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors group border-l border-gray-200">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Category</div>
                  <input 
                    type="text" 
                    placeholder="Beds, Desks, Storage..." 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Age Range */}
              <div className="flex items-center px-6 py-4 rounded-full hover:bg-gray-50 cursor-pointer transition-colors group border-l border-gray-200">
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-1">Age</div>
                  <input 
                    type="text" 
                    placeholder="Add age range" 
                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 font-medium"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-center justify-center p-2">
                <Link href="/products">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Tabs - Airbnb Style */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'Beds & Mattresses', href: '/products?category=beds-mattresses', icon: '🛏️' },
            { label: 'Study Desks', href: '/products?category=desks-chairs', icon: '📚' },
            { label: 'Storage Solutions', href: '/products?category=storage-solutions', icon: '📦' },
            { label: 'Play Furniture', href: '/products?category=play-furniture', icon: '🎮' },
            { label: 'Wardrobes', href: '/products?category=wardrobes', icon: '👕' },
            { label: 'ECCE Solutions', href: '/products?category=ecce', icon: '🏫' }
          ].map((link) => (
            <Link key={link.label} href={link.href}>
              <Button 
                variant="outline" 
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 rounded-full px-6 py-3 font-medium"
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}