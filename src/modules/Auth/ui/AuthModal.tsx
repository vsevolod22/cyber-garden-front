import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';

export function AuthModal() {
   const [open, setOpen] = useState(false);

   const toggleOpenStatus = (status: boolean) => {
      setOpen(status);
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className='flex gap-2' size='small' variant='secondary'>
               Вход
            </Button>
         </DialogTrigger>
         <Tabs defaultValue={'login'}>
            <DialogContent aria-describedby='dialog-description' className='flex min-h-[600px] flex-col sm:max-w-md'>
               <DialogHeader className='h-6'>
                  <TabsList className=''>
                     <TabsTrigger value='login'>Авторизация</TabsTrigger>
                     <TabsTrigger value='register'>Регистрация</TabsTrigger>
                  </TabsList>
               </DialogHeader>
               <TabsContent value='login'>
                  <LoginForm toggleOpenStatus={toggleOpenStatus} />
               </TabsContent>
               <TabsContent value='register'>
                  <RegistrationForm toggleOpenStatus={toggleOpenStatus} />
               </TabsContent>
            </DialogContent>
         </Tabs>
      </Dialog>
   );
}
