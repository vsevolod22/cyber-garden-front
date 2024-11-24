import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag, Plus } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import { TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { useState } from 'react';
import { Title } from '@/shared/ui/title';
import { Task } from './Task';

interface CurrentTaskCardProps {
   className?: string;
}

interface Flag {
   flag: React.ReactNode;
   id: number;
   priority: string;
}

const flags: Flag[] = [
   { id: 1, flag: <Flag className='mr-2 w-4' />, priority: 'Приоритет' },
   { id: 2, flag: <Flag className='mr-2 w-4 fill-red-600' />, priority: 'Высокий' },
   { id: 3, flag: <Flag className='mr-2 w-4 fill-yellow-400' />, priority: 'Средний' },
   { id: 4, flag: <Flag className='mr-2 w-4 fill-blue-600' />, priority: 'Низкий' },
];

const projects = [
   { label: 'Учёба 📚', value: '1' },
   { label: 'Работа 💼', value: '2' },
];

export const CurrentTaskCard = ({ className }: CurrentTaskCardProps) => {
   const [currentFlag, setCurrentFlag] = useState<Flag>(flags[0]);
   const [subTasks, setSubTasks] = useState<string[]>([]); // Состояние для хранения подзадач
   const [isAddingSubTask, setIsAddingSubTask] = useState<boolean>(false);

   const handleFlagSelect = (selectedFlag: Flag) => {
      setCurrentFlag(selectedFlag);
   };

   const handleAddSubTask = () => {
      setIsAddingSubTask(true);
   };

   const handleSaveSubTask = (taskName: string) => {
      if (taskName.trim()) {
         setSubTasks([...subTasks, taskName]);
      }
      setIsAddingSubTask(false);
   };

   const handleCancelSubTask = () => {
      setIsAddingSubTask(false);
   };

   return (
      <Card className='flex px-0 pb-0'>
         <CardHeader className='ml-4 mt-3 flex flex-wrap justify-between border-b p-0 sm:h-10 lg:h-10'>Учеба 📚</CardHeader>
         <CardContent className='flex gap-4 pb-0 pt-0'>
            <div className='flex flex-1 flex-col gap-4 pb-0 pt-0'>
               <h2 className='text-xl'>Выйграть хакатон</h2>
               <Textarea className='border-none' placeholder='Описание задачи' />
               <div className='mt-4'>
                  {subTasks.map((subTask, index) => (
                     <div key={index} className='mb-2 flex items-center gap-2'>
                        <span>{subTask}</span>
                     </div>
                  ))}
               </div>
               {isAddingSubTask ? (
                  <Task setButtonClick={(taskName: string) => handleSaveSubTask(taskName)} onCancel={handleCancelSubTask} />
               ) : (
                  <Button
                     className='my-4 flex h-10 w-full justify-start text-base font-medium'
                     variant='ghost'
                     onClick={handleAddSubTask}
                  >
                     <div className='flex gap-2'>
                        <Plus className='text-primary' />
                        Добавить подзадачу
                     </div>
                  </Button>
               )}
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
         <CardFooter className='flex flex-wrap items-center justify-between border-t sm:h-32 lg:h-20'></CardFooter>
      </Card>
   );
};
