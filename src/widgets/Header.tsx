import { Link } from 'react-router-dom';
import { Dialog } from '@radix-ui/react-dialog';

import { AuthModal } from '@/modules/Auth/ui/AuthModal';
import { Button } from '@/shared/ui/button';
import { DialogTrigger } from '@/shared/ui/dialog';
import { cn } from '@/utils/lib/utils';
import { Container } from '@/widgets/Container';
import { SeachInput } from '@/widgets/SeachInput';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
   className?: string;
}

export const Header = ({ className }: HeaderProps) => {
   return (
      <header className={cn('h-[var(--header-height)]', className)}>
         <div className='flex h-full border border-border bg-background-secondary'>
            <div className='flex flex-1 items-center justify-between py-5 pl-6 pr-7'>
               <SeachInput className='flex-1' />
               <div className='flex items-center gap-2'>
                  <Button className='flex gap-[10px]' size={'small'}>
                     <p>Кнопка обычная</p>
                  </Button>
                  <ThemeSwitcher />
                  <AuthModal />
               </div>
            </div>
         </div>
      </header>
   );
};
