import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/shared/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';
import { useTokenStore } from '../model/store/authStore';

export function AuthModal() {
   const [open, setOpen] = useState(false);
   const { accessToken, clearAccessToken, clearRefreshToken } = useTokenStore();
   const toggleOpenStatus = (status: boolean) => {
      setOpen(status);
   };
   const clearStorage = () => {
      clearAccessToken();
      clearRefreshToken();
      setOpen(false);
   };

   return (
      <>
         {accessToken ? (
            <Button onClick={clearStorage} className='flex gap-2' size='small' variant='secondary'>
               {' '}
               Выйти
            </Button>
         ) : (
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                  <Button className='flex gap-2' size='small' variant='secondary'>
                     Вход
                  </Button>
               </DialogTrigger>
               <Tabs defaultValue={'login'}>
                  <DialogContent aria-describedby='dialog-description' className='flex flex-col sm:max-w-md'>
                     <DialogHeader className='h-6'>
                        <TabsList className=''>
                           <TabsTrigger className='hover:bg-background' value='login'>
                              Авторизация
                           </TabsTrigger>
                           <TabsTrigger className='hover:bg-background' value='register'>
                              Регистрация
                           </TabsTrigger>
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
         )}
      </>
   );
}
