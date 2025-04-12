
import React from 'react';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Droplet, Zap, Sun, Moon, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CyclePhaseInfo: React.FC = () => {
  const { currentPhase, lastPeriodStart } = useCycle();

  if (!lastPeriodStart) {
    return null;
  }

  const phaseInfo = {
    [CyclePhase.MENSTRUATION]: {
      icon: Droplet,
      color: 'text-cycle-menstruation',
      bgColor: 'bg-cycle-menstruation',
      title: 'Menstruation Phase',
      description: 'Your skin may be more sensitive and prone to inflammation.',
      skinTips: [
        'Use gentle, fragrance-free cleansers',
        'Avoid harsh exfoliants',
        'Focus on hydration and soothing ingredients',
        'Treat yourself to a calming mask'
      ],
      avoidIngredients: ['Retinol', 'AHAs/BHAs', 'Benzoyl peroxide'],
      recommendIngredients: ['Ceramides', 'Hyaluronic acid', 'Aloe vera', 'Centella asiatica']
    },
    [CyclePhase.FOLLICULAR]: {
      icon: Sun,
      color: 'text-cycle-follicular',
      bgColor: 'bg-cycle-follicular',
      title: 'Follicular Phase',
      description: 'Your skin is starting to glow with increased estrogen levels.',
      skinTips: [
        'Great time to exfoliate',
        'Add antioxidants to your routine',
        'Incorporate vitamin C products',
        'Hydrate well from inside out'
      ],
      avoidIngredients: ['Heavy occlusives if acne-prone'],
      recommendIngredients: ['Vitamin C', 'Niacinamide', 'Peptides', 'Gentle AHAs']
    },
    [CyclePhase.OVULATION]: {
      icon: Zap,
      color: 'text-cycle-ovulation',
      bgColor: 'bg-cycle-ovulation',
      title: 'Ovulation Phase',
      description: 'Your skin is at its peak condition with high estrogen and testosterone.',
      skinTips: [
        'Perfect time for photos or special events',
        'Make sure to wear SPF as skin is more photosensitive',
        'Stay hydrated',
        'Continue with antioxidant protection'
      ],
      avoidIngredients: ['Excessive oil-stripping products'],
      recommendIngredients: ['SPF', 'Antioxidants', 'Vitamin E', 'Hyaluronic acid']
    },
    [CyclePhase.LUTEAL]: {
      icon: Moon,
      color: 'text-cycle-luteal',
      bgColor: 'bg-cycle-luteal',
      title: 'Luteal Phase',
      description: 'Your skin may become oilier and more prone to breakouts as progesterone rises.',
      skinTips: [
        'Start acne prevention protocol',
        'Use oil-control products',
        'Introduce salicylic acid treatments',
        'Focus on gentle cleansing'
      ],
      avoidIngredients: ['Heavy moisturizers', 'Comedogenic ingredients'],
      recommendIngredients: ['Salicylic acid', 'Tea tree oil', 'Zinc', 'Clay masks']
    },
  };

  const { icon: PhaseIcon, color, bgColor, title, description, skinTips, avoidIngredients, recommendIngredients } = phaseInfo[currentPhase];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <PhaseIcon className={cn("h-5 w-5", color)} />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        
        <Alert className="bg-glow-purple-50 border-glow-purple-200">
          <AlertDescription className="flex items-center gap-2">
            <MoveRight className="h-4 w-4 text-glow-purple-500" />
            <span className="font-medium text-glow-purple-700">Time to adjust your skincare routine</span>
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Skincare Tips:</h4>
            <ul className="space-y-1">
              {skinTips.map((tip, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5", bgColor)} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Recommended Ingredients:</h4>
              <ul className="space-y-1">
                {recommendIngredients.map((ingredient, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 text-xs">✓</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Avoid These:</h4>
              <ul className="space-y-1">
                {avoidIngredients.map((ingredient, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-red-500 text-xs">✗</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
