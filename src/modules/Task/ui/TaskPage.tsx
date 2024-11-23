import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag, Plus, User } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import type { ProjectItem } from './TaskComboBox';
import { TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CheckboxTask } from './checkBocks';

interface TaskProps {
   className?: string;
}
interface flag {
   flag: ReactNode;
   id: number;
   priority: string;
}
const flags: flag[] = [
   { id: 1, flag: <Flag className='mr-2 w-4' />, priority: 'Приоритет' },
   { id: 2, flag: <Flag className='mr-2 w-4 fill-red-600' />, priority: 'Высокий' },
   { id: 3, flag: <Flag className='mr-2 w-4 fill-yellow-400' />, priority: 'Средний' },
   { id: 4, flag: <Flag className='mr-2 w-4 fill-blue-600' />, priority: 'Низкий' },
];
const users: ProjectItem[] = [
   {
      label: 'Пользователи',
      value: 'users',
      children: [
         { label: 'Вилков В. В. (240303vilkov@gmail.com)', value: 'Вилков В. В. (240303vilkov@gmail.com)' },
         { label: 'Рутины 🌀', value: 'Рутины' },
         { label: 'Вдохновение ✨', value: 'Вдохновение' },
      ],
   },
];

const projects: ProjectItem[] = [
   {
      label: 'Мои проекты',
      value: 'my-projects',
      children: [
         { label: 'Учеба 📚', value: 'Учёба' },
         { label: 'Рутины 🌀', value: 'Рутины' },
         { label: 'Вдохновение ✨', value: 'Вдохновение' },
      ],
   },
];
export const TaskPage = ({ className }: TaskProps) => {
   const [currentFlag, setCurrentFlag] = useState<flag>(flags[0]); // По умолчанию первый элемент

   const handleFlagSelect = (selectedFlag: flag) => {
      setCurrentFlag(selectedFlag);
   };

   return (
      <div className='mt-14 flex flex-col gap-8'>
         <h1 className='text-4xl font-bold'>Сегодня</h1>
         <Card className='px-0 pb-0'>
            <CardHeader className='esmob:px-2 flex flex-col gap-4 pb-0 pt-0'>
               <Textarea className='my-4 h-12 border-none text-xl' placeholder='Название задачи' />
               <Textarea className='h-20 border-none' placeholder='Описание задачи' />
               <div className='flex flex-wrap gap-2'>
                  <DatePicker pickerName='Выберите дату выполнения задания' svg={<CalendarIcon className='mr-2 w-4' />} />
                  <TaskCommand svg={currentFlag.flag} text={currentFlag.priority}>
                     {flags.map((item) => (
                        <DropdownMenuItem key={item.id} className='flex' onClick={() => handleFlagSelect(item)}>
                           {item.flag} {item.priority}
                        </DropdownMenuItem>
                     ))}
                  </TaskCommand>
                  <DatePicker pickerName='Выберите дату напоминаний' svg={<AlarmClock className='mr-2 w-4' />} />
               </div>
            </CardHeader>
            <CardFooter className='es:h-32 esmob:justify-center flex flex-wrap items-center justify-between border-t sm:h-32 lg:h-20'>
               <div className='esmob:ml-0 ml-5 flex flex-wrap gap-2'>
                  <TaskComboBox items={projects} />
                  <TaskComboBox
                     defaultLabel='Пользователь'
                     items={users}
                     placeholder='Выберите пользователя'
                     svg={<User className='w-4' />}
                  />
               </div>

               <div className='es:mx-5 esmob:mx-0 esmob:justify-center flex gap-2 sm:mr-5 md:ml-5 md:mr-5'>
                  <Button className='h-12 bg-red-500 hover:bg-red-400'>Отмена</Button>
                  <Button disabled className='h-12'>
                     Добавить задачу
                  </Button>
               </div>
            </CardFooter>
         </Card>
         <div className='flex flex-col'>
            <div className='text-xl font-bold'>23 ноября · Сегодня · Суббота</div>
            <div>
               <CheckboxTask />
            </div>
            <div className='hover:cursor-pointer'>
               <span className='flex gap-2 text-gray-600'>
                  <Plus className='text-primary' />
                  Добавить задачу
               </span>
            </div>
         </div>
      </div>
   );
};