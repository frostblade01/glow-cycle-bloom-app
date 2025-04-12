
import React from 'react';
import { useCycle } from '@/context/CycleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell } from 'lucide-react';
import { format, addDays } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'reminder' | 'cycle' | 'skincare';
}

export const UpcomingEvents: React.FC = () => {
  const { 
    currentPhase, 
    nextPeriodStart, 
    nextOvulation,
    lastPeriodStart
  } = useCycle();
  
  // Don't show this component if cycle data isn't set
  if (!lastPeriodStart) {
    return null;
  }

  // Create events based on cycle data
  const today = new Date();
  const upcomingEvents: Event[] = [];
  
  // Add next period if it exists
  if (nextPeriodStart) {
    upcomingEvents.push({
      id: 'next-period',
      title: 'Next Period Starts',
      description: 'Prepare with your essential supplies and self-care items.',
      date: nextPeriodStart,
      type: 'cycle'
    });
  }
  
  // Add next ovulation if it exists
  if (nextOvulation) {
    upcomingEvents.push({
      id: 'next-ovulation',
      title: 'Ovulation Day',
      description: 'Your skin will be at its clearest. Great day for photos!',
      date: nextOvulation,
      type: 'cycle'
    });
  }
  
  // Add skincare reminders based on current phase
  if (currentPhase === 'luteal') {
    upcomingEvents.push({
      id: 'luteal-reminder',
      title: 'Start Acne Prevention',
      description: 'Begin using salicylic acid treatments to prevent PMS breakouts.',
      date: addDays(today, 1),
      type: 'skincare'
    });
  }
  
  if (currentPhase === 'follicular') {
    upcomingEvents.push({
      id: 'follicular-reminder',
      title: 'Exfoliation Day',
      description: 'Great time to use your gentle exfoliant for glowing skin.',
      date: addDays(today, 2),
      type: 'skincare'
    });
  }

  // Sort events by date
  const sortedEvents = upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Get the next 3 events
  const nextEvents = sortedEvents.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Upcoming Reminders
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nextEvents.length > 0 ? (
            nextEvents.map(event => (
              <div key={event.id} className="flex items-start gap-3 py-2">
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="text-xs text-muted-foreground">{format(event.date, 'MMM')}</div>
                  <div className="text-xl font-bold">{format(event.date, 'd')}</div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={
                        event.type === 'cycle' 
                          ? 'bg-glow-pink-50 text-glow-pink-700 border-glow-pink-200' 
                          : 'bg-glow-purple-50 text-glow-purple-700 border-glow-purple-200'
                      }
                    >
                      {event.type === 'cycle' ? 'Cycle' : 'Skincare'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming events</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
