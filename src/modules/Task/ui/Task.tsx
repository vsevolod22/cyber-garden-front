import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag, Plus, User } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import { ProjectItem, TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { ReactNode, useState } from 'react';
import { CheckboxTask } from './checkBocks';

interface TaskProps {
   className?: string;
}
interface flag {
   id: number;
   flag: ReactNode;
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
export const Task = ({ className }: TaskProps) => {
   const [currentFlag, setCurrentFlag] = useState<flag>(flags[0]); // По умолчанию первый элемент

   const handleFlagSelect = (selectedFlag: flag) => {
      setCurrentFlag(selectedFlag);
   };

   return (
      <div className='mt-14 flex flex-col gap-8'>
         <h1 className='text-4xl font-bold'>Сегодня</h1>
         <Card className='px-0 pb-0'>
            <CardHeader className='flex flex-col gap-4 pb-0 pt-0'>
               <Textarea className='my-4 h-12 border-none text-xl' placeholder='Название задачи' />
               <Textarea className='h-20 border-none' placeholder='Описание задачи' />
               <div className='flex gap-2'>
                  <DatePicker svg={<CalendarIcon className='mr-2 w-4' />} pickerName='Выберите дату выполнения задания' />
                  <TaskCommand svg={currentFlag.flag} text={currentFlag.priority}>
                     {flags.map((item) => (
                        <DropdownMenuItem className='flex' key={item.id} onClick={() => handleFlagSelect(item)}>
                           {item.flag} {item.priority}
                        </DropdownMenuItem>
                     ))}
                  </TaskCommand>
                  <DatePicker svg={<AlarmClock className='mr-2 w-4' />} pickerName='Выберите дату напоминаний' />
               </div>
            </CardHeader>
            <CardFooter className='flex h-20 items-center justify-between border-t'>
               <div className='ml-5 flex gap-2'>
                  <TaskComboBox items={projects} />
                  <TaskComboBox
                     items={users}
                     placeholder='Выберите пользователя'
                     defaultLabel='Пользователь'
                     svg={<User className='w-4' />}
                  />
               </div>

               <div className='mr-5 flex gap-2'>
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
