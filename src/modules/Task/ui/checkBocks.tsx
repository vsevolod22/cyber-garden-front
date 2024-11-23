import React from 'react';
import { Plus, X } from 'lucide-react';
import { CreateModal } from '@/modules/Task/ui/CreateTaskModal';
import { Checkbox } from '@/shared/ui/checkbox';
import { useTaskStore } from '../model/store/TaskStore';

// Тип для задачи с вложенными задачами
interface Task {
   id: string;
   title: string;
   isChecked: boolean;
   subTasks?: Task[];
}

// Пример данных для задач
const tasks: Task[] = [
   {
      id: 'task1',
      title: 'Выиграть хакатон',
      isChecked: false,
      subTasks: [
         {
            id: 'subtask1',
            title: 'Пройти курс по React',
            isChecked: false,
         },
         {
            id: 'subtask2',
            title: 'Улучшить навык алгоритмов',
            isChecked: false,
         },
      ],
   },
];

// Рекурсивный компонент для отображения задач
const TaskItem: React.FC<{ task: Task; level: number }> = ({ task, level }) => {
   const { tasks, setTaskChecked } = useTaskStore();
   const isChecked = tasks[task.id] || task.isChecked;

   const handleCheckboxChange = (checked: boolean) => {
      setTaskChecked(task.id, checked);
   };

   return (
      <div className='my-2'>
         {/* Задача */}
         <div className={`flex items-center space-x-2 border-y py-2`}>
            <Checkbox className='h-6 w-6' id={task.id} checked={isChecked} onCheckedChange={handleCheckboxChange} />
            <label
               htmlFor={task.id}
               className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
               onClick={(e) => e.preventDefault()}
            >
               <CreateModal
                  buttonText={task.title}
                  buttonClassName='custom-button-class'
                  modalClassName='p-0'
                  overlayClassName='bg-black/15'
                  closeIcon={<X className='h-4 w-4' />}
                  closeClassName='absolute right-2 top-2 rounded-sm'
               >
                  <div className='p-4'>
                     <h2 className='text-xl font-bold'>Детали задачи</h2>
                     <p>Здесь вы можете добавить подробности о задаче.</p>
                  </div>
               </CreateModal>
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
   return (
      <div>
         {tasks.map((task) => (
            <TaskItem key={task.id} task={task} level={0} />
         ))}
      </div>
   );
}
