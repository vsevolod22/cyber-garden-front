import { Bell } from 'lucide-react';

import { SidebarGroupContent, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';
import { SidebarProfileMenubar } from './SidebarProfileMenubar';

export const SidebarProfile = () => {
   return (
      <SidebarGroupContent>
         <div className='flex list-none'>
            <SidebarProfileMenubar />
            <SidebarMenuItem>
               {/* Уведомления */}
               <SidebarMenuButton asChild className='relative h-10 cursor-pointer px-2.5'>
                  <div>
                     <Bell size={24} />
                     <p className='absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-medium text-black'>
                        3
                     </p>
                  </div>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </div>
      </SidebarGroupContent>
   );
};
