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
import { SidebarAddProject } from './SidebarAddProject';

const projectItems = [
   { label: 'Хакатон 🤯', value: 'Учёба' },
   { label: 'Школа 👻', value: 'Рутины' },
   { label: 'Домашние заботы 🧸', value: 'Вдохновение' },
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
   return (
      <Accordion collapsible type='single'>
         <AccordionItem className='border-none' value='item-1'>
            <AccordionTrigger className='px-2.5 py-2'>
               <div className='mr-1 flex flex-1 justify-between'>
                  <div className='flex items-center gap-2 font-normal'>
                     <LayoutGrid size={16} />
                     Проекты
                  </div>

                  <SidebarAddProject />
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
