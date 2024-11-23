import { TaskComboBox } from '@/modules/Task/ui/TaskComboBox';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator } from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Plus, User, X } from 'lucide-react';
import { useState } from 'react';

const usersData = [
   { label: 'Вилков В. В. (240303vilkov@gmail.com)', value: 'Вилков В. В. (240303vilkov@gmail.com)' },
   { label: 'Козлов А. А. (kozlov@example.com)', value: 'Козлов А. А. (kozlov@example.com)' },
   { label: 'Семенова И. И. (semenova@example.com)', value: 'Семенова И. И. (semenova@example.com)' },
];

export const SidebarAddProject = () => {
   const [projectName, setProjectName] = useState('');
   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
   const [isDropdownOpen, setDropdownOpen] = useState(false);

   const handleAddUser = (user: string) => {
      if (!selectedUsers.includes(user)) {
         setSelectedUsers((prev) => [...prev, user]);
      }
   };

   const handleRemoveUser = (user: string) => {
      setSelectedUsers((prev) => prev.filter((u) => u !== user));
   };

   const handleCreateProject = () => {
      if (projectName.trim()) {
         console.log({ projectName, selectedUsers });
         setProjectName('');
         setSelectedUsers([]);
         setDropdownOpen(false);
      }
   };

   return (
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
         <DropdownMenuTrigger asChild>
            <Button className='h-5 w-5' size='icon' variant='ghost' onClick={(e) => e.stopPropagation()}>
               <Plus className='h-5 w-5' />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align='start' className='w-96 p-4' side='right' onClick={(e) => e.stopPropagation()}>
            <div className='mb-4 flex items-center justify-between'>
               <h3 className='text-lg font-semibold'>Добавить проект</h3>
               <Button className='h-5 w-5' size='icon' variant='ghost' onClick={() => setDropdownOpen(false)}>
                  <X className='h-5 w-5' />
               </Button>
            </div>
            <DropdownMenuSeparator />
            <div className='space-y-4'>
               {/* Поле ввода имени проекта */}
               <div>
                  <label className='mb-1 block text-sm font-medium' htmlFor='projectName'>
                     Имя проекта
                  </label>
                  <Input
                     required
                     id='projectName'
                     placeholder='Введите имя проекта'
                     value={projectName}
                     onChange={(e) => setProjectName(e.target.value)}
                  />
               </div>

               {/* Список добавленных пользователей */}
               <TaskComboBox
                  items={[
                     {
                        label: 'Пользователи',
                        value: 'users',
                        children: usersData.map((user) => ({
                           label: user.label,
                           value: user.value,
                        })),
                     },
                  ]}
                  defaultLabel='Пользователь'
                  placeholder='Выберите пользователя'
                  svg={<User className='w-4' />}
                  onSelect={handleAddUser}
               />
               <div className='max-w-[380px] space-y-2'>
                  {selectedUsers.map((user, index) => (
                     <div key={index} className='flex items-center justify-between rounded bg-gray-100 px-3 py-2'>
                        <p className='text-sm'>{user}</p>
                        <Button size='icon' variant='ghost' onClick={() => handleRemoveUser(user)}>
                           <X className='h-4 w-4' />
                        </Button>
                     </div>
                  ))}
               </div>

               {/* Выпадающий список для добавления пользователей */}

               {/* Кнопки действия */}
               <div className='flex justify-end gap-2'>
                  <Button variant='ghost' onClick={() => setDropdownOpen(false)}>
                     Отмена
                  </Button>
                  <Button disabled={!projectName.trim()} variant='default' onClick={handleCreateProject}>
                     Добавить
                  </Button>
               </div>
            </div>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
