
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
  
  // Enhanced product data with more options and better images
  const products: Product[] = [
    // Menstruation Phase Products
    {
      id: '1',
      name: 'Gentle Hydration Cleanser',
      brand: 'CLOVE',
      description: 'A soothing, non-stripping formula with ceramides and hyaluronic acid.',
      price: 24,
      rating: 4.8,
      category: 'Cleanser',
      ingredients: ['Water', 'Glycerin', 'Ceramide NP', 'Hyaluronic Acid'],
      tags: ['Fragrance-free', 'Gentle', 'Hydrating', 'Soothing'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Calming Recovery Mask',
      brand: 'CLOVE',
      description: 'Reduces redness and irritation with centella asiatica.',
      price: 32,
      rating: 4.6,
      category: 'Mask',
      ingredients: ['Water', 'Centella Asiatica Extract', 'Aloe Vera', 'Ceramides'],
      tags: ['Anti-inflammatory', 'Soothing', 'Weekly use', 'Gentle'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '3',
      name: 'Ultra Sensitive Moisturizer',
      brand: 'CLOVE',
      description: 'Formulated for sensitive skin with minimal ingredients.',
      price: 28,
      rating: 4.7,
      category: 'Moisturizer',
      ingredients: ['Water', 'Squalane', 'Ceramides', 'Shea Butter'],
      tags: ['Fragrance-free', 'Gentle', 'Hydrating', 'Soothing'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/en5gE-rx3dFVICVOU7cNoxpsahS7oXOR3YrAxkzUpQw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFmWnJMc29ZUUwu/anBn',
    },
    
    // Follicular Phase Products
    {
      id: '4',
      name: 'Brightening Vitamin C Serum',
      brand: 'CLOVE',
      description: 'Antioxidant protection with 15% vitamin C and ferulic acid.',
      price: 42,
      rating: 4.7,
      category: 'Serum',
      ingredients: ['Water', 'Ascorbic Acid', 'Ferulic Acid', 'Vitamin E'],
      tags: ['Brightening', 'Antioxidant', 'Morning use', 'Exfoliating'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Gentle Exfoliating Toner',
      brand: 'CLOVE',
      description: 'Smooth skin with polyhydroxy acid technology.',
      price: 28,
      rating: 4.5,
      category: 'Toner',
      ingredients: ['Water', 'Gluconolactone', 'Niacinamide', 'Aloe Vera'],
      tags: ['Exfoliating', 'Hydrating', 'Daily use', 'Brightening'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/5-5LEO5w5yzuX6zW2L187NSM0bth2fTTslazlyszYxU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbnVh/LmNvbS9jZG4vc2hv/cC9maWxlcy9hbnVh/LXRvbmVyLTE1MG1s/LWJoYS0yLWdlbnRs/ZS1leGZvbGlhdGlu/Zy10b25lci00NDEw/NTQ1ODY0NzMxOC5q/cGc_dj0xNzEyMDI4/OTMxJndpZHRoPTEw/ODA',
    },
    {
      id: '6',
      name: 'Daily Glow Moisturizer',
      brand: 'CLOVE',
      description: 'Lightweight formula with peptides and vitamin C.',
      price: 36,
      rating: 4.6,
      category: 'Moisturizer',
      ingredients: ['Water', 'Peptides', 'Vitamin C', 'Hyaluronic Acid'],
      tags: ['Brightening', 'Antioxidant', 'Morning use', 'Lightweight'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/U0KTxRnLjRYWAzLjTeDFNeGUiY1E36rB8CZs41Xt97o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vU2hl/YU1vaXN0dXJlLURh/aWx5LUh5ZHJhdGlv/bi1HbG93LVByaW1p/bmctTW9pc3R1cml6/ZXItMTAwLVZpcmdp/bi1Db2NvbnV0LU9p/bC0yLW96XzVhMDMx/NzI4LTM4OGMtNDA4/Zi1iNDFiLTcxNzg5/ZWUwMzQ4NC5kNDA0/ZjU3N2M4NmE1NTY5/MjVmMWJhYjlkODNh/MTJjOS5qcGVnP29k/bkhlaWdodD01ODAm/b2RuV2lkdGg9NTgw/Jm9kbkJnPUZGRkZG/Rg',
    },
    
    // Ovulation Phase Products
    {
      id: '7',
      name: 'Glowing Hydration Essence',
      brand: 'CLOVE',
      description: 'Plumping formula with 5 types of hyaluronic acid.',
      price: 38,
      rating: 4.9,
      category: 'Essence',
      ingredients: ['Water', 'Multiple Hyaluronic Acids', 'Beta-Glucan', 'Glycerin'],
      tags: ['Hydrating', 'Glowing', 'Twice daily', 'Plumping'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '8',
      name: 'Invisible Shield SPF 50',
      brand: 'CLOVE',
      description: 'Weightless protection for sensitive skin.',
      price: 34,
      rating: 4.7,
      category: 'Sunscreen',
      ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide', 'Squalane'],
      tags: ['Broad spectrum', 'Oil-free', 'Daily protection', 'Glowing'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/NcEdzC2cGUR1AJA1BYHMryuY0MgMqi2d1r-XNZRzoME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nbG9z/c2llci1wcm9kLmlt/Z2l4Lm5ldC9maWxl/cy9nbG9zc2llci1z/a2luY2FyZS1zcGYt/Y2Fyb3VzZWwtMDEu/cG5nP2F1dG89Y29t/cHJlc3MsZm9ybWF0/JmNzPXNyZ2Imdz17/d2lkdGh9',
    },
    {
      id: '9',
      name: 'Dewy Finish Setting Spray',
      brand: 'CLOVE',
      description: 'Locks in skincare and makeup with a radiant finish.',
      price: 26,
      rating: 4.6,
      category: 'Setting Spray',
      ingredients: ['Water', 'Glycerin', 'Aloe Vera', 'Niacinamide'],
      tags: ['Hydrating', 'Glowing', 'Daily use', 'Radiant'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/v91fONX1WT1gx_M7am8I_JtZE10hhtNjjDQl7LCncZ8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMS5w/ZXJmdW1lc2NsdWIu/Y29tL2dyYW5kZS8x/MTkxMDIuanBn',
    },
    
    // Luteal Phase Products
    {
      id: '10',
      name: 'Oil Control Treatment',
      brand: 'CLOVE',
      description: 'Prevents breakouts with 2% salicylic acid and niacinamide.',
      price: 26,
      rating: 4.6,
      category: 'Treatment',
      ingredients: ['Water', 'Salicylic Acid', 'Niacinamide', 'Zinc PCA'],
      tags: ['Oil-control', 'Anti-acne', 'Nighttime use', 'Purifying'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/642CtYn9zv604LfWvP9n3ZZLqqnu-c8igimrhRdsim0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGVybXN0b3JlLmNv/bS9pbWFnZXM_dXJs/PWh0dHBzOi8vc3Rh/dGljLnRoY2RuLmNv/bS9wcm9kdWN0aW1n/L29yaWdpbmFsLzE0/MjkzNTAxLTM0MjUw/NDAzMTU2MTg5NjMu/anBnJmZvcm1hdD13/ZWJwJmF1dG89YXZp/ZiZ3aWR0aD05ODUm/aGVpZ2h0PTk4NSZm/aXQ9Y292ZXI.jpeg',
    },
    {
      id: '11',
      name: 'Pore Clearing Clay Mask',
      brand: 'CLOVE',
      description: 'Detoxifies skin with kaolin and zinc.',
      price: 30,
      rating: 4.8,
      category: 'Mask',
      ingredients: ['Kaolin Clay', 'Zinc Oxide', 'Tea Tree Oil', 'Niacinamide'],
      tags: ['Purifying', 'Pore-minimizing', 'Weekly use', 'Oil-control'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=300&h=300&auto=format&fit=crop',
    },
    {
      id: '12',
      name: 'Balancing Gel Moisturizer',
      brand: 'CLOVE',
      description: 'Oil-free hydration with prebiotics to balance skin.',
      price: 32,
      rating: 4.7,
      category: 'Moisturizer',
      ingredients: ['Water', 'Prebiotics', 'Niacinamide', 'Aloe Vera'],
      tags: ['Oil-control', 'Balancing', 'Lightweight', 'Purifying'],
      isCleanBeauty: true,
      isCrueltyFree: true,
      image: 'https://imgs.search.brave.com/teODD0bvxnPLRqh_124MQA3X_8o975q89nS57T92Qd0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/b21vcm92aWN6YS5j/b20vY2RuL3Nob3Av/ZmlsZXMvQmFsYW5j/aW5nLW1vaXN0dXJp/c2VyX2M3ZDZlMjVi/LTZlMTgtNGJmZS1h/YzBiLTMxNTAxMzky/NWFkZC5wbmc_dj0x/NzA2MjAyMDA2Jndp/ZHRoPTIwMDA',
    },
  ];
  
  // Different product categories
  const categories = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Treatment', 'Mask', 'Toner', 'Sunscreen', 'Essence'];
  
  // Get phase-specific product recommendations based on current phase
  const getPhaseRecommendations = () => {
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
