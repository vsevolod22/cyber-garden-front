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
import {
   Award,
   Bell,
   BookMarked,
   Calendar,
   CalendarCheck,
   ChartNoAxesColumnIncreasing,
   Ellipsis,
   LayoutGrid,
   Plus,
   Settings,
   User,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { CommandItem } from 'cmdk';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from '@/shared/ui/menubar';

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

const projectItems = [
   { label: 'Учеба 📚', value: 'Учёба' },
   { label: 'Рутины 🌀', value: 'Рутины' },
   { label: 'Вдохновение ✨', value: 'Вдохновение' },
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
               <SidebarGroupContent>
                  <div className='flex list-none'>
                     <Menubar className='h-10 flex-1 border-none shadow-none hover:bg-[#f4f4f5]'>
                        <MenubarMenu>
                           <MenubarTrigger className='h-10 w-full'>
                              <SidebarMenuItem className='flex-1'>
                                 {/* Профиль */}
                                 <SidebarMenuButton asChild className='h-10 p-0'>
                                    <div>
                                       <User size={24} />
                                       <span className='text-base font-medium'>Профиль</span>
                                    </div>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           </MenubarTrigger>
                           <MenubarContent>
                              <MenubarItem className='flex gap-1.5'>
                                 <CalendarCheck size={16} />
                                 Выполненные задачи
                              </MenubarItem>
                              <MenubarItem className='flex gap-1.5'>
                                 <ChartNoAxesColumnIncreasing size={16} />
                                 Статистика
                              </MenubarItem>
                              <MenubarItem className='flex gap-1.5'>
                                 <Settings size={16} />
                                 Настройки
                              </MenubarItem>
                              <MenubarItem className='flex gap-1.5 font-medium text-red-500'>Выйти</MenubarItem>
                           </MenubarContent>
                        </MenubarMenu>
                     </Menubar>

                     <SidebarMenuItem>
                        {/* Уведомления */}
                        <SidebarMenuButton asChild className='relative h-10 px-2.5'>
                           <div>
                              <Bell size={24} />
                              <p className='absolute right-1 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-medium text-black'>
                                 3
                              </p>
                           </div>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </div>
                  <Button
                     className='my-4 flex h-10 w-full justify-start text-base font-medium'
                     prefix={<Plus className='rounded-full bg-primary text-background' size={'24'} />}
                     variant={'ghost'}
                  >
                     Добавить задачу
                  </Button>
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
                     <Accordion collapsible type='single'>
                        <AccordionItem className='border-none' value='item-1'>
                           <AccordionTrigger className='px-2.5 py-2'>
                              <div className='mr-1 flex flex-1 justify-between'>
                                 <div className='flex items-center gap-2 font-normal'>
                                    <LayoutGrid size={16} />
                                    Проекты
                                 </div>
                                 <Button className='h-5 w-5' size={'icon'} variant={'ghost'} onClick={(e) => e.stopPropagation()}>
                                    <Plus className='h-5 w-5' />
                                 </Button>
                              </div>
                           </AccordionTrigger>
                           <AccordionContent className='px-2.5 py-2'>
                              {projectItems.map((item) => {
                                 return (
                                    <div
                                       key={item.value}
                                       className='group/item relative flex justify-between rounded-[4px] px-2 py-1.5 hover:bg-[#f4f4f5]'
                                    >
                                       <p className='peer'>{item.label}</p>
                                       <div className='invisible rounded-[4px] transition-opacity duration-200 hover:bg-white group-hover/item:visible'>
                                          <Ellipsis className='' />
                                       </div>
                                    </div>
                                 );
                              })}
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}
