import * as React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarRail } from '@/shared/ui/sidebar';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { SidebarProfile } from './SidebarItems/SidebarProfile';
import { SidebarPages } from './SidebarPages';
import { SidebarAccordeon } from './SidebarAccordeon';
import { CreateModal } from '@/modules/Task/ui/CreateTaskModal';
import { Task } from '@/modules/Task/ui/Task';

export function SidebarLayout({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar {...props}>
         <SidebarHeader>
            <Link className='flex items-center gap-[10px] border-border px-5 py-3' to='/'>
               <span className='text-2xl'>
                  <strong>bigas</strong> <span className='font-light'>production</span>
               </span>
            </Link>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarProfile />
               <SidebarGroupContent>
                  <CreateModal
                     buttonText='Добавить задачу'
                     buttonIcon={<Plus className='rounded-full bg-primary text-background' size={24} />}
                     buttonClassName='custom-button-class'
                     modalClassName='p-0'
                     overlayClassName='bg-black/15'
                     closeIcon={<X className='h-4 w-4' />}
                     closeClassName='absolute right-2 top-2 rounded-sm'
                  >
                     <Task />
                  </CreateModal>
               </SidebarGroupContent>
               <SidebarGroupContent>
                  <SidebarPages />
               </SidebarGroupContent>
               <SidebarGroupContent>
                  <SidebarAccordeon />
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}
