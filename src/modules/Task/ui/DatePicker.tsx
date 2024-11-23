import * as React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/utils/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';

interface DatePickerProps {
   pickerName: string;
   svg?: React.ReactNode;
}

export function DatePicker({ pickerName, svg }: DatePickerProps) {
   const [date, setDate] = React.useState<Date>();

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant={'outline'}
               className={cn(
                  'flex h-8 min-w-[200px] justify-start gap-2 text-left font-normal',
                  !date && 'text-muted-foreground',
               )}
            >
               {svg}
               {date ? format(date, 'PPP', { locale: ru }) : <span>{pickerName}</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-auto p-0' align='start'>
            <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
         </PopoverContent>
      </Popover>
   );
}
