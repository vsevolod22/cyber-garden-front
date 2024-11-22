import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

import { Calendar } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import { CommandCalendar } from '@/widgets/Command';

interface TaskProps {
   className?: string;
}

export const Task = ({ className }: TaskProps) => {
   return (
      <div className='mt-14 flex flex-col gap-8'>
         <h1 className='text-4xl font-bold'>Входящие</h1>
         <Card>
            <CardHeader className='flex flex-col gap-4'>
               <CardTitle className='h-5'>Добавить задачу</CardTitle>
               <Textarea className='my-4 border-none' placeholder='Название задачи' />
               <Textarea className='border-none' placeholder='Описание задачи' />
               <div className='flex'>
                  <TaskCommand svg={<Calendar className='mr-2 w-4' />} text='Срок'>
                     <CommandCalendar />
                  </TaskCommand>
               </div>
            </CardHeader>
            <CardContent className='flex'></CardContent>
            <CardFooter>
               <p>Card Footer</p>
            </CardFooter>
         </Card>
      </div>
   );
};
