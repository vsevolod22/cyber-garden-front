import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { SidebarMenuButton } from '@/shared/ui/sidebar';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Ellipsis, LayoutGrid, Plus } from 'lucide-react';

const projectItems = [
   { label: 'Учеба 📚', value: 'Учёба' },
   { label: 'Рутины 🌀', value: 'Рутины' },
   { label: 'Вдохновение ✨', value: 'Вдохновение' },
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
                  <Button className='h-5 w-5' size={'icon'} variant={'ghost'} onClick={(e) => e.stopPropagation()}>
                     <Plus className='h-5 w-5' />
                  </Button>
               </div>
            </AccordionTrigger>
            <AccordionContent className='px-2.5 py-2'>
               {projectItems.map((item) => (
                  <DropdownMenu key={item.value}>
                     <div className='group/item relative flex justify-between rounded-[4px] bg-sidebar px-2 py-1.5 hover:bg-sidebar-accent'>
                        <p className='peer'>{item.label}</p>

                        <DropdownMenuTrigger
                           asChild
                           className='invisible rounded-[4px] bg-sidebar-accent transition-opacity duration-200 hover:bg-sidebar group-hover/item:visible data-[state=open]:visible data-[state=open]:bg-accent'
                        >
                           <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' side='right'>
                           <DropdownMenuItem>
                              <span>Изменить</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
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
