import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { ReactNode } from 'react';

interface DropdownCommandProps {
   svg: ReactNode;
   text: string;
   children: ReactNode;
}

export function DropdownCommand({ svg, text, children }: DropdownCommandProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='outline' className='h-8'>
               {svg}
               {text}
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className='w-56 border-none'>{children}</DropdownMenuContent>
      </DropdownMenu>
   );
}
