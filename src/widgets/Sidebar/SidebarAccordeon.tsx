import { Task } from '@/modules/Task';
import { CreateTaskModal } from '@/modules/Task/ui/CreateTaskModal';
import type { ProjectItem } from '@/modules/Task/ui/TaskComboBox';
import { TaskComboBox } from '@/modules/Task/ui/TaskComboBox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Ellipsis, EllipsisIcon, LayoutGrid, Plus, User, X } from 'lucide-react';
import { useState } from 'react';

const projectItems = [
   { label: 'Учеба 📚', value: 'Учёба' },
   { label: 'Рутины 🌀', value: 'Рутины' },
   { label: 'Вдохновение ✨', value: 'Вдохновение' },
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

export const SidebarAccordeon = () => {
   const [projectName, setProjectName] = useState('');
   const [isDropdownOpen, setDropdownOpen] = useState(false);

   const handleCreateProject = () => {
      if (projectName.trim()) {
         // Логика создания проекта
         console.log({ projectName });
         setProjectName('');
         setDropdownOpen(false); // Закрываем меню
      }
   };

   return (
      <Accordion collapsible type='single'>
         <AccordionItem className='border-none' value='item-1'>
            <AccordionTrigger className='px-2.5 py-2'>
               <div className='mr-1 flex flex-1 justify-between'>
                  <div className='flex items-center gap-2 font-normal'>
                     <LayoutGrid size={16} />
                     Проекты
                  </div>

                  <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
                     <DropdownMenuTrigger asChild>
                        <Button className='h-5 w-5' size='icon' variant='ghost' onClick={(e) => e.stopPropagation()}>
                           <Plus className='h-5 w-5' />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        align='start'
                        className='w-96 p-4'
                        side='right'
                        onClick={(e) => e.stopPropagation()} // Предотвращение всплытия
                     >
                        <div className='mb-4 flex items-center justify-between'>
                           <h3 className='text-lg font-semibold'>Добавить проект</h3>
                           <Button
                              className='h-5 w-5'
                              size='icon'
                              variant='ghost'
                              onClick={() => setDropdownOpen(false)} // Закрываем меню
                           >
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

                           {/* Поле для добавления пользователей */}
                           <div>
                              <TaskComboBox
                                 defaultLabel='Пользователь'
                                 items={users}
                                 placeholder='Выберите пользователя'
                                 svg={<User className='w-4' />}
                              />
                           </div>

                           {/* Кнопки */}
                           <div className='flex justify-end gap-2'>
                              <Button
                                 variant='ghost'
                                 onClick={() => setDropdownOpen(false)} // Закрываем меню
                              >
                                 Отмена
                              </Button>
                              <Button disabled={!projectName.trim()} variant='default' onClick={handleCreateProject}>
                                 Добавить
                              </Button>
                           </div>
                        </div>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </AccordionTrigger>
            <AccordionContent className='px-2.5 py-2'>
               {projectItems.map((item) => (
                  <DropdownMenu key={item.value}>
                     <div className='group/item relative flex cursor-pointer justify-between rounded-[4px] bg-sidebar px-2 py-1.5 hover:bg-sidebar-accent'>
                        <p className='peer'>{item.label}</p>

                        <DropdownMenuTrigger
                           asChild
                           className='invisible rounded-[4px] bg-sidebar-accent transition-opacity duration-200 hover:bg-sidebar group-hover/item:visible data-[state=open]:visible data-[state=open]:bg-accent'
                        >
                           <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' side='right'>
                           <DropdownMenuItem className='cursor-pointer'>
                              <span>Изменить</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem className='cursor-pointer'>
                              <span className='text-red-500'>Удалить</span>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </div>
                  </DropdownMenu>
               ))}
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   );
};
