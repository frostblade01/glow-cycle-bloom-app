
import React, { createContext, useContext, useState, ReactNode } from "react";
import { addDays, format, differenceInDays } from "date-fns";

// Define cycle phases
export enum CyclePhase {
  MENSTRUATION = "menstruation",
  FOLLICULAR = "follicular",
  OVULATION = "ovulation",
  LUTEAL = "luteal",
}

// Interface for the cycle context
interface CycleContextType {
  lastPeriodStart: Date | null;
  lastPeriodEnd: Date | null;
  cycleLength: number;
  periodLength: number;
  currentPhase: CyclePhase;
  currentCycleDay: number;
  nextPeriodStart: Date | null;
  nextOvulation: Date | null;
  setLastPeriodDates: (startDate: Date, endDate: Date) => void;
  getCyclePhaseForDate: (date: Date) => CyclePhase;
}

// Create the cycle context with default values
const CycleContext = createContext<CycleContextType>({
  lastPeriodStart: null,
  lastPeriodEnd: null,
  cycleLength: 28,
  periodLength: 5,
  currentPhase: CyclePhase.FOLLICULAR,
  currentCycleDay: 1,
  nextPeriodStart: null,
  nextOvulation: null,
  setLastPeriodDates: () => {},
  getCyclePhaseForDate: () => CyclePhase.FOLLICULAR,
});

// Export the hook for using the cycle context
export const useCycle = () => useContext(CycleContext);

// Create the provider component
export const CycleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lastPeriodStart, setLastPeriodStart] = useState<Date | null>(null);
  const [lastPeriodEnd, setLastPeriodEnd] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  // Calculate current cycle day, phase, and upcoming events
  const calculateCycleInfo = () => {
    if (!lastPeriodStart) {
      return {
        currentPhase: CyclePhase.FOLLICULAR,
        currentCycleDay: 1,
        nextPeriodStart: null,
        nextOvulation: null,
      };
    }

    const today = new Date();
    const daysSinceLastPeriod = differenceInDays(today, lastPeriodStart);
    const currentCycleDay = (daysSinceLastPeriod % cycleLength) + 1;
    
    // Calculate next period and ovulation
    const daysUntilNextPeriod = cycleLength - ((daysSinceLastPeriod % cycleLength));
    const nextPeriodStart = addDays(today, daysUntilNextPeriod);
    
    // Ovulation typically occurs 14 days before next period
    const nextOvulation = addDays(nextPeriodStart, -14);

    // Determine current phase
    let currentPhase: CyclePhase;
    if (currentCycleDay <= periodLength) {
      currentPhase = CyclePhase.MENSTRUATION;
    } else if (currentCycleDay <= 14) {
      currentPhase = CyclePhase.FOLLICULAR;
    } else if (currentCycleDay <= 16) {
      currentPhase = CyclePhase.OVULATION;
    } else {
      currentPhase = CyclePhase.LUTEAL;
    }

    return {
      currentPhase,
      currentCycleDay,
      nextPeriodStart,
      nextOvulation,
    };
  };

  // Get phase for a specific date
  const getCyclePhaseForDate = (date: Date): CyclePhase => {
    if (!lastPeriodStart) return CyclePhase.FOLLICULAR;

    const daysSinceLastPeriod = differenceInDays(date, lastPeriodStart);
    const cycleDayForDate = (daysSinceLastPeriod % cycleLength) + 1;

    if (cycleDayForDate <= periodLength) {
      return CyclePhase.MENSTRUATION;
    } else if (cycleDayForDate <= 14) {
      return CyclePhase.FOLLICULAR;
    } else if (cycleDayForDate <= 16) {
      return CyclePhase.OVULATION;
    } else {
      return CyclePhase.LUTEAL;
    }
  };

  // Set last period dates
  const setLastPeriodDates = (startDate: Date, endDate: Date) => {
    setLastPeriodStart(startDate);
    setLastPeriodEnd(endDate);
    setPeriodLength(differenceInDays(endDate, startDate) + 1);
  };

  const { currentPhase, currentCycleDay, nextPeriodStart, nextOvulation } = calculateCycleInfo();

  return (
    <CycleContext.Provider
      value={{
        lastPeriodStart,
        lastPeriodEnd,
        cycleLength,
        periodLength,
        currentPhase,
        currentCycleDay,
        nextPeriodStart,
        nextOvulation,
        setLastPeriodDates,
        getCyclePhaseForDate,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
