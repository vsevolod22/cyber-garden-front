import { Button } from '@/shared/ui/button';
import { Dialog, DialogTrigger } from '@/shared/ui/dialog';
import { Plus } from 'lucide-react';
import { Task } from '@/modules/Task';
import { CreateTaskModal } from '@/modules/Task/ui/CreateTaskModal';

export const SidebarModal = () => {
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
         <CreateTaskModal className='p-0'>
            <Task />
         </CreateTaskModal>
      </Dialog>
   );
};
