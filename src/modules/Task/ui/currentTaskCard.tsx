import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag, Plus, User, X } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import type { ProjectItem } from './TaskComboBox';
import { TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { CreateTaskModal } from './CreateTaskModal';
import { Task } from './Task';
import { Title } from '@/shared/ui/title';

interface currentTaskCardProps {
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
export const CurrentTaskCard = ({ className }: currentTaskCardProps) => {
   const [currentFlag, setCurrentFlag] = useState<flag>(flags[0]); // По умолчанию первый элемент
   const [closeSubTuskCreate, setCloseSubTuskCreate] = useState<boolean>(false);

   const handleFlagSelect = (selectedFlag: flag) => {
      setCurrentFlag(selectedFlag);
   };

   return (
      <Card className='flex px-0 pb-0'>
         <CardHeader className='ml-4 mt-3 flex flex-wrap justify-between border-b p-0 sm:h-10 lg:h-10 es:h-10 esmob:justify-center'>
            Учеба 📚
         </CardHeader>
         <CardContent className='flex gap-4 pb-0 pt-0 esmob:px-2'>
            <div className='flex flex-1 flex-col gap-4 pb-0 pt-0 esmob:px-2'>
               <h2 className='text-xl'>Выйграть хакатон</h2>
               <div>Описание задачи</div>
               {closeSubTuskCreate ? (
                  <Task setButtonClick={() => setCloseSubTuskCreate(false)} />
               ) : (
                  <Button
                     className={'my-4 flex h-10 w-full justify-start text-base font-medium'}
                     variant='ghost'
                     onClick={() => setCloseSubTuskCreate(true)}
                  >
                     <div className='flex gap-2'>
                        <Plus className='text-primary' />
                        Добавить подазадачу
                     </div>
                  </Button>
               )}
               <div className='flex flex-wrap gap-2'>{/* Вот тут логика работы с комментариями */}</div>
            </div>
            <div className='min-w-80 rounded-lg bg-accent p-4'>
               <div className='flex w-full min-w-72 flex-col gap-3'>
                  <Title className='font-medium' text='Проект' />
                  <TaskComboBox btnWidth='h-12' className='w-full' items={projects} />
                  <Title className='font-medium' text='Срок' />
                  <DatePicker
                     className='h-12 w-full'
                     pickerName='Выберите дату выполнения задания'
                     svg={<CalendarIcon className='mr-2 w-4' />}
                  />
                  <Title className='font-medium' text='Приоритет' />
                  <TaskCommand
                     slot
                     btnWidth='h-12'
                     className='flex w-full justify-between'
                     svg={currentFlag.flag}
                     text={currentFlag.priority}
                  >
                     {flags.map((item) => (
                        <DropdownMenuItem key={item.id} className='flex' onClick={() => handleFlagSelect(item)}>
                           {item.flag} {item.priority}
                        </DropdownMenuItem>
                     ))}
                  </TaskCommand>
                  <Title className='font-medium' text='Напоминание' />
                  <DatePicker
                     className='h-12 w-full'
                     pickerName='Выберите дату напоминаний'
                     svg={<AlarmClock className='mr-2 w-4' />}
                  />
               </div>
            </div>
         </CardContent>
         <CardFooter className='flex flex-wrap items-center justify-between border-t sm:h-32 lg:h-20 es:h-32 esmob:justify-center'></CardFooter>
      </Card>
   );
};
