import * as React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarRail } from '@/shared/ui/sidebar';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { SidebarProfile } from './SidebarItems/SidebarProfile';
import { SidebarPages } from './SidebarPages';
import { SidebarAccordeon } from './SidebarAccordeon';
import { CreateTaskModal } from '@/modules/Task/ui/CreateTaskModal';

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
                  <CreateTaskModal />
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
