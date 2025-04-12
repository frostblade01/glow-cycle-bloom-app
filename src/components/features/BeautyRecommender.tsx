
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Heart, Star, Filter, Sparkles } from 'lucide-react';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  ingredients: string[];
  tags: string[];
  isCleanBeauty: boolean;
  isCrueltyFree: boolean;
  image: string;
}

export const BeautyRecommender: React.FC = () => {
  const { currentPhase } = useCycle();
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [cleanBeautyOnly, setCleanBeautyOnly] = useState(false);
  const [crueltyFreeOnly, setCrueltyFreeOnly] = useState(false);
  
  // Placeholder product data
  const products: Product[] = [
    {
      id: '1',
      name: 'Gentle Hydration Cleanser',
      brand: 'GlowCycle',
      description: 'A soothing, non-stripping formula with ceramides and hyaluronic acid.',
      price: 24,
      rating: 4.8,
      category: 'Cleanser',
      ingredients: ['Water', 'Glycerin', 'Ceramide NP', 'Hyaluronic Acid'],
      tags: ['Fragrance-free', 'Gentle', 'Hydrating'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Brightening Vitamin C Serum',
      brand: 'GlowCycle',
      description: 'Antioxidant protection with 15% vitamin C and ferulic acid.',
      price: 42,
      rating: 4.7,
      category: 'Serum',
      ingredients: ['Water', 'Ascorbic Acid', 'Ferulic Acid', 'Vitamin E'],
      tags: ['Brightening', 'Antioxidant', 'Morning use'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Oil Control Treatment',
      brand: 'GlowCycle',
      description: 'Prevents breakouts with 2% salicylic acid and niacinamide.',
      price: 26,
      rating: 4.6,
      category: 'Treatment',
      ingredients: ['Water', 'Salicylic Acid', 'Niacinamide', 'Zinc PCA'],
      tags: ['Oil-control', 'Anti-acne', 'Nighttime use'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1611080541925-9f974a168121?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '4',
      name: 'Calming Recovery Mask',
      brand: 'GlowCycle',
      description: 'Reduces redness and irritation with centella asiatica.',
      price: 32,
      rating: 4.6,
      category: 'Mask',
      ingredients: ['Water', 'Centella Asiatica Extract', 'Aloe Vera', 'Ceramides'],
      tags: ['Anti-inflammatory', 'Soothing', 'Weekly use'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&h=300&auto=format&fit=crop',
    },
  ];
  
  // Different product categories
  const categories = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Treatment', 'Mask'];
  
  // Get phase-specific product recommendations
  const getPhaseRecommendations = () => {
    let recommendedProducts = products;
    
    // In a real app, filter based on current phase
    switch (currentPhase) {
      case CyclePhase.MENSTRUATION:
        return products.filter(p => 
          p.tags.some(tag => ['Gentle', 'Hydrating', 'Soothing'].includes(tag))
        );
      case CyclePhase.FOLLICULAR:
        return products.filter(p => 
          p.tags.some(tag => ['Brightening', 'Antioxidant', 'Exfoliating'].includes(tag))
        );
      case CyclePhase.OVULATION:
        return products.filter(p => 
          p.tags.some(tag => ['Hydrating', 'Antioxidant', 'Glowing'].includes(tag))
        );
      case CyclePhase.LUTEAL:
        return products.filter(p => 
          p.tags.some(tag => ['Oil-control', 'Anti-acne', 'Purifying'].includes(tag))
        );
      default:
        return products;
    }
  };
  
  // Apply filters to the products
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Clean beauty filter
    if (cleanBeautyOnly && !product.isCleanBeauty) {
      return false;
    }
    
    // Cruelty-free filter
    if (crueltyFreeOnly && !product.isCrueltyFree) {
      return false;
    }
    
    return true;
  });
  
  // Get recommended products for current phase
  const recommendedProducts = getPhaseRecommendations();
  
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full" 
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 rounded-full">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline">{product.category}</Badge>
          <div className="flex items-center mt-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs ml-1 font-medium">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-medium line-clamp-1">{product.name}</h3>
        <p className="text-sm mt-1 font-medium">${product.price}</p>
        <div className="flex gap-1 mt-2 flex-wrap">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 bg-muted text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Beauty Recommender
          </CardTitle>
          <CardDescription>
            Find skincare products tailored to your cycle phase and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recommended">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="browse">Browse All</TabsTrigger>
              <TabsTrigger value="filters">Filters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-glow-purple-500" />
                <h3 className="font-medium">Recommended for your {currentPhase} phase</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {recommendedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="browse" className="space-y-4">
              <div className="flex overflow-x-auto pb-2 mb-4">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "flex-shrink-0 mr-2",
                      category === 'All' && "bg-glow-purple-100 text-glow-purple-700 border-glow-purple-200"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="filters" className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 100]} 
                    max={100} 
                    step={1} 
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Preferences</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="clean-beauty">Clean Beauty Only</Label>
                  <Switch 
                    id="clean-beauty" 
                    checked={cleanBeautyOnly} 
                    onCheckedChange={setCleanBeautyOnly} 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cruelty-free">Cruelty-Free Only</Label>
                  <Switch 
                    id="cruelty-free" 
                    checked={crueltyFreeOnly} 
                    onCheckedChange={setCrueltyFreeOnly} 
                  />
                </div>
              </div>
              
              <Button className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
