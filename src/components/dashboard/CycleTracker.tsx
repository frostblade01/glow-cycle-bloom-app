
import React from 'react';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format, addDays, differenceInDays } from 'date-fns';
import { Droplet, Zap, Sun, Moon } from 'lucide-react';

export const CycleTracker: React.FC = () => {
  const { 
    currentPhase, 
    currentCycleDay, 
    cycleLength, 
    nextPeriodStart,
    nextOvulation,
    lastPeriodStart 
  } = useCycle();

  // If cycle data isn't available, show a placeholder
  if (!lastPeriodStart) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Cycle</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Add your cycle information to see tracking data</p>
        </CardContent>
      </Card>
    );
  }

  // Map phases to icons and colors
  const phaseInfo = {
    [CyclePhase.MENSTRUATION]: { 
      icon: Droplet, 
      color: 'text-cycle-menstruation',
      bgColor: 'bg-cycle-menstruation',
      label: 'Menstruation',
      description: 'Flow phase - time to rest and take care of yourself.'
    },
    [CyclePhase.FOLLICULAR]: { 
      icon: Sun, 
      color: 'text-cycle-follicular',
      bgColor: 'bg-cycle-follicular',
      label: 'Follicular',
      description: 'Dynamic phase - energy is building, skin usually clear.'
    },
    [CyclePhase.OVULATION]: { 
      icon: Zap, 
      color: 'text-cycle-ovulation',
      bgColor: 'bg-cycle-ovulation',
      label: 'Ovulation',
      description: 'Peak energy and glow - your skin is at its best!'
    },
    [CyclePhase.LUTEAL]: { 
      icon: Moon, 
      color: 'text-cycle-luteal',
      bgColor: 'bg-cycle-luteal',
      label: 'Luteal',
      description: 'Wind-down phase - watch for hormonal breakouts.'
    },
  };

  const { icon: PhaseIcon, color, bgColor, label, description } = phaseInfo[currentPhase];

  // Calculate days until next period and ovulation
  const daysUntilPeriod = nextPeriodStart ? differenceInDays(nextPeriodStart, new Date()) : 0;
  const daysUntilOvulation = nextOvulation ? differenceInDays(nextOvulation, new Date()) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Cycle</CardTitle>
          <Badge className={cn("font-normal", bgColor, "text-white")}>
            Day {currentCycleDay}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current phase */}
        <div className="bg-gradient-to-r from-background to-muted rounded-lg p-4 flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", bgColor + "/20")}>
            <PhaseIcon className={cn("h-6 w-6", color)} />
          </div>
          <div>
            <h3 className="font-semibold">Current Phase: {label}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {/* Cycle progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Cycle progress</span>
            <span>{currentCycleDay} of {cycleLength} days</span>
          </div>
          <Progress value={(currentCycleDay / cycleLength) * 100} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>Day 1</span>
            <span>Day {cycleLength}</span>
          </div>
        </div>
        
        {/* Upcoming events */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cycle-menstruation"></div>
              <span className="text-sm">Next period</span>
            </div>
            <span className="text-sm font-medium">
              {nextPeriodStart ? `In ${daysUntilPeriod} days (${format(nextPeriodStart, 'MMM d')})` : 'N/A'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cycle-ovulation"></div>
              <span className="text-sm">Next ovulation</span>
            </div>
            <span className="text-sm font-medium">
              {nextOvulation ? `In ${daysUntilOvulation} days (${format(nextOvulation, 'MMM d')})` : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
