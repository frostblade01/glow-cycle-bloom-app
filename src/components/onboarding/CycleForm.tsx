
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCycle } from '@/context/CycleContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isAfter, isBefore } from 'date-fns';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the minimum date (March 16th, 2024)
const MINIMUM_DATE = new Date(2024, 2, 16); // March is month 2 in JavaScript (0-indexed)

const formSchema = z.object({
  lastPeriodStartDate: z.date({
    required_error: 'Please select your last period start date',
  }),
  lastPeriodEndDate: z.date({
    required_error: 'Please select your last period end date',
  }),
}).refine(data => isAfter(data.lastPeriodEndDate, data.lastPeriodStartDate) || 
  data.lastPeriodEndDate.getTime() === data.lastPeriodStartDate.getTime(), {
  message: "End date must be after or the same as start date",
  path: ["lastPeriodEndDate"],
}).refine(data => !isBefore(data.lastPeriodStartDate, MINIMUM_DATE), {
  message: `Start date cannot be earlier than ${format(MINIMUM_DATE, 'PPP')}`,
  path: ["lastPeriodStartDate"],
});

type FormValues = z.infer<typeof formSchema>;

interface CycleFormProps {
  onComplete?: () => void;
}

export const CycleForm: React.FC<CycleFormProps> = ({ onComplete }) => {
  const { setLastPeriodDates } = useCycle();
  const { completeOnboarding } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastPeriodStartDate: undefined,
      lastPeriodEndDate: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      
      // Save the period dates
      setLastPeriodDates(data.lastPeriodStartDate, data.lastPeriodEndDate);
      
      // Mark onboarding as complete
      completeOnboarding();
      
      toast({
        title: 'Cycle information saved',
        description: 'Your cycle information has been saved successfully.',
      });
      
      if (onComplete) onComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error saving your cycle information. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Tell us about your cycle</h1>
        <p className="text-muted-foreground">This helps us personalize your experience</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-glow-pink-100 to-glow-purple-100 flex items-center justify-center">
          <CalendarIcon className="h-16 w-16 text-glow-purple-400" />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="lastPeriodStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>When did your last period start?</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date > new Date() || 
                        isBefore(date, MINIMUM_DATE)
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the first day of your most recent period (must be after March 16th, 2024).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastPeriodEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>When did your last period end?</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date > new Date() || 
                        (form.getValues().lastPeriodStartDate && date < form.getValues().lastPeriodStartDate)
                      }
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select the last day of your most recent period.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Continue'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
