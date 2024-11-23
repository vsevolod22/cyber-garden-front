import { Card, CardFooter, CardHeader } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag, User } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import type { ProjectItem } from './TaskComboBox';
import { TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface TaskProps {
   className?: string;
   setButtonClick?: (close: boolean) => void;
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
         { label: 'Макарычев И.И. (makar@gmail.com)', value: 'Макарычев И.И. (makar@gmail.com)' },
         { label: 'Марков А.П. (markov@gmail.com)', value: 'Марков А.П. (markov@gmail.com)' },
      ],
   },
];

const projects: ProjectItem[] = [
   {
      label: 'Мои проекты',
      value: 'my-projects',
      children: [
         { label: 'Хакатон 🤯', value: 'Учёба' },
         { label: 'Школа 👻', value: 'Рутины' },
         { label: 'Домашние заботы 🧸', value: 'Вдохновение' },
      ],
   },
];
export const Task = ({ className, setButtonClick }: TaskProps) => {
   const [currentFlag, setCurrentFlag] = useState<flag>(flags[0]); // По умолчанию первый элемент

   const handleFlagSelect = (selectedFlag: flag) => {
      setCurrentFlag(selectedFlag);
   };

   return (
      <Card className='px-0 pb-0'>
         <CardHeader className='flex gap-4 pb-0 pt-0 md:flex-col esmob:px-2'>
            <Textarea className='my-4 h-12 border-none text-xl' placeholder='Название задачи' />
            <Textarea className='h-20 border-none' placeholder='Описание задачи' />
            <div className='flex flex-wrap gap-2'>
               <DatePicker pickerName='Выберите дату выполнения задачи' svg={<CalendarIcon className='mr-2 w-4' />} />
               <TaskCommand svg={currentFlag.flag} text={currentFlag.priority}>
                  {flags.map((item) => (
                     <DropdownMenuItem key={item.id} className='flex' onClick={() => handleFlagSelect(item)}>
                        {item.flag} {item.priority}
                     </DropdownMenuItem>
                  ))}
               </TaskCommand>
               <DatePicker pickerName='Выберите дату напоминания' svg={<AlarmClock className='mr-2 w-4' />} />
            </div>
         </CardHeader>
         <CardFooter className='lg:h-22 flex flex-wrap items-center justify-between gap-4 border-t py-3 esmob:justify-center'>
            <div className='ml-5 flex flex-wrap gap-2 esmob:ml-0'>
               <TaskComboBox items={projects} />
               <TaskComboBox
                  defaultLabel='Исполнитель'
                  items={users}
                  placeholder='Выберите пользователя'
                  svg={<User className='w-4' />}
               />
            </div>

            <div className='flex gap-2 sm:mr-5 md:ml-5 md:mr-5 es:mx-5 esmob:mx-0 esmob:justify-center'>
               <Button variant={'ghost'} onClick={setButtonClick ? () => setButtonClick(false) : undefined}>
                  Отмена
               </Button>
               <Button disabled>Добавить задачу</Button>
            </div>
         </CardFooter>
      </Card>
   );
};
