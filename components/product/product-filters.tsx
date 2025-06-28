'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Filter } from 'lucide-react';

interface ProductFiltersProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  ageRanges: string[];
  inStock: boolean;
  featured: boolean;
}

export function ProductFilters({ categories, onFiltersChange, isOpen, onClose }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    ageRanges: [],
    inStock: false,
    featured: false,
  });

  const ageRangeOptions = [
    '0-2 years',
    '3-5 years',
    '6-8 years',
    '9-12 years',
    '13+ years'
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceRange: [0, 1000],
      ageRanges: [],
      inStock: false,
      featured: false,
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categorySlug]
      : filters.categories.filter(c => c !== categorySlug);
    updateFilters({ categories: newCategories });
  };

  const handleAgeRangeChange = (ageRange: string, checked: boolean) => {
    const newAgeRanges = checked
      ? [...filters.ageRanges, ageRange]
      : filters.ageRanges.filter(a => a !== ageRange);
    updateFilters({ ageRanges: newAgeRanges });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl lg:relative lg:w-full lg:shadow-none lg:bg-transparent overflow-y-auto">
        <div className="p-6 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Clear Filters */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 hidden lg:block">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>

            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.slug}
                      checked={filters.categories.includes(category.slug)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.slug, checked as boolean)
                      }
                    />
                    <Label htmlFor={category.slug} className="text-sm">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Price Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </CardContent>
            </Card>

            {/* Age Range */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Age Range</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ageRangeOptions.map((ageRange) => (
                  <div key={ageRange} className="flex items-center space-x-2">
                    <Checkbox
                      id={ageRange}
                      checked={filters.ageRanges.includes(ageRange)}
                      onCheckedChange={(checked) => 
                        handleAgeRangeChange(ageRange, checked as boolean)
                      }
                    />
                    <Label htmlFor={ageRange} className="text-sm">
                      {ageRange}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Filters */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Additional Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={filters.inStock}
                    onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
                  />
                  <Label htmlFor="inStock" className="text-sm">
                    In Stock Only
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featured}
                    onCheckedChange={(checked) => updateFilters({ featured: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Featured Products
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}