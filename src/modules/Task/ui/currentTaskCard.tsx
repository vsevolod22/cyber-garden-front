import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';
import { AlarmClock, Calendar as CalendarIcon, Flag as FlagIcon, Plus } from 'lucide-react';
import { TaskCommand } from './TaskCommand';
import { TaskComboBox } from './TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DatePicker } from './DatePicker';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { useTaskStore } from '../model/store/TaskStore';
import { useState, useEffect } from 'react';
import { Title } from '@/shared/ui/title';
import { Input } from '@/shared/ui/input';
import { Task } from './Task';

interface CurrentTaskCardProps {
   className?: string;
}

interface Flag {
   id: number;
   className: string;
   priority: string;
}

const flags: Flag[] = [
   { id: 1, className: 'mr-2 w-4', priority: 'Приоритет' },
   { id: 2, className: 'mr-2 w-4 fill-red-600', priority: 'Высокий' },
   { id: 3, className: 'mr-2 w-4 fill-yellow-400', priority: 'Средний' },
   { id: 4, className: 'mr-2 w-4 fill-blue-600', priority: 'Низкий' },
];

interface Subtask {
   id: number;
   name: string;
   completed: boolean;
}

export const CurrentTaskCard = ({ className }: CurrentTaskCardProps) => {
   const { selectedTaskId, getTaskById, updateTask } = useTaskStore();
   const task = getTaskById(selectedTaskId || 0);
   const [closeSubTuskCreate, setCloseSubTuskCreate] = useState<boolean>(false);
   const [currentFlag, setCurrentFlag] = useState<Flag>(flags[0]);
   const [dueDate, setDueDate] = useState<Date | undefined>();
   const [reminderDate, setReminderDate] = useState<Date | undefined>();
   const [project, setProject] = useState<string | null>(null);
   const [isAddingSubtask, setIsAddingSubtask] = useState(false);
   const [newSubtaskName, setNewSubtaskName] = useState('');

   useEffect(() => {
      if (task) {
         setCurrentFlag(flags.find((flag) => flag.priority === task.priority) || flags[0]);
         setDueDate(task.due_date ? new Date(task.due_date) : undefined);
         setReminderDate(task.reminder_time ? new Date(task.reminder_time) : undefined);
         setProject(task.project_id ? task.project_id.toString() : null);
         setIsAddingSubtask(false);
         setNewSubtaskName('');
      }
   }, [task]);

   const handleFlagSelect = (selectedFlag: Flag) => {
      setCurrentFlag(selectedFlag);
      if (task) {
         updateTask({ ...task, priority: selectedFlag.priority });
      }
   };

   const handleDateChange = (field: 'due_date' | 'reminder_time', date: Date | undefined) => {
      if (task) {
         updateTask({ ...task, [field]: date ? date.toISOString() : null });
      }
   };

   const handleProjectSelect = (value: string) => {
      setProject(value);
      if (task) {
         updateTask({ ...task, project_id: parseInt(value) });
      }
   };

   const handleAddSubtask = () => {
      if (task && newSubtaskName.trim() !== '') {
         const newSubtask: Subtask = {
            id: Date.now(),
            name: newSubtaskName,
            completed: false,
         };
         const updatedTask = {
            ...task,
            subtasks: [...(task.subtasks || []), newSubtask],
         };
         updateTask(updatedTask);
         setNewSubtaskName('');
         setIsAddingSubtask(false);
      }
   };

   if (!task) {
      return <div>Задача не выбрана</div>;
   }

   return (
      <Card className='flex px-0 pb-0'>
         <CardHeader className='ml-4 mt-3 flex flex-wrap justify-between border-b p-0 sm:h-10 lg:h-10'>
            {task.name || 'Название задачи'}
         </CardHeader>
         <CardContent className='flex gap-4 pb-0 pt-0'>
            <div className='flex flex-1 flex-col gap-4 pb-0 pt-0'>
               <h2 className='text-xl'>{task.name}</h2>
               <Textarea
                  className='border-none'
                  value={task.description}
                  placeholder='Описание задачи'
                  onChange={(e) => updateTask({ ...task, description: e.target.value })}
               />
               {task.subtasks && task.subtasks.length > 0 && (
                  <div className='subtasks-list'>
                     {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className='flex items-center'>
                           <input
                              type='checkbox'
                              checked={subtask.is_completed}
                              onChange={() => {
                                 const updatedSubtasks = task.subtasks.map((s) =>
                                    s.id === subtask.id ? { ...s, completed: !s.is_completed } : s,
                                 );
                                 updateTask({ ...task, subtasks: updatedSubtasks });
                              }}
                           />
                           <span className={subtask.is_completed ? 'line-through' : ''}>{subtask.name}</span>
                        </div>
                     ))}
                  </div>
               )}
               {isAddingSubtask ? (
                  <Task setButtonClick={() => setCloseSubTuskCreate(false)} />
               ) : (
                  <Button
                     className='my-4 flex h-10 w-full justify-start text-base font-medium'
                     variant='ghost'
                     onClick={() => setIsAddingSubtask(true)}
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
                  <TaskComboBox
                     btnWidth='h-12'
                     className='w-full'
                     items={[
                        { label: 'Учёба', value: '1' },
                        { label: 'Работа', value: '2' },
                     ]}
                     onSelect={(value) => handleProjectSelect(value)}
                  />
                  <Title className='font-medium' text='Срок' />
                  <DatePicker
                     className='h-12 w-full'
                     pickerName='Выберите дату выполнения задания'
                     selectedDate={dueDate}
                     onDateChange={(date) => handleDateChange('due_date', date)}
                     svg={<CalendarIcon className='mr-2 w-4' />}
                  />
                  <Title className='font-medium' text='Приоритет' />
                  <TaskCommand
                     slot
                     btnWidth='h-12'
                     className='flex w-full justify-between'
                     svg={<FlagIcon className={currentFlag.className} />}
                     text={currentFlag.priority}
                  >
                     {flags.map((item) => (
                        <DropdownMenuItem key={item.id} className='flex' onClick={() => handleFlagSelect(item)}>
                           <FlagIcon className={item.className} /> {item.priority}
                        </DropdownMenuItem>
                     ))}
                  </TaskCommand>
                  <Title className='font-medium' text='Напоминание' />
                  <DatePicker
                     className='h-12 w-full'
                     pickerName='Выберите дату напоминаний'
                     selectedDate={reminderDate}
                     onDateChange={(date) => handleDateChange('reminder_time', date)}
                     svg={<AlarmClock className='mr-2 w-4' />}
                  />
               </div>
            </div>
         </CardContent>
         <CardFooter className='flex flex-wrap items-center justify-between border-t sm:h-32 lg:h-20'></CardFooter>
      </Card>
   );
};
