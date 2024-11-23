import React, { useEffect } from 'react';
import { Plus, X } from 'lucide-react';

import { Checkbox } from '@/shared/ui/checkbox';
import { useTaskStore } from '../model/store/TaskStore';
import { CurrentTaskCard } from './currentTaskCard';
import { CreateTaskModal } from './CreateTaskModal';

// Тип для задачи с вложенными задачами
interface Task {
   id: string;
   title: string;
   subTasks?: Task[];
}

// Пример данных для задач
const tasksData: Task[] = [
   {
      id: 'task1',
      title: 'Выиграть хакатон',
      subTasks: [
         {
            id: 'subtask1',
            title: 'Пройти курс по React',
         },
         {
            id: 'subtask2',

            title: 'Улучшить навык алгоритмов',
         },
      ],
   },
];

// Рекурсивный компонент для отображения задач
const TaskItem: React.FC<{ task: Task; level: number }> = ({ task, level }) => {
   const { taskStates, setTaskChecked } = useTaskStore();
   const isChecked = taskStates[task.id] || false; // Получаем состояние задачи из Zustand

   const handleCheckboxChange = (checked: boolean) => {
      setTaskChecked(task.id, checked); // Обновляем состояние задачи в Zustand
   };

   return (
      <div className={`my-2 ${level === 0 ? 'border-y' : 'border-none'} py-2`}>
         {/* Задача */}
         <div className={`flex h-10 items-center space-x-2`}>
            <Checkbox
               className='h-6 w-6'
               id={task.id}
               checked={isChecked}
               onCheckedChange={handleCheckboxChange} // Передаём обработчик
            />
            <label
               htmlFor={task.id}
               className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
               onClick={(e) => e.preventDefault()} // Предотвращаем действие по умолчанию
            >
               <CreateTaskModal
                  buttonChildren={task.title}
                  buttonClassName='custom-button-class'
                  modalClassName='p-0'
                  overlayClassName='bg-black/15'
                  closeIcon={<X className='h-4 w-4' />}
                  closeClassName='absolute right-2 top-2 rounded-sm'
               >
                  <CurrentTaskCard />
               </CreateTaskModal>
            </label>
         </div>

         {/* Вложенные задачи */}
         {task.subTasks &&
            task.subTasks.map((subTask) => (
               <div key={subTask.id} className='ml-6'>
                  <TaskItem task={subTask} level={level + 1} />
               </div>
            ))}
      </div>
   );
};

// Главный компонент
export function CheckboxTask() {
   const { taskStates, setTaskChecked } = useTaskStore();

   // Инициализация задач в Zustand при загрузке
   useEffect(() => {
      const initializeTasks = (taskList: Task[]) => {
         taskList.forEach((task) => {
            if (!(task.id in taskStates)) {
               setTaskChecked(task.id, false); // Устанавливаем начальное состояние для каждой задачи
            }
            if (task.subTasks) {
               initializeTasks(task.subTasks); // Рекурсивно инициализируем подзадачи
            }
         });
      };
      initializeTasks(tasksData);
   }, [setTaskChecked, taskStates]);

   return (
      <div>
         {tasksData.map((task) => (
            <TaskItem key={task.id} task={task} level={0} />
         ))}
      </div>
   );
}
