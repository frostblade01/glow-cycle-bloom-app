
import React, { createContext, useContext, useState, ReactNode } from "react";
import { addDays, format, differenceInDays, isBefore, isAfter, startOfDay, endOfDay } from "date-fns";

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
  setCycleLength: (length: number) => void;
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
  setCycleLength: () => {},
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

    const today = startOfDay(new Date());
    const periodStartDay = startOfDay(lastPeriodStart);
    
    // Calculate total days since last period start
    const daysSinceLastPeriod = differenceInDays(today, periodStartDay);
    
    // Calculate what day of the cycle we're on (1-based)
    let currentCycleDay: number;
    let nextPeriodStart: Date;
    
    if (daysSinceLastPeriod < 0) {
      // If last period hasn't started yet (should not normally happen)
      currentCycleDay = 1;
      nextPeriodStart = periodStartDay;
    } else if (daysSinceLastPeriod >= cycleLength) {
      // If we're past the expected cycle length
      const completedCycles = Math.floor(daysSinceLastPeriod / cycleLength);
      currentCycleDay = (daysSinceLastPeriod % cycleLength) + 1;
      
      // Calculate when the next period should start
      nextPeriodStart = addDays(periodStartDay, (completedCycles + 1) * cycleLength);
    } else {
      // We're within the current cycle
      currentCycleDay = daysSinceLastPeriod + 1;
      nextPeriodStart = addDays(periodStartDay, cycleLength);
    }
    
    // Ensure we don't go over the cycle length
    if (currentCycleDay > cycleLength) {
      currentCycleDay = currentCycleDay % cycleLength;
      if (currentCycleDay === 0) currentCycleDay = cycleLength;
    }
    
    // Calculate ovulation (typically 14 days before next period)
    const nextOvulation = addDays(nextPeriodStart, -14);
    
    // Determine current phase based on cycle day
    let currentPhase: CyclePhase;
    
    // Fixed phase determination logic
    if (currentCycleDay <= periodLength) {
      currentPhase = CyclePhase.MENSTRUATION;
    } else if (currentCycleDay <= cycleLength - 16) { // Adjusted follicular phase
      currentPhase = CyclePhase.FOLLICULAR;
    } else if (currentCycleDay <= cycleLength - 12) { // Ovulation phase (days ~12-16)
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

    const targetDate = startOfDay(date);
    const periodStartDate = startOfDay(lastPeriodStart);
    
    // If the date is before the last period start, we can't accurately determine the phase
    if (isBefore(targetDate, periodStartDate)) {
      return CyclePhase.FOLLICULAR; // Default to follicular phase
    }
    
    // Calculate days since last period start
    const daysSinceLastPeriod = differenceInDays(targetDate, periodStartDate);
    
    // Calculate which cycle the date falls in
    const cycleNumber = Math.floor(daysSinceLastPeriod / cycleLength);
    
    // Calculate which day of the cycle the date falls on (1-based)
    const cycleDayForDate = (daysSinceLastPeriod % cycleLength) + 1;
    
    // Updated phase determination logic
    if (cycleDayForDate <= periodLength) {
      return CyclePhase.MENSTRUATION;
    } else if (cycleDayForDate <= cycleLength - 16) {
      return CyclePhase.FOLLICULAR;
    } else if (cycleDayForDate <= cycleLength - 12) { // 4-day ovulation window
      return CyclePhase.OVULATION;
    } else {
      return CyclePhase.LUTEAL;
    }
  };

  // Set last period dates
  const setLastPeriodDates = (startDate: Date, endDate: Date) => {
    // Ensure we're working with start of day for consistent calculations
    const start = startOfDay(startDate);
    const end = endOfDay(endDate);
    
    setLastPeriodStart(start);
    setLastPeriodEnd(end);
    
    // Calculate period length (add 1 because both start and end dates are inclusive)
    const calculatedPeriodLength = differenceInDays(end, start) + 1;
    setPeriodLength(calculatedPeriodLength);
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
        setCycleLength,
        getCyclePhaseForDate,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
