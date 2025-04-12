
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { SideNavigation } from '@/components/layout/SideNavigation';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCycle, CyclePhase } from '@/context/CycleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Droplet, Zap, Sun, Moon, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { addDays, format, isToday, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const CyclePredictor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    currentPhase, 
    currentCycleDay, 
    cycleLength, 
    lastPeriodStart, 
    nextPeriodStart, 
    nextOvulation,
    getCyclePhaseForDate 
  } = useCycle();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Redirect if not authenticated
  React.useEffect(() => {
    // Update document title to CLOVE
    document.title = "CLOVE";
    
    if (!user) {
      navigate('/');
    } else if (!user.isOnboarded) {
      navigate('/onboarding');
    }
  }, [user, navigate]);

  const nextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  };
  
  // Generate 6 months of cycle predictions
  const generateCyclePredictions = () => {
    if (!lastPeriodStart || !nextPeriodStart) {
      return [];
    }
    
    const predictions = [];
    let currentPeriodStart = new Date(nextPeriodStart);
    
    for (let i = 0; i < 6; i++) {
      const periodEnd = addDays(currentPeriodStart, 4); // Assuming 5 day period
      predictions.push({
        periodStart: new Date(currentPeriodStart),
        periodEnd: periodEnd,
        ovulation: addDays(currentPeriodStart, -14), // Typically 14 days before next period
      });
      currentPeriodStart = addDays(currentPeriodStart, cycleLength);
    }
    
    return predictions;
  };
  
  const predictions = generateCyclePredictions();
  
  // Custom day cell renderer that works with the DayProps type
  // The renderDay function needs to be updated to fix the TypeScript error
  const renderDay = (date: Date) => {
    // Skip rendering for days outside the current month
    if (!isSameMonth(date, currentMonth)) {
      return null;
    }
    
    const phase = getCyclePhaseForDate(date);
    
    // Determine if this day is a special day (period start, ovulation)
    const isPeriodStart = nextPeriodStart && isSameDay(date, nextPeriodStart);
    const isOvulationDay = nextOvulation && isSameDay(date, nextOvulation);
    const isTodays = isToday(date);
    
    // Map phases to colors
    const phaseColors = {
      [CyclePhase.MENSTRUATION]: "bg-cycle-menstruation",
      [CyclePhase.FOLLICULAR]: "bg-cycle-follicular",
      [CyclePhase.OVULATION]: "bg-cycle-ovulation",
      [CyclePhase.LUTEAL]: "bg-cycle-luteal",
    };
    
    return (
      <div className="relative w-full h-full">
        <div 
          className={`w-full h-full flex items-center justify-center rounded-full
                    ${isTodays ? "font-bold" : ""}
                    ${isPeriodStart || isOvulationDay ? "ring-2 ring-offset-1" : ""}
                    ${isPeriodStart ? "ring-cycle-menstruation" : ""}
                    ${isOvulationDay ? "ring-cycle-ovulation" : ""}
          `}
        >
          {date.getDate()}
        </div>
        <div 
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full 
                    ${phaseColors[phase]}`
          }
        ></div>
      </div>
    );
  };
  
  // Phase information for the legend
  const phaseInfo = [
    { phase: CyclePhase.MENSTRUATION, icon: Droplet, color: 'text-cycle-menstruation', bgColor: 'bg-cycle-menstruation', label: 'Menstruation', days: '1-5' },
    { phase: CyclePhase.FOLLICULAR, icon: Sun, color: 'text-cycle-follicular', bgColor: 'bg-cycle-follicular', label: 'Follicular', days: '6-14' },
    { phase: CyclePhase.OVULATION, icon: Zap, color: 'text-cycle-ovulation', bgColor: 'bg-cycle-ovulation', label: 'Ovulation', days: '14-16' },
    { phase: CyclePhase.LUTEAL, icon: Moon, color: 'text-cycle-luteal', bgColor: 'bg-cycle-luteal', label: 'Luteal', days: '17-28' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <SideNavigation />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="container p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Cycle Predictor</h1>
            <p className="text-muted-foreground">Track and predict your menstrual cycle phases</p>
          </div>
          
          <Tabs defaultValue="calendar">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="predictions">Upcoming Cycles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Cycle Calendar
                    </CardTitle>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {format(currentMonth, 'MMMM yyyy')}
                      </span>
                      <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {lastPeriodStart ? (
                    <>
                      <div className="rounded-lg overflow-hidden">
                        <CalendarComponent
                          mode="single"
                          selected={new Date()}
                          month={currentMonth}
                          onMonthChange={setCurrentMonth}
                          className="border-0"
                          components={{
                            Day: ({ date }) => renderDay(date)
                          }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                        {phaseInfo.map(({ phase, icon: Icon, color, bgColor, label, days }) => (
                          <div key={phase} className="flex items-center gap-2 p-2 rounded-md">
                            <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
                            <div>
                              <p className="text-sm font-medium">{label}</p>
                              <p className="text-xs text-muted-foreground">Days {days}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">
                        Please complete your cycle information to see predictions
                      </p>
                      <Button onClick={() => navigate('/onboarding')}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Enter Cycle Information
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Phase</CardTitle>
                    <CardDescription>
                      Day {currentCycleDay} of your cycle
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const { icon: PhaseIcon, color, bgColor, label } = phaseInfo.find(p => p.phase === currentPhase) || phaseInfo[0];
                        return (
                          <>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor + "/20"}`}>
                              <PhaseIcon className={`h-6 w-6 ${color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{label} Phase</h3>
                              <p className="text-sm text-muted-foreground">
                                {
                                  currentPhase === CyclePhase.MENSTRUATION ? "Your period is here. Take it easy and prioritize self-care." :
                                  currentPhase === CyclePhase.FOLLICULAR ? "Your energy is building. Great time for activity and renewal." :
                                  currentPhase === CyclePhase.OVULATION ? "You're at your most energetic and confident. Skin is at its clearest." :
                                  "Wind-down phase. Watch for breakouts and prioritize gentle skincare."
                                }
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>
                      Your next cycle milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nextPeriodStart && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cycle-menstruation"></div>
                          <span>Next period starts</span>
                        </div>
                        <span className="font-medium">{format(nextPeriodStart, 'MMM d')}</span>
                      </div>
                    )}
                    
                    {nextOvulation && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-cycle-ovulation"></div>
                          <span>Ovulation day</span>
                        </div>
                        <span className="font-medium">{format(nextOvulation, 'MMM d')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="predictions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Predictions</CardTitle>
                  <CardDescription>
                    Your predicted cycles for the next 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions.length > 0 ? (
                    <div className="space-y-6">
                      {predictions.map((prediction, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium text-lg">
                            {format(prediction.periodStart, 'MMMM yyyy')}
                          </h3>
                          <div className="bg-muted rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-cycle-menstruation/20 flex items-center justify-center">
                                <Droplet className="h-5 w-5 text-cycle-menstruation" />
                              </div>
                              <div>
                                <p className="font-medium">Period</p>
                                <p className="text-sm">
                                  {format(prediction.periodStart, 'MMM d')} - {format(prediction.periodEnd, 'MMM d')}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-cycle-ovulation/20 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-cycle-ovulation" />
                              </div>
                              <div>
                                <p className="font-medium">Ovulation</p>
                                <p className="text-sm">
                                  {format(prediction.ovulation, 'MMM d')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">
                        Please complete your cycle information to see predictions
                      </p>
                      <Button onClick={() => navigate('/onboarding')}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Enter Cycle Information
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Alert className="bg-glow-purple-50 border-glow-purple-200">
                <AlertDescription className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-glow-purple-500" />
                  <span>
                    These predictions are estimates based on a standard {cycleLength}-day cycle. 
                    Your actual cycle may vary. The app will adjust predictions as you track more cycles.
                  </span>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CyclePredictor;
