import { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { SidebarGroupContent, SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';
import { SidebarProfileMenubar } from './SidebarProfileMenubar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';

const initialReminders = [
   { id: 1, date: '25.11.2024', message: 'Заполнить отчет' },
   { id: 2, date: '26.11.2024', message: 'Позвонить заказчику' },
   { id: 3, date: '27.11.2024', message: 'Отправить презентацию' },
];

export const SidebarProfile = () => {
   const [reminders, setReminders] = useState(initialReminders);

   const handleAccept = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
      if (reminders.length > 1) {
         e.stopPropagation();
      }
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
   };

   return (
      <SidebarGroupContent>
         <div className='flex list-none'>
            <SidebarProfileMenubar />
            <SidebarMenuItem>
               {/* Уведомления */}
               <SidebarMenuButton asChild className='relative h-10 cursor-pointer px-2.5'>
                  <DropdownMenu>
                     <div className='relative flex cursor-pointer justify-between rounded-[4px] bg-sidebar px-2 py-1.5 hover:bg-sidebar-accent'>
                        <DropdownMenuTrigger asChild>
                           <div className='relative flex items-center'>
                              <Bell size={24} />
                              <p className='absolute bottom-3 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-medium text-black'>
                                 {reminders.length}
                              </p>
                           </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' side='right'>
                           <AnimatePresence>
                              {reminders.map((reminder) => (
                                 <motion.div
                                    key={reminder.id}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    initial={{ opacity: 0, x: 100 }}
                                    transition={{ duration: 0.3 }}
                                 >
                                    <DropdownMenuItem className='flex cursor-pointer justify-between gap-3'>
                                       <div className='flex items-center gap-4'>
                                          <BellRing size={28} />
                                          <div className='flex flex-col gap-1'>
                                             <div className='text-base font-semibold'>{reminder.message}</div>
                                             <div>
                                                Дата события: <span className='font-medium'>{reminder.date}</span>
                                             </div>
                                          </div>
                                       </div>
                                       <Button className='shrink-0' onClick={(event) => handleAccept(event, reminder.id)}>
                                          Принять
                                       </Button>
                                    </DropdownMenuItem>
                                 </motion.div>
                              ))}
                           </AnimatePresence>
                           {reminders.length === 0 && <div className='p-4 text-center text-gray-500'>Нет новых уведомлений</div>}
                        </DropdownMenuContent>
                     </div>
                  </DropdownMenu>
               </SidebarMenuButton>
            </SidebarMenuItem>
         </div>
      </SidebarGroupContent>
   );
};
