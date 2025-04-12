
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
  image: string;
}

export const SkinRecommendations: React.FC = () => {
  const { currentPhase, lastPeriodStart } = useCycle();

  if (!lastPeriodStart) {
    return null;
  }

  // Phase-specific product recommendations with matching images
  const phaseRecommendations: Record<CyclePhase, ProductRecommendation[]> = {
    [CyclePhase.MENSTRUATION]: [
      {
        id: '1',
        name: 'Gentle Hydration Cleanser',
        type: 'Cleanser',
        description: 'Soothing, non-stripping formula with ceramides',
        rating: 4.8,
        price: '$24',
        tags: ['Fragrance-free', 'Gentle', 'Hydrating'],
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=300&h=300&auto=format&fit=crop'
      },
      {
        id: '2',
        name: 'Calming Recovery Mask',
        type: 'Mask',
        description: 'Reduces redness and irritation with centella',
        rating: 4.6,
        price: '$32',
        tags: ['Anti-inflammatory', 'Soothing', 'Weekly use'],
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=300&h=300&auto=format&fit=crop'
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
        tags: ['Brightening', 'Antioxidant', 'Morning use'],
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&h=300&auto=format&fit=crop'
      },
      {
        id: '4',
        name: 'Gentle Exfoliating Toner',
        type: 'Toner',
        description: 'Smooth skin with PHA technology',
        rating: 4.5,
        price: '$28',
        tags: ['Exfoliating', 'Hydrating', 'Daily use'],
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160beba3?q=80&w=300&h=300&auto=format&fit=crop'
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
        tags: ['Hydrating', 'Glowing', 'Twice daily'],
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&h=300&auto=format&fit=crop'
      },
      {
        id: '6',
        name: 'Invisible Shield SPF 50',
        type: 'Sunscreen',
        description: 'Weightless protection for sensitive skin',
        rating: 4.7,
        price: '$34',
        tags: ['Broad spectrum', 'Oil-free', 'Daily protection'],
        image: 'https://images.unsplash.com/photo-1607697552816-67d419064d5f?q=80&w=300&h=300&auto=format&fit=crop'
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
        tags: ['Oil-control', 'Anti-acne', 'Nighttime use'],
        image: 'https://images.unsplash.com/photo-1611080541925-9f974a168121?q=80&w=300&h=300&auto=format&fit=crop'
      },
      {
        id: '8',
        name: 'Pore Clearing Clay Mask',
        type: 'Mask',
        description: 'Detoxifies skin with kaolin and zinc',
        rating: 4.8,
        price: '$30',
        tags: ['Purifying', 'Pore-minimizing', 'Weekly use'],
        image: 'https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=300&h=300&auto=format&fit=crop'
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
              
              <div className="flex gap-3">
                <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  
                  <div className="flex gap-1 flex-wrap mt-1">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-muted text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
