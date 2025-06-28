import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-8">
                <Image
                  src="/dik dik.svg"
                  alt="Dik Dik"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Dik Dik</span>
                <span className="text-xs text-gray-300 -mt-1">Tiny Furniture, Big Imagination</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Creating magical furniture experiences for children. Safe, stylish, and built to last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/products?category=beds-mattresses" className="text-gray-300 hover:text-white transition-colors">Beds & Mattresses</Link></li>
              <li><Link href="/products?category=desks-chairs" className="text-gray-300 hover:text-white transition-colors">Desks & Chairs</Link></li>
              <li><Link href="/products?category=storage-solutions" className="text-gray-300 hover:text-white transition-colors">Storage Solutions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">1-800-DIK-DIKS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">hello@dikdik.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span className="text-gray-300">123 Furniture Lane, Design City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Dik Dik Kids Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}