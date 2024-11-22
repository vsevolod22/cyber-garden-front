import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { DropdownCommand } from './DropDown';
import { CommandCalendar } from './Command';
import { Calendar } from 'lucide-react';

interface TasksProps {
   className?: string;
}

export const Tasks = ({ className }: TasksProps) => {
   return (
      <div className='mt-14 flex flex-col gap-8'>
         <h1 className='text-4xl font-bold'>Входящие</h1>
         <Card>
            <CardHeader className='flex flex-col gap-4'>
               <CardTitle className='h-5'>Добавить задачу</CardTitle>
               <Textarea placeholder='Название задачи' className='my-4 border-none' />
               <Textarea placeholder='Описание задачи' className='border-none' />
               <div className='flex'>
                  <DropdownCommand svg={<Calendar className='mr-2 w-4' />} text='Срок'>
                     {' '}
                     <CommandCalendar />
                  </DropdownCommand>
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
