import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Leaf, Users, Award, Truck } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every piece of furniture is rigorously tested to meet and exceed safety standards for children.'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'We pour our hearts into every design, creating furniture that sparks joy and imagination.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Sustainable materials and responsible manufacturing practices for a better tomorrow.'
    },
    {
      icon: Users,
      title: 'Family Focused',
      description: 'Designed by parents, for parents. We understand what families need.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Families' },
    { number: '500+', label: 'Products Designed' },
    { number: '15+', label: 'Years Experience' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Dik Dik</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 font-semibold">Tiny Furniture, Big Imagination</span>
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We believe every child deserves a space where their imagination can run wild. 
          Since 2009, we've been crafting magical furniture that grows with your little ones.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Dik Dik was born from a simple observation: children's furniture was either too boring or too fragile. 
              As parents ourselves, we knew there had to be a better way.
            </p>
            <p>
              We started in a small workshop, designing pieces that could withstand the energy of childhood while 
              inspiring creativity and wonder. Every curve, every color, every detail is thoughtfully crafted to 
              create furniture that children love and parents trust.
            </p>
            <p>
              Today, we're proud to be in homes across the country, helping families create spaces where memories 
              are made and dreams take flight. Our motto says it all: <em>Tiny Furniture, Big Imagination</em>.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/6969850/pexels-photo-6969850.jpeg"
            alt="Children playing in a beautifully designed room"
            className="rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do, from design to delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">By the Numbers</h2>
          <p className="text-gray-600">Our impact in the world of children's furniture</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          A passionate group of designers, engineers, and parents working together to create magical spaces for children.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
            { name: 'Mike Chen', role: 'Head of Design', image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg' },
            { name: 'Emma Davis', role: 'Safety Engineer', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' }
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Awards</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-orange-600" />
            <span className="font-medium">GREENGUARD Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="font-medium">CPSC Compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-medium">FSC Certified Wood</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-6 w-6 text-purple-600" />
            <span className="font-medium">Carbon Neutral Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}