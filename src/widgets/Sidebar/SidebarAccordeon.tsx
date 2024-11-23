import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { EllipsisIcon, LayoutGrid, Plus, User, X } from 'lucide-react';
import { SidebarAddProject } from './SidebarAddProject';

import { useFetchProjectsByWorkspace } from '@/modules/projects/api/GetUserProjectsApi';
import { useDeleteProject } from '@/modules/projects/api/DeleteProjectApi';
import { Skeleton } from '@/shared/ui/skeleton';

// const projectItems = [
//    { label: 'Хакатон 🤯', value: 'Учёба' },
//    { label: 'Школа 👻', value: 'Рутины' },
//    { label: 'Домашние заботы 🧸', value: 'Вдохновение' },
// ];

export const SidebarAccordeon = () => {
   const { data: projects, isSuccess, isLoading: isProjectsLoading } = useFetchProjectsByWorkspace();
   const deleteProjectMutation = useDeleteProject();
   const isDeleting = deleteProjectMutation.status === 'pending'; // Состояние мутации

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
               {/* Скелетоны отображаются при загрузке данных проектов или удалении */}
               {isDeleting && (
                  <div className='flex w-full flex-col gap-[2px]'>
                     {Array.from({ length: !projects ? 8 : projects.length }, (_, index) => (
                        <Skeleton key={index} className='h-8 w-full' />
                     ))}
                  </div>
               )}
               {/* Отображение списка проектов после успешной загрузки */}
               {isSuccess &&
                  !isDeleting &&
                  !isProjectsLoading &&
                  projects.map((item) => (
                     <DropdownMenu key={item.id}>
                        <div className='group/item relative flex cursor-pointer justify-between rounded-[4px] bg-sidebar px-2 py-1.5 hover:bg-sidebar-accent'>
                           <p className='peer'>{item.name}</p>

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
                                 <span className='text-red-500' onClick={() => deleteProjectMutation.mutate(item.id)}>
                                    Удалить
                                 </span>
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
