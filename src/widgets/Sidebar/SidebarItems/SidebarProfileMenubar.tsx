import { CalendarCheck, ChartNoAxesColumnIncreasing, Settings, User } from 'lucide-react';

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/shared/ui/menubar';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';

export const SidebarProfileMenubar = () => {
   return (
      <Menubar className='h-10 flex-1 border-none bg-sidebar shadow-none hover:bg-accent'>
         <MenubarMenu>
            <MenubarTrigger className='h-10 w-full'>
               <SidebarMenuItem className='flex-1 cursor-pointer'>
                  <SidebarMenuButton asChild className='h-10 p-0'>
                     <div>
                        <User size={24} />
                        <span className='text-base font-medium'>Профиль</span>
                     </div>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </MenubarTrigger>
            <MenubarContent>
               <MenubarItem className='flex cursor-pointer gap-1.5'>
                  <CalendarCheck size={16} />
                  Выполненные задачи
               </MenubarItem>
               <MenubarItem className='flex cursor-pointer gap-1.5'>
                  <ChartNoAxesColumnIncreasing size={16} />
                  Статистика
               </MenubarItem>
               <MenubarItem className='flex cursor-pointer gap-1.5'>
                  <Settings size={16} />
                  Настройки
               </MenubarItem>
               <MenubarItem className='flex cursor-pointer gap-1.5 font-medium text-red-500'>Выйти</MenubarItem>
            </MenubarContent>
         </MenubarMenu>
      </Menubar>
   );
};
