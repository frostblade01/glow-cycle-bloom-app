
import React from 'react';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductRecommendation {
  id: string;
  name: string;
  type: string;
  description: string;
  rating: number;
  price: string;
  tags: string[];
}

export const SkinRecommendations: React.FC = () => {
  const { currentPhase, lastPeriodStart } = useCycle();

  if (!lastPeriodStart) {
    return null;
  }

  // Phase-specific product recommendations
  const phaseRecommendations: Record<CyclePhase, ProductRecommendation[]> = {
    [CyclePhase.MENSTRUATION]: [
      {
        id: '1',
        name: 'Gentle Hydration Cleanser',
        type: 'Cleanser',
        description: 'Soothing, non-stripping formula with ceramides',
        rating: 4.8,
        price: '$24',
        tags: ['Fragrance-free', 'Gentle', 'Hydrating']
      },
      {
        id: '2',
        name: 'Calming Recovery Mask',
        type: 'Mask',
        description: 'Reduces redness and irritation with centella',
        rating: 4.6,
        price: '$32',
        tags: ['Anti-inflammatory', 'Soothing', 'Weekly use']
      }
    ],
    [CyclePhase.FOLLICULAR]: [
      {
        id: '3',
        name: 'Brightening Vitamin C Serum',
        type: 'Serum',
        description: 'Antioxidant protection with 15% vitamin C',
        rating: 4.7,
        price: '$42',
        tags: ['Brightening', 'Antioxidant', 'Morning use']
      },
      {
        id: '4',
        name: 'Gentle Exfoliating Toner',
        type: 'Toner',
        description: 'Smooth skin with PHA technology',
        rating: 4.5,
        price: '$28',
        tags: ['Exfoliating', 'Hydrating', 'Daily use']
      }
    ],
    [CyclePhase.OVULATION]: [
      {
        id: '5',
        name: 'Glowing Hydration Essence',
        type: 'Essence',
        description: 'Plumping formula with 5 types of hyaluronic acid',
        rating: 4.9,
        price: '$38',
        tags: ['Hydrating', 'Glowing', 'Twice daily']
      },
      {
        id: '6',
        name: 'Invisible Shield SPF 50',
        type: 'Sunscreen',
        description: 'Weightless protection for sensitive skin',
        rating: 4.7,
        price: '$34',
        tags: ['Broad spectrum', 'Oil-free', 'Daily protection']
      }
    ],
    [CyclePhase.LUTEAL]: [
      {
        id: '7',
        name: 'Oil Control Treatment',
        type: 'Treatment',
        description: 'Prevents breakouts with 2% salicylic acid',
        rating: 4.6,
        price: '$26',
        tags: ['Oil-control', 'Anti-acne', 'Nighttime use']
      },
      {
        id: '8',
        name: 'Pore Clearing Clay Mask',
        type: 'Mask',
        description: 'Detoxifies skin with kaolin and zinc',
        rating: 4.8,
        price: '$30',
        tags: ['Purifying', 'Pore-minimizing', 'Weekly use']
      }
    ]
  };

  const currentRecommendations = phaseRecommendations[currentPhase];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Phase-Specific Products
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRecommendations.map(product => (
            <div key={product.id} className="flex flex-col space-y-2 bg-background rounded-lg p-3 border">
              <div className="flex justify-between">
                <Badge variant="outline" className="bg-glow-purple-50 text-glow-purple-700 border-glow-purple-200">
                  {product.type}
                </Badge>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs ml-1">{product.rating}</span>
                </div>
              </div>
              
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              
              <div className="flex gap-1 flex-wrap">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-muted text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium">{product.price}</span>
                <Button size="sm" variant="outline" className="h-8">
                  View Details
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full">
            See more recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
