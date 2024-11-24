import React, { useEffect } from 'react';
import { Plus, X } from 'lucide-react';

import { Checkbox } from '@/shared/ui/checkbox';
import { useTaskStore } from '../model/store/TaskStore';
import { CurrentTaskCard } from './currentTaskCard';
import { CreateTaskModal } from './CreateTaskModal';
import { useProjectStore } from '@/modules/projects/model/useProjectStore';
import { useFetchTasksByProject } from '@/modules/projects/api/GetProjectTasksApi';

interface Task {
   id: number;
   name: string;
   due_date: string;
   description: string;
   status: string;
   priority: string;
   project_id: number;
   created_by: number;
   assigned_to: number | null;
   is_completed: boolean;
   created_at: string;
   updated_at: string;
}

const TaskItem: React.FC<{ task: Task; level: number }> = ({ task, level }) => {
   const { taskStates, setTaskChecked, updateTask } = useTaskStore();
   const currentProject = useProjectStore((state) => state.currentProject);
   const isChecked = taskStates[task.id] || false;

   const handleCheckboxChange = (checked: boolean) => {
      setTaskChecked(task.id, checked);
      // Обновляем поле is_completed в хранилище задач
      updateTask({ ...task, is_completed: checked });
      // Здесь вы можете добавить вызов мутации для обновления задачи на бэкенде
   };

   return (
      <div className={`my-2 ${level === 0 ? 'border-y' : 'border-none'} py-2`}>
         <div className={`relative flex h-10 items-center space-x-2`}>
            <Checkbox checked={isChecked} className='h-6 w-6' id={`${task.id}`} onCheckedChange={handleCheckboxChange} />
            <label
               className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
               htmlFor={`${task.id}`}
               onClick={(e) => e.preventDefault()}
            >
               <CreateTaskModal
                  buttonChildren={task.name}
                  buttonClassName='custom-button-class'
                  closeClassName='absolute right-2 top-2 rounded-sm'
                  closeIcon={<X className='h-4 w-4' />}
                  modalClassName='p-0'
                  overlayClassName='bg-black/15'
               >
                  <CurrentTaskCard />
               </CreateTaskModal>
            </label>
            <div className='absolute right-3 text-gray-400'>{currentProject?.name}</div>
         </div>

         {/* Если есть подзадачи */}
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
   const { tasks, taskStates, setTaskChecked } = useTaskStore();
   const currentProject = useProjectStore((state) => state.currentProject);

   const projectId = currentProject?.id;

   // Вызываем хук для получения задач по текущему проекту
   const { data: fetchedTasks, isLoading, isError } = useFetchTasksByProject(projectId!);

   // Инициализируем состояния задач
   useEffect(() => {
      const initializeTasks = (taskList: Task[]) => {
         taskList.forEach((task) => {
            if (!(task.id in taskStates)) {
               setTaskChecked(task.id, task.is_completed);
            }
            // Обработка подзадач, если они есть
            if (task.subTasks) {
               initializeTasks(task.subTasks);
            }
         });
      };
      if (tasks && tasks.length > 0) {
         initializeTasks(tasks);
      }
   }, [setTaskChecked, taskStates, tasks]);

   if (isLoading) {
      return <div>Загрузка задач...</div>;
   }

   if (isError) {
      return <div>Ошибка при загрузке задач</div>;
   }

   if (!tasks || tasks.length === 0) {
      return <div>Задачи не найдены</div>;
   }

   return (
      <div>
         {tasks.map((task) => (
            <TaskItem key={task.id} level={0} task={task} />
         ))}
      </div>
   );
}
