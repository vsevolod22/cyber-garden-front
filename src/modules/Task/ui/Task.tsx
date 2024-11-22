import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Calendar } from '@/shared/ui/calendar';
import { AlarmClock, Calendar as CalendarIcon, Flag } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import { CommandCalendar } from '@/widgets/Command';
import { TaskComboBox } from './TaskComboBox';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface TaskProps {
   className?: string;
}

export const Task = ({ className }: TaskProps) => {
   return (
      <div className='mt-14 flex flex-col gap-8'>
         <h1 className='text-4xl font-bold'>Входящие</h1>
         <Card className='px-0 pb-0'>
            <CardHeader className='flex flex-col gap-4 pb-0'>
               <CardTitle className='h-5'>Добавить задачу</CardTitle>
               <Textarea className='my-4 border-none' placeholder='Название задачи' />
               <Textarea className='border-none' placeholder='Описание задачи' />
               <div className='flex gap-2'>
                  <TaskCommand svg={<CalendarIcon className='mr-2 w-4' />} text='Срок'>
                     <Calendar />
                  </TaskCommand>
                  <TaskCommand svg={<Flag className='mr-2 w-4' />} text='Приоритет'>
                     <Calendar />
                  </TaskCommand>
                  <TaskCommand svg={<AlarmClock className='mr-2 w-4' />} text='Напоминания'>
                     <CommandCalendar />
                  </TaskCommand>
               </div>
            </CardHeader>
            <CardFooter className='flex h-12 justify-between border-t'>
               <TaskComboBox />
               <div className='mr-5 flex gap-2'>
                  <Button className='h-8 bg-red-500 hover:bg-red-400'>Отмена</Button>
                  <Button disabled className='h-8'>
                     Добавить задачу
                  </Button>
               </div>
            </CardFooter>
         </Card>
      </div>
   );
};
