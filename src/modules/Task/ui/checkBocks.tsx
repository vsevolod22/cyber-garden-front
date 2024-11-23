import React, { useEffect } from 'react';
import { Plus, X } from 'lucide-react';

import { Checkbox } from '@/shared/ui/checkbox';
import { useTaskStore } from '../model/store/TaskStore';
import { CurrentTaskCard } from './currentTaskCard';
import { CreateTaskModal } from './CreateTaskModal';

interface Task {
   id: string;
   projectName: string;
   subTasks?: Task[];
   title: string;
}

const tasksData: Task[] = [
   {
      id: 'task1',
      title: 'Выиграть хакатон',
      projectName: 'Учеба 📚',
      subTasks: [
         {
            id: 'subtask1',
            title: 'Пройти курс по React',
            projectName: 'Учеба 📚',
         },
         {
            id: 'subtask2',
            projectName: 'Учеба 📚',
            title: 'Улучшить навык алгоритмов',
         },
      ],
   },
];

const TaskItem: React.FC<{ task: Task; level: number }> = ({ task, level }) => {
   const { taskStates, setTaskChecked } = useTaskStore();
   const isChecked = taskStates[task.id] || false;

   const handleCheckboxChange = (checked: boolean) => {
      setTaskChecked(task.id, checked);
   };

   return (
      <div className={`my-2 ${level === 0 ? 'border-y' : 'border-none'} py-2`}>
         <div className={`relative flex h-10 items-center space-x-2`}>
            <Checkbox checked={isChecked} className='h-6 w-6' id={task.id} onCheckedChange={handleCheckboxChange} />
            <label
               className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
               htmlFor={task.id}
               onClick={(e) => e.preventDefault()}
            >
               <CreateTaskModal
                  buttonChildren={task.title}
                  buttonClassName='custom-button-class'
                  closeClassName='absolute right-2 top-2 rounded-sm'
                  closeIcon={<X className='h-4 w-4' />}
                  modalClassName='p-0'
                  overlayClassName='bg-black/15'
               >
                  <CurrentTaskCard />
               </CreateTaskModal>
            </label>
            <div className='absolute right-3 text-gray-400'>{task.projectName}</div>
         </div>

         {task.subTasks &&
            task.subTasks.map((subTask) => (
               <div key={subTask.id} className='ml-9'>
                  <TaskItem level={level + 1} task={subTask} />
               </div>
            ))}
      </div>
   );
};

export function CheckboxTask() {
   const { taskStates, setTaskChecked } = useTaskStore();

   useEffect(() => {
      const initializeTasks = (taskList: Task[]) => {
         taskList.forEach((task) => {
            if (!(task.id in taskStates)) {
               setTaskChecked(task.id, false);
            }
            if (task.subTasks) {
               initializeTasks(task.subTasks);
            }
         });
      };
      initializeTasks(tasksData);
   }, [setTaskChecked, taskStates]);

   return (
      <div>
         {tasksData.map((task) => (
            <TaskItem key={task.id} level={0} task={task} />
         ))}
      </div>
   );
}
