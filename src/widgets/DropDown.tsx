import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { CommandCalendar } from './Command';
export function DropdownCommand() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='outline'>Open</Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className='w-56 border-none'>
            <CommandCalendar />
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
