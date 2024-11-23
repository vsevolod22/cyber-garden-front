import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import type { ReactNode } from 'react';

interface TaskCommandProps {
   children: ReactNode;
   className?: string;
   slot?: boolean;
   svg?: ReactNode;
   text: string;
}

export function TaskCommand({ svg, text, children, className, slot }: TaskCommandProps) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className={className}>
            <Button className='h-8' variant='outline'>
               {svg}
               {text}
               {slot && <span className='h-6 w-6' />}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='border-none'>{children}</DropdownMenuContent>
      </DropdownMenu>
   );
}
