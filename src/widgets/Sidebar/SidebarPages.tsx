import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';
import { Award, BookMarked, Calendar } from 'lucide-react';

const items = [
   {
      title: 'Сегодня',
      url: '#',
      icon: Calendar,
      isActive: true,
   },
   {
      title: 'Расписание вуза',
      url: '#',
      icon: BookMarked,
   },
   {
      title: 'Достижения',
      url: '#',
      icon: Award,
   },
];

export const SidebarPages = () => {
   return (
      <SidebarMenu>
         {items.map((item) => (
            <SidebarMenuItem key={item.title}>
               <SidebarMenuButton asChild className='px-2.5' {...(item.isActive && { 'data-active': true })}>
                  <a href={item.url}>
                     <item.icon size={16} />
                     <span>{item.title}</span>
                  </a>
               </SidebarMenuButton>
            </SidebarMenuItem>
         ))}
      </SidebarMenu>
   );
};
