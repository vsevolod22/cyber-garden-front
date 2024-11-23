import { Dialog, DialogOverlay, DialogPortal, DialogTrigger } from '@/shared/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/utils/lib/utils';
import { Plus, X } from 'lucide-react';
import React from 'react';
import { Button } from '@/shared/ui/button';
import { Task } from '@/modules/Task';

export const CreateTaskСontent = React.forwardRef<
   React.ElementRef<typeof DialogPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
   <DialogPortal>
      <DialogOverlay className='bg-black/15' />
      <DialogPrimitive.Content
         ref={ref}
         className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
            className,
         )}
         {...props}
      >
         {children}
         <DialogPrimitive.Close className='absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
         </DialogPrimitive.Close>
      </DialogPrimitive.Content>
   </DialogPortal>
));
CreateTaskСontent.displayName = 'SidebarModalContent';

export const CreateTaskModal = () => {
   return (
      <Dialog>
         <DialogTrigger className='w-full'>
            <Button
               className='my-4 flex h-10 w-full justify-start text-base font-medium'
               prefix={<Plus className='rounded-full bg-primary text-background' size={'24'} />}
               variant={'ghost'}
            >
               Добавить задачу
            </Button>
         </DialogTrigger>
         <CreateTaskСontent className='p-0'>
            <Task />
         </CreateTaskСontent>
      </Dialog>
   );
};
