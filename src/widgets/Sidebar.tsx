import * as React from 'react';
import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from '@/shared/ui/sidebar';
import { Link } from 'react-router-dom';
import { Calendar, Home, Inbox, LayoutGrid, Plus, Search, Settings } from 'lucide-react';
import { Button } from '@/shared/ui/button';

// This is sample data.
const items = [
   {
      title: 'Поиск',
      url: '#',
      icon: Search,
   },
   {
      title: 'Входящие',
      url: '#',
      icon: Inbox,
   },
   {
      title: 'Сегодня',
      url: '#',
      icon: Calendar,
   },
   {
      title: 'Фильтры и метки',
      url: '#',
      icon: LayoutGrid,
   },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
               {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
               <SidebarGroupContent>
                  <Button
                     className='flex h-10 w-full justify-start font-bold'
                     prefix={<Plus className='rounded-full bg-primary text-background' size={'16'} />}
                     variant={'ghost'}
                  >
                     Добавить задачу
                  </Button>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild className='px-2.5'>
                              <a href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </a>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}
