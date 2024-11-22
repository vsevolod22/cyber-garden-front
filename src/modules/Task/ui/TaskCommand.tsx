import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import type { ReactNode } from 'react';

interface TaskCommandProps {
   children: ReactNode;
   svg: ReactNode;
   text: string;
}

export function TaskCommand({ svg, text, children }: TaskCommandProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className='h-8' variant='outline'>
               {svg}
               {text}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56 border-none'>{children}</DropdownMenuContent>
      </DropdownMenu>
   );
}
